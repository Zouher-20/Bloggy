import * as fs from "fs";
export default defineEventHandler((event) => {
  try {
    var data = JSON.parse(fs.readFileSync("server/db/categoriesdb.json"));
    return data;
  } catch (err) {
    return err;
  }
});
