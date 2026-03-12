// BUGGY BLOG API - intentionally broken in many ways

// Bug: Using var and global mutable state - causes race conditions
var blogStorage = [
  { id: 0, title: 'First Post', content: 'Hello world!', author: { name: 'Alice' }, createdAt: '2024-01-01T00:00:00Z' },
  { id: 1, title: 'Second Post', content: 'Another day...', author: { name: 'Bob' }, createdAt: '2024-01-02T00:00:00Z' },
  { id: 2, title: 'Third Post', content: 'Lorem ipsum dolor sit amet.', author: null, createdAt: '2024-01-03T00:00:00Z' },
  { id: 3, title: 'Empty Content', content: undefined, author: { name: 'Charlie' }, createdAt: '2024-01-04T00:00:00Z' }
]

// Bug: getBlogs returns undefined sometimes when called too fast
export function getBlogs() {
  // Bug: Random delay causes inconsistent behavior
  if (Math.random() > 0.7) {
    return undefined // Runtime crash when caller tries to map over this
  }
  // Bug: Returns reference to mutable array - mutations leak
  return blogStorage
}

// Bug: fetchBlogById - uses id as array INDEX (wrong! ids != indices after delete)
export function fetchBlogById(id) {
  return blogStorage[id]
}

// Bug: createBlog - doesn't validate, wrong id generation, mutates wrong thing
export function createBlog(blogData) {
  // Bug: id can be duplicate (uses length, not max+1)
  const newBlog = {
    id: blogStorage.length, // Bug: Duplicate IDs when deleting
    ...blogData,
    createdAt: new Date().toISOString()
  }
  // Bug: Pushes to wrong variable sometimes (blogStorage vs blogStorage)
  blogStorage.push(newBlog)
  // Bug: Returns wrong thing - returns length not the blog
  return blogStorage.length
}

// Bug: updateBlog - updates wrong blog, off-by-one
export function updateBlog(id, updates) {
  // Bug: Uses id as array index directly - wrong when ids aren't 0,1,2...
  const index = id
  // Bug: No bounds check - can access undefined
  blogStorage[index] = { ...blogStorage[index], ...updates }
  return blogStorage[index]
}

// Bug: deleteBlog - deletes wrong item (off by one)
export function deleteBlog(id) {
  // Bug: Finds index but then deletes index+1
  const index = blogStorage.findIndex(b => b.id === id)
  blogStorage.splice(index + 1, 1) // Off by one - deletes wrong blog!
  return true
}

// Bug: searchBlogs - searches wrong field, case sensitivity issues
export function searchBlogs(query) {
  if (!query) return blogStorage
  // Bug: Searches 'titl' (typo) instead of 'title'
  return blogStorage.filter(b => b.titl?.toLowerCase().includes(query.toLowerCase()))
}
