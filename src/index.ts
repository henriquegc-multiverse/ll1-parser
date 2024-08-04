import fs from "node:fs";
import { Stack } from "./stack";

const table = fs.readFileSync("./entry.csv", "utf-8").toString();

let userEntryAccept = "i+i*i$";

interface ReturnFunction {
  map: Map<string, string>;
  terminals: string[];
}

function parseInputToHashMap(input: string): ReturnFunction {
  const map = new Map<string, string>();
  const rows = input.trim().split("\n");

  const header = rows.shift();
  const terminals: string[] = header?.split(",").slice(1) as string[];

  for (const row of rows) {
    const productions = row.split(",");
    const variable = productions.shift() as string;

    for (let i = 0; i < productions.length; i++) {
      if (productions[i] !== "") {
        const [key, value] = productions[i].split("=");
        map.set(`${terminals[i]}-#-${variable}`, value);
      }
    }
  }

  return {
    map,
    terminals,
  };
}

const hashmap = parseInputToHashMap(table);

const stack = new Stack<string>();

stack.push("E");

while (userEntryAccept !== "") {
  const aa = userEntryAccept[0];

  console.log("Stack: ", stack);
  console.log("Entry: ", aa, " - ", userEntryAccept);

  if (stack.isEmpty()) {
    console.log("Success");
    break;
  }

  if (hashmap.terminals.includes(stack.peek() as string)) {
    userEntryAccept = userEntryAccept.slice(1);
    stack.pop();

    continue;
  }

  // Null
  if (stack.peek() === "#") {
    stack.pop();

    continue;
  }

  // Derive
  let b = hashmap.map.get(`${aa}-#-${stack.peek()}`);
  if (!b) {
    console.error("Parsing error");
    break;
  }

  let aaaa = b.split("").reverse();
  stack.pop();

  aaaa?.forEach((e) => stack.push(e));
}
