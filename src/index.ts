import fs from "node:fs";

import { main } from "./main";

const table = fs.readFileSync("./data/table.csv", "utf-8").toString();

let userEntryAccept = fs
  .readFileSync("./data/input.txt", "utf-8")
  .toString()
  .trim();

main(table, userEntryAccept);
