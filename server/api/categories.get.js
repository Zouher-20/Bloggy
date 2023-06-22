import * as fs from "fs";
export default defineEventHandler((event) => {
  var data = JSON.parse(fs.readFileSync("server/db/categoriesdb.json"));
  return data;
  res.statusCode = 200;
  res.setHeader("Content-Type", "application/json");
  res.end(json);
});
