import {
  FullConfig,
  FullResult,
  Reporter,
  Suite,
} from "@playwright/test/reporter";

// @ts-ignore
import profiler from "cpupro";

export type CpuProOptions = {
  open?: boolean;
  fileName?: string;
  generateHtml?: boolean;
};

export default class CpuProReporter implements Reporter {
  protected options: Required<CpuProOptions> = {} as never;
  constructor(options?: CpuProOptions) {
    this.options.fileName = options?.fileName ?? "profile";
    this.options.generateHtml = options?.generateHtml ?? false;
    this.options.open = options?.open ?? false;
  }
  onBegin(config: FullConfig<{}, {}>, suite: Suite): void {
    // TODO: enable only for chromium
    if (config.projects) profiler.profile(this.options.fileName);
  }

  onEnd(
    result: FullResult,
  ): void | Promise<
    | void
    | { status?: "passed" | "failed" | "timedout" | "interrupted" | undefined }
    | undefined
  > {
    const profile = profiler.profileEnd(this.options.fileName);
    // write data to .cpuprofile file
    profile.writeToFile(`playwright-report/${this.options.fileName}.cpuprofile`);

    if (this.options.generateHtml) {
      // or write a report (the viewer with embedded data) to file
      profile.report.writeToFile(`playwright-report/${this.options.fileName}.html`);
    }
    if (this.options.open) {
      profile.report.open();
    }
  }
}
