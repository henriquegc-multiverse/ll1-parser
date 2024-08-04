import { ParserError } from "../errors/ParserError";
import { Stack } from "../lib/stack";

interface ILogger {
  stack?: Stack<string>;
  symbol?: string;
  actualEntryInput?: string;
  error?: ParserError;
}

export function logger({
  stack,
  symbol,
  actualEntryInput,
  error,
}: ILogger): void {
  console.table({
    Error: error?.message,
    Stack: stack,
    Entry: symbol,
    "Actual input": actualEntryInput,
  });
}
