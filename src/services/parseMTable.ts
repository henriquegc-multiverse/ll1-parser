import { Parser } from "../models/parser";
import { generateParserKey } from "../utils/generateParserKey";

export function parseMTable(input: string): Parser {
  const map = new Map<string, string>();
  const rows = input.trim().split("\n");

  const header = rows.shift();
  const terminals: string[] = header?.split(",").slice(1) as string[];

  for (const row of rows) {
    const productions = row.split(",");
    const variable = productions.shift() as string;

    for (let i = 0; i < productions.length; i++) {
      if (productions[i] !== "") {
        const [_, value] = productions[i].split("=");
        map.set(generateParserKey(terminals[i], variable), value);
      }
    }
  }

  return {
    map,
    terminals,
  };
}
