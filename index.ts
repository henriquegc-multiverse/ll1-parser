import fs from "node:fs";

const table = fs.readFileSync("./entry.csv", "utf-8").toString();

console.log(table);
