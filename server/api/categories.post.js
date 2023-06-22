import * as fs from "fs";
export default defineEventHandler(async (event) => {
  var data = JSON.parse(fs.readFileSync("server/db/categoriesdb.json"));
  const body = await readBody(event);
  data.push(body.category);
  fs.writeFileSync("server/db/categoriesdb.json", JSON.stringify(data));
  return true;
});
