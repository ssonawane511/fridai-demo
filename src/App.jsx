import { useState, useEffect } from 'react'
import * as Sentry from '@sentry/react'
import BlogList from './components/BlogList'
import BlogPost from './components/BlogPost'
import CreateBlog from './components/CreateBlog'
import EditBlog from './components/EditBlog'
import './App.css'

// BUGGY App - main router with navigation bugs
function App() {
  // Bug: view typo - 'list' vs 'liste' causes wrong render
  const [view, setView] = useState('list')
  const [selectedPostId, setSelectedPostId] = useState(null)
  const [editPostId, setEditPostId] = useState(null)

  // Bug: Unnecessary effect that runs on every render - performance killer
  useEffect(() => {
    document.title = `Blog - ${view}`
  })

  // Bug: handleSelectPost - receives id but might get undefined from BlogList click
  const handleSelectPost = (id) => {
    setSelectedPostId(id)
    setView('post')
  }

  // Bug: handleCreateSuccess - gets wrong id (length not actual id from createBlog)
  const handleCreateSuccess = (newId) => {
    setView('list')
    setSelectedPostId(null)
    // Bug: newId is array LENGTH not id - fetchBlogById will never find it (also has idx bug)
    setSelectedPostId(newId)
    setView('post') // Navigate to "post" view - will show "Post not found!"
  }

  const handleBack = () => {
    setView('list')
    setSelectedPostId(null)
    setEditPostId(null)
  }

  const handleEdit = (id) => {
    setEditPostId(id)
    setView('edit')
  }

  // Bug: Render logic - 'liste' never matches so default case runs for 'list'
  const renderView = () => {
    switch (view) {
      case 'create':
        return (
          <CreateBlog
            onSuccess={handleCreateSuccess}
            onCancel={handleBack}
          />
        )
      case 'post':
        return (
          <BlogPost
            postId={selectedPostId}
            onBack={handleBack}
            onEdit={handleEdit}
          />
        )
      case 'edit':
        return (
          <EditBlog
            postId={editPostId}
            onSuccess={handleBack}
            onCancel={() => setView('post')}
          />
        )
      case 'liste':
        // Bug: This case never reached - typo
        return (
          <BlogList
            onSelectPost={handleSelectPost}
            onCreateNew={() => setView('create')}
          />
        )
      default:
        // Bug: 'list' falls through to default - works by accident
        return (
          <BlogList
            onSelectPost={handleSelectPost}
            onCreateNew={() => setView('create')}
          />
        )
    }
  }

  return (
    <Sentry.ErrorBoundary fallback={<p>An error has occurred. Please refresh the page.</p>}>
    <div className="app">
      <header className="app-header">
        {/* Bug: Clicking logo doesn't reset state properly - editPostId lingers */}
        <h1 onClick={handleBack} style={{ cursor: 'pointer' }}>
          Buggy Blog
        </h1>
      </header>
      <main className="app-main">
        {renderView()}
      </main>
    </div>
    </Sentry.ErrorBoundary>
  )
}

export default App
