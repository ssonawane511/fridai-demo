import { useState, useEffect } from 'react'
import * as Sentry from '@sentry/react'
import { getBlogs, deleteBlog, searchBlogs } from '../api/blogs'

// BUGGY BlogList - many intentional bugs
export default function BlogList({ onSelectPost, onCreateNew }) {
  // Bug: Wrong initial state - posts vs post typo causes confusion
  const [posts, setPosts] = useState([])
  const [searchTerm, setSearchTerm] = useState('')
  const [loading, setLoading] = useState(true)
  // Bug: error state never displayed in UI
  const [error, setError] = useState(null)
  // Bug: selectedId used but never set properly
  const [selectedId, setSelectedId] = useState(null)

  useEffect(() => {
    const transaction = Sentry.startInactiveSpan({
      name: 'blog-list-load',
      op: 'ui.load',
      forceTransaction: true,
    })
    Sentry.setActiveSpanInBrowser?.(transaction)
    transaction.setAttribute('feature', 'blog-list')

    try {
      // Bug: getBlogs() can return undefined randomly - crashes when data.map is called
      const data = getBlogs()
      setPosts(data || [])
      transaction.setStatus({ code: 1 })
    } catch (err) {
      Sentry.captureException(err)
      transaction.setStatus({ code: 2 })
    } finally {
      setLoading(false)
      transaction.end()
    }
    // Bug: No cleanup - memory leak if component unmounts during async
    // Bug: Empty deps but we read from getBlogs which has random behavior
  }, [])

  // Bug: handleDelete - passes INDEX to deleteBlog which expects ID, then deletes wrong item!
  const handleDelete = (e, index) => {
    e.stopPropagation()
    const span = Sentry.startInactiveSpan({ name: 'blog-delete', op: 'ui.action', forceTransaction: true })
    Sentry.setActiveSpanInBrowser?.(span)
    try {
      const postId = posts[index]?.id
      deleteBlog(postId ?? index)
      setPosts(prev => prev.filter((_, i) => i !== index))
      span.setStatus({ code: 1 })
    } catch (err) {
      Sentry.captureException(err)
      span.setStatus({ code: 2 })
    } finally {
      span.end()
    }
  }

  // Bug: handleSearch - searches but displays wrong results, and DESTROYS the list
  const handleSearch = () => {
    const span = Sentry.startInactiveSpan({ name: 'blog-search', op: 'ui.action', forceTransaction: true })
    Sentry.setActiveSpanInBrowser?.(span)
    const results = searchBlogs(searchTerm)
    // Bug: searchBlogs has typo (titl vs title) so never finds anything - returns []
    // Bug: Replaces posts permanently - can't get original list back without refresh!
    setPosts(results || [])
    span.setStatus({ code: 1 })
    span.end()
  }

  // Bug: filteredPosts - uses wrong variable (post vs posts)
  const filteredPosts = searchTerm ? searchBlogs(searchTerm) : posts

  // Bug: Click handler passes wrong argument - passes event instead of post id
  const handlePostClick = (e) => {
    // Bug: e.target doesn't have id - gets undefined
    const postId = e.target.dataset?.id
    onSelectPost(postId)
  }

  return (
    <div className="blog-list">
      <div className="blog-list-header">
        <h1>My Buggy Blog</h1>
        <button onClick={onCreateNew}>Create New Post</button>
      </div>

      <div className="search-box">
        {/* Bug: Input value bound to wrong setter - typing in search breaks things */}
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search posts..."
        />
        {/* Bug: handleSearch searches wrong field in API (titl vs title) */}
        <button onClick={handleSearch}>Search</button>
      </div>

      {loading && <p>Loading...</p>}

      {/* Bug: Maps over posts but displays filteredPosts data - inconsistent */}
      <ul className="post-list">
        {/* Bug: If getBlogs returned undefined, posts was set to [] - but if it returns undefined again, we'd crash. Also: key=index causes delete to mess up remaining items */}
        {posts.map((post, index) => (
          // Bug: Using index as key - causes React reconciliation bugs on reorder/delete
          <li
            key={index}
            onClick={() => onSelectPost(post.id)}
            className="post-item"
          >
            <h3>{post.title || 'Untitled'}</h3>
            {/* Bug: post.author.name - crashes when author is undefined */}
            <p className="author">By {post.author?.name ?? 'Unknown'}</p>
            {/* Bug: post.content.slice - crashes when content is undefined */}
            <p className="excerpt">{post.content.slice(0, 100)}...</p>
            <button
              onClick={(e) => handleDelete(e, index)}
              className="delete-btn"
            >
              Delete
            </button>
          </li>
        ))}
      </ul>

      {/* Bug: Empty state shows when posts exists - wrong condition */}
      {posts.length === 0 && !loading && (
        <p>No posts found. Create one!</p>
      )}
    </div>
  )
}
