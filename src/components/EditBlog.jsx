import { useState, useEffect } from 'react'
import { fetchBlogById, updateBlog } from '../api/blogs'

// BUGGY EditBlog - edit form with wrong data binding and logic
export default function EditBlog({ postId, onSuccess, onCancel }) {
  const [post, setPost] = useState(null)
  const [formData, setFormData] = useState({ title: '', content: '', author: { name: '' } })
  const [saving, setSaving] = useState(false)

  useEffect(() => {
    if (!postId) return
    // Bug: fetchBlogById has idx typo - returns undefined for valid ids
    const data = fetchBlogById(postId)
    setPost(data)
    if (data) {
      // Bug: Spread might fail if data has unexpected shape
      setFormData({
        title: data.title,
        content: data.content,
        author: data.author || { name: '' }
      })
    }
  }, [postId])

  const handleChange = (field, value) => {
    if (field === 'authorName') {
      setFormData(prev => ({
        ...prev,
        author: { ...prev.author, name: value }
      }))
    } else {
      setFormData(prev => ({ ...prev, [field]: value }))
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    setSaving(true)

    // Bug: updateBlog uses id as array index - wrong for non-sequential ids
    updateBlog(postId, {
      title: formData.title,
      content: formData.content,
      author: formData.author
    })

    // Bug: onSuccess called before state updates - race condition
    onSuccess()
    setSaving(false)
  }

  if (!post) return <div>Loading...</div>

  return (
    <form className="edit-blog" onSubmit={handleSubmit}>
      <h2>Edit Post</h2>

      <div>
        <label>Title</label>
        <input
          type="text"
          value={formData.title}
          onChange={(e) => handleChange('title', e.target.value)}
        />
      </div>

      <div>
        <label>Content</label>
        <textarea
          value={formData.content}
          onChange={(e) => handleChange('content', e.target.value)}
        />
      </div>

      <div>
        <label>Author</label>
        {/* Bug: formData.author.name - CRASHES when author is null (Third Post) */}
        <input
          type="text"
          value={formData.author.name}
          onChange={(e) => handleChange('authorName', e.target.value)}
        />
      </div>

      <div className="form-actions">
        <button type="submit" disabled={saving}>Save</button>
        <button type="button" onClick={onCancel}>Cancel</button>
      </div>
    </form>
  )
}
