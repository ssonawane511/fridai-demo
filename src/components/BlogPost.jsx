import { useState, useEffect } from 'react'
import * as Sentry from '@sentry/react'
import { fetchBlogById } from '../api/blogs'

// BUGGY BlogPost - single post view with many bugs
export default function BlogPost({ postId, onBack, onEdit }) {
  const [post, setPost] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!postId) return

    const transaction = Sentry.startInactiveSpan({
      name: 'blog-post-load',
      op: 'ui.load',
      forceTransaction: true,
    })
    Sentry.setActiveSpanInBrowser?.(transaction)
    transaction.setAttribute('feature', 'blog-post')
    transaction.setAttribute('blog.id', postId)

    try {
      // Bug: fetchBlogById has typo (idx vs id) - never finds blog
      const data = fetchBlogById(postId)
      setPost(data)
      transaction.setStatus({ code: 1 })
    } catch (err) {
      Sentry.captureException(err)
      transaction.setStatus({ code: 2 })
    } finally {
      setLoading(false)
      transaction.end()
    }
  }, [postId])

  // Bug: formatDate - crashes on invalid date string (e.g. undefined, "invalid")
  const formatDate = (dateStr) => {
    const d = new Date(dateStr)
    if (isNaN(d.getTime())) throw new Error('Invalid date')
    return d.toLocaleDateString()
  }

  if (loading) return <div>Loading post...</div>

  // Bug: No null check - when fetchBlogById returns undefined, crashes
  if (!post) {
    return (
      <div>
        <button onClick={onBack}>← Back</button>
        <p>Post not found!</p>
      </div>
    )
  }

  return (
    <article className="blog-post">
      <button onClick={onBack}>← Back to List</button>
      <button onClick={() => onEdit(post.id)}>Edit</button>

      <h1>{post.title}</h1>
      {/* Bug: post.author.name - crashes when author is null/undefined */}
      <p className="meta">By {post.author.name} • {formatDate(post.createdAt)}</p>
      <div className="content">{post.content}</div>

      {/* Bug: Comments section - post.comments might be undefined */}
      {post.comments && post.comments.length > 0 && (
        <section className="comments">
          <h3>Comments</h3>
          {post.comments.map((c, i) => (
            // Bug: Comment might not have id - using index as key
            <div key={c.id || i}>
              <strong>{c.author}</strong>: {c.text}
            </div>
          ))}
        </section>
      )}
    </article>
  )
}
