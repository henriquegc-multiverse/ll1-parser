export function generateParserKey(terminal: string, variable: string): string {
  return `${terminal}-#-${variable}`;
}
