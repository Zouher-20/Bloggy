import * as fs from "fs";
export default defineEventHandler((event) => {
  var data = JSON.parse(fs.readFileSync("server/db/postsdb.json"));

  return data.find((el) => el.id.toString() === event.context.params.id);
  res.statusCode = 200;
  res.setHeader("Content-Type", "application/json");
  res.end(json);
});
