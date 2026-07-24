import { mergeConfig } from "vite";
import { defineConfig } from "vitest/config";
import viteConfig from "./vite.config";

export default mergeConfig(
  viteConfig,
  defineConfig({
    test: {
      environment: "jsdom",
      globals: true,
      include: ["src/**/*.{test,spec}.{ts,tsx}"],
      passWithNoTests: true,
      setupFiles: ["src/test/setup.ts"],
      coverage: {
        provider: "v8",
        include: ["src/**/*.{ts,tsx}"],
        exclude: [
          "src/**/*.{test,spec}.{ts,tsx}",
          "src/test/**",
          "src/main.tsx",
          "src/**/*.stories.*",
          // App wiring (router, providers, entry, query client) — not unit-tested.
          "src/app/**",
          "src/lib/**",
          "src/services/**"
        ],
        reporter: ["text", "html"]
      }
    }
  })
);
