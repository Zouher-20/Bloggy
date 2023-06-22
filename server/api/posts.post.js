import * as fs from "fs";
export default defineEventHandler(async (event) => {
  var data = JSON.parse(fs.readFileSync("server/db/postsdb.json"));
  const body = await readBody(event);
  var newPost = {
    ...body,
    id: Math.floor(Math.random() * 1000000000),
    publishedAt: new Date(),
    comments: [],
    categories: [],
  };

  data.push(newPost);
  fs.writeFileSync("server/db/postsdb.json", JSON.stringify(data));
  return true;
  res.statusCode = 200;
  res.setHeader("Content-Type", "application/json");
  res.end(json);
});
