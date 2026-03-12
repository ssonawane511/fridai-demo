import { useState, useEffect } from 'react'
import * as Sentry from '@sentry/react'
import { fetchBlogById, updateBlog } from '../api/blogs'

// BUGGY EditBlog - edit form with wrong data binding and logic
export default function EditBlog({ postId, onSuccess, onCancel }) {
  const [post, setPost] = useState(null)
  const [formData, setFormData] = useState({ title: '', content: '', author: { name: '' } })
  const [saving, setSaving] = useState(false)

  useEffect(() => {
    if (!postId) return

    const transaction = Sentry.startInactiveSpan({
      name: 'edit-blog-load',
      op: 'ui.load',
      forceTransaction: true,
    })
    Sentry.setActiveSpanInBrowser?.(transaction)
    transaction.setAttribute('feature', 'edit-blog')
    transaction.setAttribute('blog.id', postId)

    try {
      // Bug: fetchBlogById has idx typo - returns undefined for valid ids
      const data = fetchBlogById(postId)
      setPost(data)
      if (data) {
        setFormData({
          title: data.title,
          content: data.content,
          author: data.author || { name: '' }
        })
      }
      transaction.setStatus({ code: 1 })
    } catch (err) {
      Sentry.captureException(err)
      transaction.setStatus({ code: 2 })
    } finally {
      transaction.end()
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

    const transaction = Sentry.startInactiveSpan({
      name: 'edit-blog-save',
      op: 'ui.action',
      forceTransaction: true,
    })
    Sentry.setActiveSpanInBrowser?.(transaction)
    transaction.setAttribute('feature', 'edit-blog')
    transaction.setAttribute('blog.id', postId)

    try {
      // Bug: updateBlog uses id as array index - wrong for non-sequential ids
      updateBlog(postId, {
        title: formData.title,
        content: formData.content,
        author: formData.author
      })
      transaction.setStatus({ code: 1 })
      // Bug: onSuccess called before state updates - race condition
      onSuccess()
    } catch (err) {
      Sentry.captureException(err)
      transaction.setStatus({ code: 2 })
    } finally {
      setSaving(false)
      transaction.end()
    }
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
