ROOT CAUSE
`DocsSDK.create()` in [sdk/index.js](/home/runner/work/fridai-demo/fridai-demo/sdk/index.js) was intentionally stubbed to always throw `Error("Better luck next time, not implemented this")`, so every create call failed and was reported to Sentry.

FIX SUMMARY
Added a temporary repro test at [.tmp-tests/create-not-implemented.test.js](/home/runner/work/fridai-demo/fridai-demo/.tmp-tests/create-not-implemented.test.js) that initially failed, then minimally fixed `DocsSDK` by initializing in-memory storage in the constructor and making `create(document)` push+return the document instead of throwing.  
Verified with:

`NODE_OPTIONS=--experimental-vm-modules npx jest .tmp-tests`

Result: test passes.