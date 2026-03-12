import { useState, useEffect } from 'react'
import { fetchBlogById } from '../api/blogs'

// BUGGY BlogPost - single post view with many bugs
export default function BlogPost({ postId, onBack, onEdit }) {
  const [post, setPost] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!postId) return
    // Bug: fetchBlogById has typo (idx vs id) - never finds blog
    const data = fetchBlogById(postId)
    setPost(data)
    setLoading(false)
  }, [postId])

  // Bug: Format date without null check - crashes on invalid date
  const formatDate = (dateStr) => {
    return new Date(dateStr).toLocaleDateString()
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
