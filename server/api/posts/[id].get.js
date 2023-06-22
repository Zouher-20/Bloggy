import * as fs from "fs";
export default defineEventHandler((event) => {
  try {
    var data = JSON.parse(fs.readFileSync("server/db/postsdb.json"));
    var result = data.find(
      (el) => el.id.toString() === event.context.params.id
    );
    result.comments = result.comments.sort(function (a, b) {
      return new Date(b.publishedAt) - new Date(a.publishedAt);
    });
    return result;
  } catch (err) {
    return err;
  }
});
