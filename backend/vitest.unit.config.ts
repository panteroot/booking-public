import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    globals: true,
    environment: "node",
    include: ["**/unit/**/*.test.ts"],
    setupFiles: ["./vitest.setup.ts"],
  },
});
