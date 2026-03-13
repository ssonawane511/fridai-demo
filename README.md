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

## GitHub Actions Setup

The `codex_analyzer` workflow requires these secrets:

### Required secrets

| Secret           | Description                                      |
|------------------|--------------------------------------------------|
| `OPENAI_API_KEY` | OpenAI API key for Codex CLI                     |
| `GH_PAT`         | Personal Access Token with `repo` scope for PRs  |

### GH_PAT setup

`GITHUB_TOKEN` cannot create pull requests in some repos. Use a PAT instead:

1. **Create a PAT**: GitHub → **Settings** → **Developer settings** → **Personal access tokens**
2. Create a token with **repo** scope
3. **Add to repo**: **Settings** → **Secrets and variables** → **Actions** → **New repository secret**
4. Name: `GH_PAT`, value: your PAT

### Alternative: allow default token

- **Settings** → **Actions** → **General** → **Workflow permissions**
- Choose **Read and write permissions**
- Enable **Allow GitHub Actions to create and approve pull requests**
