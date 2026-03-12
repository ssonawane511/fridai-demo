// BUGGY BLOG API - intentionally broken in many ways

import * as Sentry from '@sentry/react'

// Bug: Using var and global mutable state - causes race conditions
var blogStorage = [
  { id: 0, title: 'First Post', content: 'Hello world!', author: { name: 'Alice' }, createdAt: '2024-01-01T00:00:00Z' },
  { id: 1, title: 'Second Post', content: 'Another day...', author: { name: 'Bob' }, createdAt: '2024-01-02T00:00:00Z' },
  { id: 2, title: 'Third Post', content: 'Lorem ipsum dolor sit amet.', author: null, createdAt: '2024-01-03T00:00:00Z' },
  { id: 3, title: 'Empty Content', content: undefined, author: { name: 'Charlie' }, createdAt: '2024-01-04T00:00:00Z' }
]

// Bug: getBlogs returns undefined ~30% of the time - random empty list on refresh!
export function getBlogs() {
  return Sentry.startSpan({ name: 'get-blogs', op: 'http.client' }, () => {
    if (Math.random() > 0.7) {
      return undefined
    }
    return blogStorage
  })
}

// Bug: fetchBlogById - uses id as array INDEX (wrong! ids != indices after delete)
export function fetchBlogById(id) {
  return Sentry.startSpan(
    { name: 'fetch-blog-by-id', op: 'http.client', attributes: { 'blog.id': id } },
    () => blogStorage[id]
  )
}

// Bug: createBlog - doesn't validate, wrong id generation, mutates wrong thing
export function createBlog(blogData) {
  return Sentry.startSpan({ name: 'create-blog', op: 'http.client' }, () => {
    const newBlog = {
      id: blogStorage.length,
      ...blogData,
      createdAt: new Date().toISOString()
    }
    blogStorage.push(newBlog)
    return blogStorage.length
  })
}

// Bug: updateBlog - updates wrong blog, off-by-one
export function updateBlog(id, updates) {
  return Sentry.startSpan(
    { name: 'update-blog', op: 'http.client', attributes: { 'blog.id': id } },
    () => {
      const index = id
      blogStorage[index] = { ...blogStorage[index], ...updates }
      return blogStorage[index]
    }
  )
}

// Bug: deleteBlog - deletes wrong item (off by one)
export function deleteBlog(id) {
  return Sentry.startSpan(
    { name: 'delete-blog', op: 'http.client', attributes: { 'blog.id': id } },
    () => {
      const index = blogStorage.findIndex(b => b.id === id)
      blogStorage.splice(index + 1, 1)
      return true
    }
  )
}

// Bug: searchBlogs - searches wrong field, case sensitivity issues
export function searchBlogs(query) {
  return Sentry.startSpan(
    { name: 'search-blogs', op: 'http.client', attributes: { 'search.query': query ?? '' } },
    () => {
      if (!query) return blogStorage
      return blogStorage.filter(b => b.titl?.toLowerCase().includes(query.toLowerCase()))
    }
  )
}
