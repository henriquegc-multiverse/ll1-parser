import { Stack } from "./lib/stack";
import { constants } from "./config/constants";
import { parseMTable } from "./services/parseMTable";
import { logger } from "./services/logger";
import { generateParserKey } from "./utils/generateParserKey";
import { ParserError } from "./errors/ParserError";

export function main(table: string, userEntryAccept: string) {
  const parser = parseMTable(table);

  const stack = new Stack<string>();

  stack.push(constants.initialVariable);

  while (userEntryAccept !== "") {
    const symbol = userEntryAccept[0];

    if (stack.isEmpty()) {
      console.log("Success");
      break;
    }

    if (parser.terminals.includes(stack.peek() as string)) {
      userEntryAccept = userEntryAccept.slice(1);
      stack.pop();

      continue;
    }

    if (stack.peek() === constants.emptySymbol) {
      stack.pop();

      continue;
    }

    let production = parser.map.get(
      generateParserKey(symbol, stack.peek() as string)
    );

    if (!production) {
      logger({
        stack,
        symbol,
        actualEntryInput: userEntryAccept,
        error: new ParserError("Parsing Error"),
      });
      break;
    }

    let reversedProduction = production.split("").reverse();
    stack.pop();

    reversedProduction?.forEach((variable) => stack.push(variable));
  }
}
