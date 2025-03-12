/// <reference path="./wasi-cli-terminal-output.d.ts" />
declare module 'wasi:cli/terminal-stdout@0.2.3' {
  /**
   * If stdout is connected to a terminal, return a `terminal-output` handle
   * allowing further interaction with it.
   */
  export function getTerminalStdout(): TerminalOutput | undefined;
  export type TerminalOutput = import('wasi:cli/terminal-output@0.2.3').TerminalOutput;
}
