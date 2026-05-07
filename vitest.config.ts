import { defineConfig } from "vitest/config";

export default defineConfig({
  resolve: {
    alias: {
      "astro:content": "/tests/unit/mocks/astro-content.ts",
    },
  },
  server: {
    allowedHosts: ["bbb6-191-114-9-195.ngrok-free.app"],
  },
  test: {
    include: ["tests/unit/**/*.spec.ts"],
    environment: "node",
    coverage: {
      enabled: false,
    },
  },
});
