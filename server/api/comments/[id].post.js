import * as fs from "fs";
export default defineEventHandler(async (event) => {
  try {
    var data = JSON.parse(fs.readFileSync("server/db/postsdb.json"));
    const body = await readBody(event);
    var newComment = {
      ...body,
      publishedAt: new Date(),
    };

    var post = data.find((el) => el.id.toString() === event.context.params.id);
    post.comments.push(newComment);
    fs.writeFileSync("server/db/postsdb.json", JSON.stringify(data));

    return "success";
  } catch (err) {
    return err;
  }
});
