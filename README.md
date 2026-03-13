# DocsSDK

Lightweight JavaScript library for managing and searching local documentation.

## Installation

```bash
pnpm add docs-sdk
# or from workspace
pnpm add ./packages/docs-sdk
```

## Usage

```javascript
import DocsSDK from "docs-sdk";

const sdk = new DocsSDK();

// Create document
sdk.create({
  id: "intro",
  title: "Introduction",
  content: "Welcome to the documentation",
});

// Get all documents
sdk.getAll();

// Search
sdk.search("query");

// Update
sdk.update("intro", { title: "Updated" });

// Delete
sdk.delete("intro");
```

## API

| Method      | Description                    |
| ----------- | ------------------------------ |
| `create(doc)` | Creates a new document         |
| `getAll()`   | Returns all stored documents   |
| `search(q)`  | Searches by title or content   |
| `update(id, data)` | Updates a document      |
| `delete(id)` | Removes a document             |

## Architecture

```
/sdk
 ├── storage.js    - Stores documentation in memory
 ├── search.js     - Search functionality
 ├── operations.js - CRUD operations
 └── index.js      - Main SDK interface
```
