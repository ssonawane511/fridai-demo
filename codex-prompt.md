You are a senior JavaScript engineer.

Goal:
Fix the issue described in the context.

Workflow you must follow:

1. Understand the stacktrace and issue.
2. Identify the root cause in the repository.
3. Create a TEMPORARY Jest test reproducing the bug.

The temporary test MUST be placed in .tmp-tests/ and MUST use the .test.js extension (e.g. .tmp-tests/bug.test.js) so Jest can find it.

Requirements:

- The test must reproduce the issue.
- The test must fail before the fix.
- Modify production code to fix the issue.
- After fixing, the test should pass.

Constraints:

- Follow SOLID, DRY and KISS.
- Do NOT modify package.json.
- Do NOT commit files inside .tmp-tests/

Output format (in your final message):

ROOT CAUSE
<short explanation>

FIX SUMMARY
<short explanation>

Context:
AI Context Build
=================

ISSUE TITLE:
Error: Better luck next time, not implemented this

=============================
AI GUIDELINES
=============================
# AI GUIDELINES

### 1. Purpose

This document defines how AI agents should write and modify code for this JavaScript SDK.

The goals are to:

* Maintain a stable and predictable SDK API
* Follow proven software design principles
* Ensure clean, maintainable code
* Avoid breaking changes

All AI-generated code must follow these guidelines.

***

## 2. Scope

These guidelines apply to all AI-assisted tasks in this repository, including:

* SDK feature development
* Refactoring SDK modules
* Bug fixes
* Documentation updates
* Test generation

The rules apply to both **Node.js and browser-compatible code**.

***

## 3. Allowed Tasks

AI agents may perform the following tasks.

#### SDK Feature Development

* Create SDK methods
* Create service modules
* Create helper utilities
* Add request/response handlers
* Generate TypeScript types
* Generate SDK documentation

#### Refactoring

* Break large modules into smaller files
* Extract reusable utilities
* Remove duplicate logic
* Improve code readability

#### Maintenance

* Fix bugs
* Improve error handling
* Improve logging
* Add tests

AI agents **must avoid breaking the public SDK API** unless explicitly requested.

***

## 4. Writing Style

All SDK code must follow these principles.

#### SOLID

Follow **SOLID principles**.

* Each module should have **one responsibility**
* SDK interfaces should be **stable and extensible**
* Use **interfaces or types instead of tightly coupled implementations**

***

#### KISS

Follow the **KISS principle**.

* Prefer simple solutions
* Avoid unnecessary abstractions
* Avoid over-engineering
* Keep APIs intuitive

SDK consumers should understand the API easily.

***

#### DRY

Follow the **DRY principle**.

* Avoid duplicated request logic
* Extract shared utilities
* Reuse HTTP client logic

***

## 5. Output Format

When AI agents make changes, they must provide a structured explanation.

Required format:

#### Summary

Brief description of the change.

#### Files Modified

List of affected files.

#### Code

Show the implementation.

Example:

```
Change:
Added retry logic to API client.

Files Modified:
- src/client/httpClient.ts
- src/utils/retry.ts
```

***

## 6. Code Standards

#### Language

* Use **TypeScript whenever possible**
* Provide strong type definitions
* Avoid `any` unless absolutely necessary

***

#### Module Structure

Prefer modular structure.

```
src/
 client/
 sdkClient.ts
 httpClient.ts

 services/
 userService.ts
 orderService.ts

 utils/
 retry.ts
 validation.ts

 types/
 apiTypes.ts
```

***

#### Function Design

Functions should:

* Be small and focused
* Perform one task
* Be reusable

Example:

```javascript
function fetchUserProfile(userId) {
 return httpClient.get(`/users/${userId}`);
}
```

Avoid large multi-purpose functions.

***

#### Error Handling

SDK errors must be predictable.

Always:

* Throw structured errors
* Provide error codes
* Provide helpful messages

Example:

```javascript
throw new SDKError("USER_NOT_FOUND", "User does not exist");
```

***

#### Logging

Logging should be optional.

* Do not log sensitive information
* Allow SDK users to enable or disable logs

***

## 7. Safety Rules

AI agents must follow these safety rules.

#### Do Not

* Introduce breaking changes to the public SDK API
* Remove exported methods
* Expose secrets or API keys
* Change authentication logic without explicit instruction

***

#### Always

* Maintain backward compatibility
* Add tests for new SDK features
* Ensure SDK works in Node.js and browser environments
* Keep bundle size minimal

***

## Guiding Principles

All SDK code should prioritize:

1. **Simple API design** (KISS)
2. **Reusable utilities** (DRY)
3. **Clean architecture** (SOLID)

The goal is to provide a **stable, easy-to-use JavaScript SDK** that developers can integrate quickly.

***

If you want, I can also create a **much stronger version used by large SDK teams** (for example teams building SDKs for platforms like Stripe or Twilio) which includes:

* API stability rules
* semantic versioning enforcement
* automatic SDK test generation
* backward compatibility checks

This makes AI agents **far safer when generating SDK code automatically.** 🚀

=============================
SOFTWARE DOCUMENT
=============================
# SOFTWARE DOCUMENT

### Introduction

This SDK is a **lightweight JavaScript library** for managing and searching **local documentation**.\
It is designed to be **simple, dependency-free, and fast**.

Key capabilities:

* Store documentation locally
* Search documentation content
* Create / update / delete documents
* Retrieve documents programmatically

The SDK is useful for **developer tools, local documentation systems, and AI agents**.

***

## Architecture

The SDK follows a **simple modular architecture**.

```
/sdk
 ├── storage.js
 ├── search.js
 ├── operations.js
 └── index.js
```

#### Modules

| Module | Responsibility |
| ---------- | ------------------------------ |
| storage | Stores documentation in memory |
| search | Provides search functionality |
| operations | CRUD operations for documents |
| index | Main SDK interface |

Design principles used:

* **SOLID**
* **KISS**
* **DRY**

Each module has **one clear responsibility**.

***

## Setup / Installation

Copy the SDK into your project.

```
/sdk
```

Import the SDK:

```javascript
import DocsSDK from "./sdk/index.js"
```

No external dependencies are required.

***

## Usage Guide

#### Initialize SDK

```javascript
const sdk = new DocsSDK()
```

***

#### Create Document

```javascript
sdk.create({
 id: "intro",
 title: "Introduction",
 content: "Welcome to the documentation"
})
```

***

#### Get All Documents

```javascript
sdk.getAll()
```

***

#### Search Documentation

```javascript
sdk.search("documentation")
```

***

#### Update Document

```javascript
sdk.update("intro", {
 title: "Updated Introduction"
})
```

***

#### Delete Document

```javascript
sdk.delete("intro")
```

***

## API Reference

#### `create(document)`

Creates a new document.

```javascript
sdk.create({
 id: "usage",
 title: "Usage Guide",
 content: "How to use the SDK"
})
```

***

#### `getAll()`

Returns all stored documents.

```javascript
sdk.getAll()
```

***

#### `search(query)`

Searches documents by title or content.

```javascript
sdk.search("api")
```

***

#### `update(id, data)`

Updates an existing document.

```javascript
sdk.update("usage", {
 content: "Updated guide"
})
```

***

#### `delete(id)`

Removes a document.

```javascript
sdk.delete("usage")
```

***

## Development Guide

Guidelines for contributors.

#### Design Principles

1. Follow **SOLID principles**
2. Use **small focused functions**
3. Avoid external dependencies
4. Write **readable code**
5. Separate logic by modules

#### Code Style

* Prefer **pure functions**
* Avoid duplicate logic (**DRY**)
* Keep implementation **simple (KISS)**

Example search implementation:

```javascript
export function searchDocs(docs, query) {
 return docs.filter(doc =>
 doc.title.includes(query) ||
 doc.content.includes(query)
 )
}
```

***

## Troubleshooting

#### Search returns no results

Ensure documents exist in storage.

```
sdk.getAll()
```

***

#### Document update not working

Check that the document `id` exists.

***

#### SDK not importing

Verify the import path.

```
import DocsSDK from "./sdk/index.js"
```

***

## FAQ

#### Does this SDK require any libraries?

No. It is **pure JavaScript**.

#### Where are documents stored?

Documents are stored **in memory**.

#### Can it run in the browser?

Yes.

#### Is this meant for large documentation systems?

No. It is designed for **small local documentation systems**.

***

```
storage.js
search.js
operations.js
index.js
```

=============================
Sentry Event Understanding
=============================
# Sentry Event Understanding

A **Sentry Event** represents a single captured error or issue occurring in an application.\
The event document contains detailed information about:

* the error
* where it occurred
* the runtime environment
* the execution context
* user activity before the crash

This information helps developers diagnose and fix problems.

***

## 1. Basic Event Metadata

These fields describe the event itself.

| Field | Description |
| ------------- | ----------------------------------------------- |
| `id` | Unique identifier of the event |
| `eventID` | ID used internally to group and track the event |
| `projectID` | The project where the error occurred |
| `size` | Size of the event payload |
| `dateCreated` | When the error occurred |

Example

```json
{
 "id": "9da4ef1897534fc398864b3c824c60a5",
 "projectID": "4511032942919680"
}
```

***

## 2. Error Information

The **core error information** is located inside:

```
entries[].data.values[]
```

Important fields:

| Field | Description |
| ------------ | -------------------------------------------- |
| `type` | Error type (TypeError, ReferenceError, etc.) |
| `value` | Error message |
| `mechanism` | How the error was captured |
| `stacktrace` | Execution stack at time of error |

Example

```
TypeError: Cannot read properties of undefined (reading 'slice')
```

This indicates that the code attempted to call `.slice()` on an undefined value.

***

## 3. Stack Trace

The **stack trace** shows where the error occurred in the code.

Location in the event:

```
entries[].data.values[].stacktrace.frames
```

Each frame contains:

| Field | Description |
| ---------- | --------------------------------------------- |
| `filename` | Source file |
| `function` | Function name |
| `lineNo` | Line number |
| `colNo` | Column number |
| `inApp` | Whether the frame belongs to application code |

Example

```
filename: /src/components/BlogList.jsx
lineNo: 160
colNo: 33
function: BlogList
```

The **first frame with `inApp: true` is usually the root cause**.

***

## 4. React Component Stack

For React applications, Sentry captures the component hierarchy.

Location:

```
contexts.react.componentStack
```

Example

```
BlogList
main
div
ErrorBoundary
App
```

This indicates that the error occurred in the **BlogList component**.

***

## 5. Breadcrumbs (User Activity)

Breadcrumbs track actions before the error occurred.

Location:

```
entries[].type = "breadcrumbs"
```

Breadcrumbs may include:

* console logs
* navigation
* API calls
* user interactions

They help reconstruct what the user was doing before the crash.

Example

```
console error
transaction started
UI render
```

***

## 6. Request Information

For web applications, the event may include request details.

Location:

```
entries[].type = "request"
```

Fields include:

| Field | Description |
| --------- | ----------------------------- |
| `url` | Page where the error occurred |
| `method` | HTTP method |
| `headers` | Request headers |
| `query` | Query parameters |

Example

```
url: http://localhost:5174/
```

***

## 7. Runtime Context

The `contexts` object provides environment details.

Common contexts:

| Context | Information |
| --------- | ------------------------------- |
| `browser` | Browser name and version |
| `device` | Device type |
| `os` | Operating system |
| `react` | React component stack |
| `trace` | Distributed tracing information |
| `replay` | Session replay ID |

Example

```
browser: Chrome 145
os: Mac OS X
device: Mac
```

***

## 8. Tags

Tags help categorize events and support filtering in Sentry.

Location:

```
tags[]
```

Example tags:

| Tag | Meaning |
| ------------- | ------------------------- |
| `environment` | production / staging |
| `browser` | Browser version |
| `os` | Operating system |
| `transaction` | Route or page |
| `url` | Page where error occurred |

Example

```
environment: production
transaction: /
browser: Chrome 145
```

***

## 9. Trace and Performance Data

Sentry also captures distributed tracing information.

Location:

```
contexts.trace
```

Important fields:

| Field | Description |
| ---------- | ----------------------- |
| `trace_id` | Unique trace identifier |
| `span_id` | Current span |
| `status` | Execution status |

This allows correlation between:

* frontend errors
* backend API calls
* performance traces

***

## 10. Replay Data

If session replay is enabled:

```
contexts.replay.replay_id
```

This allows developers to replay the user session leading to the error.

***

## 11. Error Handling Information

The event indicates whether the error was handled.

Example

```
mechanism.handled: true
```

Meaning:

* `true` → error caught by an error boundary or handler
* `false` → unhandled crash

***

## 12. Common Debugging Workflow

When analyzing a Sentry event, developers typically follow these steps:

1. Read the error message
2. Identify the first application stack frame
3. Locate the failing component or module
4. Check breadcrumbs to understand user actions
5. Review request and environment details
6. Use trace or replay data for deeper analysis

***

## Example Summary of Your Event

From the provided document:

| Field | Value |
| ------------- | ----------------------------------------------------- |
| Error Type | TypeError |
| Error Message | Cannot read properties of undefined (reading 'slice') |
| Component | BlogList |
| File | src/components/BlogList.jsx |
| Line | 160 |
| Route | / |
| Browser | Chrome 145 |
| Environment | production |

Probable cause:

A value expected to be a string or array was `undefined`, and `.slice()` was called on it during rendering of the **BlogList component**.

=============================
SENTRY EVENT
=============================
```json
{
  "id": "c2caaf172cf04ad7b9398cd6ed665213",
  "groupID": "7332116922",
  "eventID": "c2caaf172cf04ad7b9398cd6ed665213",
  "projectID": "4511035727282176",
  "size": 10404,
  "entries": [
    {
      "data": {
        "values": [
          {
            "type": "Error",
            "value": "Better luck next time, not implemented this",
            "mechanism": {
              "type": "generic",
              "handled": true
            },
            "threadId": null,
            "module": null,
            "stacktrace": {
              "frames": [
                {
                  "filename": "node:internal/modules/run_main",
                  "absPath": "node:internal/modules/run_main",
                  "module": "run_main",
                  "package": null,
                  "platform": null,
                  "instructionAddr": null,
                  "symbolAddr": null,
                  "function": "asyncRunEntryPointWithESMLoader",
                  "rawFunction": null,
                  "symbol": null,
                  "context": [],
                  "lineNo": 117,
                  "colNo": 5,
                  "parentIndex": null,
                  "sampleCount": null,
                  "inApp": false,
                  "trust": null,
                  "errors": null,
                  "lock": null,
                  "sourceLink": null,
                  "vars": null
                },
                {
                  "filename": "node:internal/modules/esm/loader",
                  "absPath": "node:internal/modules/esm/loader",
                  "module": "loader",
                  "package": null,
                  "platform": null,
                  "instructionAddr": null,
                  "symbolAddr": null,
                  "function": "ModuleLoader.import",
                  "rawFunction": null,
                  "symbol": null,
                  "context": [],
                  "lineNo": 540,
                  "colNo": 24,
                  "parentIndex": null,
                  "sampleCount": null,
                  "inApp": false,
                  "trust": null,
                  "errors": null,
                  "lock": null,
                  "sourceLink": null,
                  "vars": null
                },
                {
                  "filename": "node:internal/modules/esm/module_job",
                  "absPath": "node:internal/modules/esm/module_job",
                  "module": "module_job",
                  "package": null,
                  "platform": null,
                  "instructionAddr": null,
                  "symbolAddr": null,
                  "function": "ModuleJob.run",
                  "rawFunction": null,
                  "symbol": null,
                  "context": [],
                  "lineNo": 263,
                  "colNo": 25,
                  "parentIndex": null,
                  "sampleCount": null,
                  "inApp": false,
                  "trust": null,
                  "errors": null,
                  "lock": null,
                  "sourceLink": null,
                  "vars": null
                },
                {
                  "filename": "/Users/sagar/Desktop/ESP/AI/FRIDAI/packages/webapp/sdk/run.js",
                  "absPath": "/Users/sagar/Desktop/ESP/AI/FRIDAI/packages/webapp/sdk/run.js",
                  "module": "run",
                  "package": null,
                  "platform": null,
                  "instructionAddr": null,
                  "symbolAddr": null,
                  "function": null,
                  "rawFunction": null,
                  "symbol": null,
                  "context": [
                    [
                      7,
                      "import \"./instrument.js\";"
                    ],
                    [
                      8,
                      "import * as Sentry from \"@sentry/node\";"
                    ],
                    [
                      9,
                      "import DocsSDK from \"./index.js\";"
                    ],
                    [
                      10,
                      ""
                    ],
                    [
                      11,
                      "// Verify Sentry - intentional error test"
                    ],
                    [
                      12,
                      "try {"
                    ],
                    [
                      13,
                      "  const sdk = new DocsSDK();"
                    ],
                    [
                      14,
                      "  sdk.create({ id: \"test\", title: \"Test\", content: \"Content\" });"
                    ],
                    [
                      15,
                      "} catch (e) {"
                    ],
                    [
                      16,
                      "  Sentry.captureException(e);"
                    ],
                    [
                      17,
                      "  console.error(\"Caught:\", e.message);"
                    ],
                    [
                      18,
                      "}"
                    ]
                  ],
                  "lineNo": 14,
                  "colNo": 7,
                  "parentIndex": null,
                  "sampleCount": null,
                  "inApp": true,
                  "trust": null,
                  "errors": null,
                  "lock": null,
                  "sourceLink": null,
                  "vars": null
                },
                {
                  "filename": "/Users/sagar/Desktop/ESP/AI/FRIDAI/packages/webapp/sdk/index.js",
                  "absPath": "/Users/sagar/Desktop/ESP/AI/FRIDAI/packages/webapp/sdk/index.js",
                  "module": "index",
                  "package": null,
                  "platform": null,
                  "instructionAddr": null,
                  "symbolAddr": null,
                  "function": "DocsSDK.create",
                  "rawFunction": null,
                  "symbol": null,
                  "context": [
                    [
                      21,
                      ""
                    ],
                    [
                      22,
                      "  /**"
                    ],
                    [
                      23,
                      "   * Creates a new document"
                    ],
                    [
                      24,
                      "   * @param {Object} document - Document with id, title, content"
                    ],
                    [
                      25,
                      "   */"
                    ],
                    [
                      26,
                      "  create(document) {"
                    ],
                    [
                      27,
                      "    try {"
                    ],
                    [
                      28,
                      "      throw new Error(\"Better luck next time, not implemented this\");"
                    ],
                    [
                      29,
                      "    } catch (e) {"
                    ],
                    [
                      30,
                      "      Sentry.captureException(e);"
                    ],
                    [
                      31,
                      "      throw e;"
                    ],
                    [
                      32,
                      "    }"
                    ],
                    [
                      33,
                      "  }"
                    ],
                    [
                      34,
                      ""
                    ],
                    [
                      35,
                      "  /**"
                    ]
                  ],
                  "lineNo": 28,
                  "colNo": 13,
                  "parentIndex": null,
                  "sampleCount": null,
                  "inApp": true,
                  "trust": null,
                  "errors": null,
                  "lock": null,
                  "sourceLink": null,
                  "vars": null
                }
              ],
              "framesOmitted": null,
              "registers": null,
              "hasSystemFrames": true
            },
            "rawStacktrace": {
              "frames": [
                {
                  "filename": "node:internal/modules/run_main",
                  "absPath": "node:internal/modules/run_main",
                  "module": "run_main",
                  "package": null,
                  "platform": null,
                  "instructionAddr": null,
                  "symbolAddr": null,
                  "function": "asyncRunEntryPointWithESMLoader",
                  "rawFunction": null,
                  "symbol": null,
                  "context": [],
                  "lineNo": 117,
                  "colNo": 5,
                  "parentIndex": null,
                  "sampleCount": null,
                  "inApp": false,
                  "trust": null,
                  "errors": null,
                  "lock": null,
                  "sourceLink": null,
                  "vars": null
                },
                {
                  "filename": "node:internal/modules/esm/loader",
                  "absPath": "node:internal/modules/esm/loader",
                  "module": "loader",
                  "package": null,
                  "platform": null,
                  "instructionAddr": null,
                  "symbolAddr": null,
                  "function": "ModuleLoader.import",
                  "rawFunction": null,
                  "symbol": null,
                  "context": [],
                  "lineNo": 540,
                  "colNo": 24,
                  "parentIndex": null,
                  "sampleCount": null,
                  "inApp": false,
                  "trust": null,
                  "errors": null,
                  "lock": null,
                  "sourceLink": null,
                  "vars": null
                },
                {
                  "filename": "node:internal/modules/esm/module_job",
                  "absPath": "node:internal/modules/esm/module_job",
                  "module": "module_job",
                  "package": null,
                  "platform": null,
                  "instructionAddr": null,
                  "symbolAddr": null,
                  "function": "ModuleJob.run",
                  "rawFunction": null,
                  "symbol": null,
                  "context": [],
                  "lineNo": 263,
                  "colNo": 25,
                  "parentIndex": null,
                  "sampleCount": null,
                  "inApp": false,
                  "trust": null,
                  "errors": null,
                  "lock": null,
                  "sourceLink": null,
                  "vars": null
                },
                {
                  "filename": "/Users/sagar/Desktop/ESP/AI/FRIDAI/packages/webapp/sdk/run.js",
                  "absPath": "/Users/sagar/Desktop/ESP/AI/FRIDAI/packages/webapp/sdk/run.js",
                  "module": "run",
                  "package": null,
                  "platform": null,
                  "instructionAddr": null,
                  "symbolAddr": null,
                  "function": null,
                  "rawFunction": null,
                  "symbol": null,
                  "context": [
                    [
                      7,
                      "import \"./instrument.js\";"
                    ],
                    [
                      8,
                      "import * as Sentry from \"@sentry/node\";"
                    ],
                    [
                      9,
                      "import DocsSDK from \"./index.js\";"
                    ],
                    [
                      10,
                      ""
                    ],
                    [
                      11,
                      "// Verify Sentry - intentional error test"
                    ],
                    [
                      12,
                      "try {"
                    ],
                    [
                      13,
                      "  const sdk = new DocsSDK();"
                    ],
                    [
                      14,
                      "  sdk.create({ id: \"test\", title: \"Test\", content: \"Content\" });"
                    ],
                    [
                      15,
                      "} catch (e) {"
                    ],
                    [
                      16,
                      "  Sentry.captureException(e);"
                    ],
                    [
                      17,
                      "  console.error(\"Caught:\", e.message);"
                    ],
                    [
                      18,
                      "}"
                    ]
                  ],
                  "lineNo": 14,
                  "colNo": 7,
                  "parentIndex": null,
                  "sampleCount": null,
                  "inApp": true,
                  "trust": null,
                  "errors": null,
                  "lock": null,
                  "sourceLink": null,
                  "vars": null
                },
                {
                  "filename": "/Users/sagar/Desktop/ESP/AI/FRIDAI/packages/webapp/sdk/index.js",
                  "absPath": "/Users/sagar/Desktop/ESP/AI/FRIDAI/packages/webapp/sdk/index.js",
                  "module": "index",
                  "package": null,
                  "platform": null,
                  "instructionAddr": null,
                  "symbolAddr": null,
                  "function": "DocsSDK.create",
                  "rawFunction": null,
                  "symbol": null,
                  "context": [
                    [
                      21,
                      ""
                    ],
                    [
                      22,
                      "  /**"
                    ],
                    [
                      23,
                      "   * Creates a new document"
                    ],
                    [
                      24,
                      "   * @param {Object} document - Document with id, title, content"
                    ],
                    [
                      25,
                      "   */"
                    ],
                    [
                      26,
                      "  create(document) {"
                    ],
                    [
                      27,
                      "    try {"
                    ],
                    [
                      28,
                      "      throw new Error(\"Better luck next time, not implemented this\");"
                    ],
                    [
                      29,
                      "    } catch (e) {"
                    ],
                    [
                      30,
                      "      Sentry.captureException(e);"
                    ],
                    [
                      31,
                      "      throw e;"
                    ],
                    [
                      32,
                      "    }"
                    ],
                    [
                      33,
                      "  }"
                    ],
                    [
                      34,
                      ""
                    ],
                    [
                      35,
                      "  /**"
                    ]
                  ],
                  "lineNo": 28,
                  "colNo": 13,
                  "parentIndex": null,
                  "sampleCount": null,
                  "inApp": true,
                  "trust": null,
                  "errors": null,
                  "lock": null,
                  "sourceLink": null,
                  "vars": null
                }
              ],
              "framesOmitted": null,
              "registers": null,
              "hasSystemFrames": true
            },
            "rawValue": null,
            "rawModule": null,
            "rawType": null
          }
        ],
        "hasSystemFrames": true,
        "excOmitted": null
      },
      "type": "exception"
    }
  ],
  "dist": null,
  "message": "",
  "title": "Error: Better luck next time, not implemented this",
  "location": "/Users/sagar/Desktop/ESP/AI/FRIDAI/packages/webapp/sdk/index.js",
  "user": {
    "id": null,
    "email": null,
    "username": null,
    "ip_address": null,
    "name": null,
    "geo": {
      "country_code": "US",
      "region": "United States"
    },
    "data": null
  },
  "contexts": {
    "app": {
      "app_start_time": "2026-03-13T06:19:22.566Z",
      "app_memory": 90521600,
      "free_memory": 143114240,
      "type": "app"
    },
    "cloud_resource": {
      "type": "default"
    },
    "culture": {
      "locale": "en-US",
      "timezone": "Asia/Shanghai",
      "type": "default"
    },
    "device": {
      "arch": "arm64",
      "memory_size": 8589934592,
      "free_memory": 142065664,
      "boot_time": "2026-03-12T16:01:25.078Z",
      "processor_count": 8,
      "cpu_description": "Apple M2",
      "processor_frequency": 2400,
      "type": "device"
    },
    "os": {
      "os": "macOS 15.3.2",
      "name": "macOS",
      "version": "15.3.2",
      "build": "24D81",
      "kernel_version": "24.3.0",
      "type": "os"
    },
    "runtime": {
      "runtime": "node v20.19.4",
      "name": "node",
      "version": "v20.19.4",
      "type": "runtime"
    },
    "trace": {
      "trace_id": "6fb7f596890c4221b5b95f9f46213ac8",
      "span_id": "b0a8815227fdbc0e",
      "status": "unknown",
      "type": "trace"
    }
  },
  "sdk": {
    "name": "sentry.javascript.node",
    "version": "10.43.0"
  },
  "context": {},
  "packages": {
    "@sentry/node": "^10.43.0"
  },
  "type": "error",
  "metadata": {
    "filename": "/Users/sagar/Desktop/ESP/AI/FRIDAI/packages/webapp/sdk/index.js",
    "function": "DocsSDK.create",
    "in_app_frame_mix": "mixed",
    "type": "Error",
    "value": "Better luck next time, not implemented this"
  },
  "tags": [
    {
      "key": "environment",
      "value": "production"
    },
    {
      "key": "handled",
      "value": "yes"
    },
    {
      "key": "level",
      "value": "error"
    },
    {
      "key": "mechanism",
      "value": "generic"
    },
    {
      "key": "os",
      "value": "macOS 15.3.2"
    },
    {
      "key": "os.build",
      "value": "24D81"
    },
    {
      "key": "os.name",
      "value": "macOS"
    },
    {
      "key": "runtime",
      "value": "node v20.19.4"
    },
    {
      "key": "runtime.name",
      "value": "node"
    },
    {
      "key": "server_name",
      "value": "sagars-mac.local"
    }
  ],
  "platform": "node",
  "dateReceived": "2026-03-13T06:19:24.564686Z",
  "errors": [
    {
      "type": "js_no_source",
      "message": "Source code was not found",
      "data": {
        "symbolicator_type": "missing_source",
        "url": "/Users/sagar/Desktop/ESP/AI/FRIDAI/packages/webapp/sdk/index.js"
      }
    },
    {
      "type": "js_no_source",
      "message": "Source code was not found",
      "data": {
        "symbolicator_type": "missing_source",
        "url": "/Users/sagar/Desktop/ESP/AI/FRIDAI/packages/webapp/sdk/run.js"
      }
    }
  ],
  "occurrence": null,
  "_meta": {
    "entries": {},
    "message": null,
    "user": null,
    "contexts": null,
    "sdk": null,
    "context": null,
    "packages": null,
    "tags": {}
  },
  "crashFile": null,
  "culprit": "DocsSDK.create(index)",
  "dateCreated": "2026-03-13T06:19:23.021000Z",
  "fingerprints": [
    "405832f38b45835d74da63ab7fc27fa7",
    "65f754dd5098e423b6082cc770acf2a3"
  ],
  "groupingConfig": {
    "enhancements": "KLUv_SAd6QAAkwORuGFsbC1wbGF0Zm9ybXM6MjAyNi0wMS0yMJA#KLUv_SAd6QAAkwORuGFsbC1wbGF0Zm9ybXM6MjAyNi0wMS0yMJA#KLUv_SAd6QAAkwORuGFsbC1wbGF0Zm9ybXM6MjAyNi0wMS0yMJA",
    "id": "newstyle:2026-01-20"
  },
  "release": null,
  "userReport": null,
  "sdkUpdates": [],
  "resolvedWith": [
    null
  ],
  "nextEventID": null,
  "previousEventID": null
}
```

=============================
ISSUE BODY
=============================
sentry::issueid::7332116922
Sentry Issue: [DOCSSDK-1](https://fridai.sentry.io/issues/7332116922/?referrer=github_integration)

```
Error: Better luck next time, not implemented this
  File "/Users/sagar/Desktop/ESP/AI/FRIDAI/packages/webapp/sdk/index.js", line 28, in DocsSDK.create
    throw new Error("Better luck next time, not implemented this");
  File "/Users/sagar/Desktop/ESP/AI/FRIDAI/packages/webapp/sdk/run.js", line 14
    sdk.create({ id: "test", title: "Test", content: "Content" });
```

