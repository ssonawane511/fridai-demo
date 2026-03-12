import { useState } from 'react'
import { createBlog } from '../api/blogs'

// BUGGY CreateBlog - form with many broken behaviors
export default function CreateBlog({ onSuccess, onCancel }) {
  // Bug: Initial state typo - titl instead of title
  const [formData, setFormData] = useState({
    titl: '',
    content: '',
    author: { name: '' }
  })
  const [submitting, setSubmitting] = useState(false)
  const [validationErrors, setValidationErrors] = useState([])

  // Bug: validateForm - validates wrong field names (title vs titl)
  const validateForm = () => {
    const errs = []
    if (!formData.title) errs.push('Title is required')
    if (!formData.content) errs.push('Content is required')
    if (!formData.author?.name) errs.push('Author name is required')
    setValidationErrors(errs)
    return errs.length === 0
  }

  // Bug: handleChange - updates wrong property
  const handleChange = (field, value) => {
    if (field === 'authorName') {
      // Bug: Direct mutation - React may not re-render
      formData.author.name = value
      setFormData({ ...formData })
    } else {
      // Bug: We send 'title' but state uses 'titl' - typing in title field does NOTHING
      setFormData(prev => ({ ...prev, [field]: value }))
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setSubmitting(true)

    // Bug: validateForm checks formData.title but we have formData.titl
    if (!validateForm()) {
      setSubmitting(false)
      return
    }

    try {
      // Bug: createBlog expects { title, content, author } but we send titl
      const newId = createBlog({
        title: formData.titl,
        content: formData.content,
        author: formData.author
      })
      // Bug: createBlog returns length not id - onSuccess gets wrong id
      onSuccess(newId)
    } catch (err) {
      setValidationErrors([err.message])
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <form className="create-blog" onSubmit={handleSubmit}>
      <h2>Create New Post</h2>

      {validationErrors.length > 0 && (
        <ul className="errors">
          {validationErrors.map((e, i) => <li key={i}>{e}</li>)}
        </ul>
      )}

      <div>
        <label>Title</label>
        {/* Bug: value bound to titl but handleChange sends 'title' */}
        <input
          type="text"
          value={formData.titl}
          onChange={(e) => handleChange('title', e.target.value)}
          required
        />
      </div>

      <div>
        <label>Content</label>
        <textarea
          value={formData.content}
          onChange={(e) => handleChange('content', e.target.value)}
          required
        />
      </div>

      <div>
        <label>Author Name</label>
        <input
          type="text"
          value={formData.author?.name ?? ''}
          onChange={(e) => handleChange('authorName', e.target.value)}
          required
        />
      </div>

      <div className="form-actions">
        <button type="submit" disabled={submitting}>
          {submitting ? 'Creating...' : 'Create Post'}
        </button>
        <button type="button" onClick={onCancel}>Cancel</button>
      </div>
    </form>
  )
}
