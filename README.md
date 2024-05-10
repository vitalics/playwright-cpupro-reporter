# Playwright cpupro reporter

This reported based on [cpupro](https://github.com/lahmatiy/cpupro) package. Please check it out for CLI options.

## Get Started

```sh
npm i playwright-cpupro-reporter # npm
yarn add playwright-cpupro-reporter # yarn
pnpm add playwright-cpupro-reporter # pnpm
bun a playwright-cpupro-reporter # bun
```

## Configure reporter

In your `playwright.config.ts` add next lines:

```ts
// filename: playwright.config.ts
export default defineConfig({
  // ...
  reporter: [
    [
      "playwright-cpupro-reporter",
      {
        // options object
      },
    ],
  ],
  // ...
});
```

## Reporter Options

**NOTE**: Reporter will always use `playwright-report` directory. Since playwright folder for reporters.

| `name`         | `description`                 | `default` |
| -------------- | ----------------------------- | --------- |
| `fileName`     | output filename               | `profile` |
| `open`         | open genenrated HTML report.  | `false`   |
| `generateHtml` | generate html profiler output | `false`   |
