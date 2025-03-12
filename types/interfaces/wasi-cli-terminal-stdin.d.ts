/// <reference path="./wasi-cli-terminal-input.d.ts" />
declare module 'wasi:cli/terminal-stdin@0.2.3' {
  /**
   * If stdin is connected to a terminal, return a `terminal-input` handle
   * allowing further interaction with it.
   */
  export function getTerminalStdin(): TerminalInput | undefined;
  export type TerminalInput = import('wasi:cli/terminal-input@0.2.3').TerminalInput;
}
