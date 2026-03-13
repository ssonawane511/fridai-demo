/**
 * Simple smoke test to verify Jest + ESM works locally.
 * Run: npm test
 */
import { DocsSDK } from "../sdk/index.js";

describe("DocsSDK smoke test", () => {
  it("instantiates", () => {
    const sdk = new DocsSDK();
    expect(sdk).toBeDefined();
  });

  it("create() throws (not implemented)", () => {
    const sdk = new DocsSDK();
    expect(() => sdk.create({ id: "x", title: "t", content: "c" })).toThrow(
      "Better luck next time, not implemented this"
    );
  });
});
