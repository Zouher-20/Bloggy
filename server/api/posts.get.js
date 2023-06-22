import * as fs from "fs";
export default defineEventHandler((event) => {
  try {
    var data = JSON.parse(fs.readFileSync("server/db/postsdb.json"));
    data = data.sort(function (a, b) {
      return new Date(b.publishedAt) - new Date(a.publishedAt);
    });
    const query = getQuery(event);
    const page = query.page || 1;
    const search = query.search;
    const category = query.category;

    if (category) {
      data = data.filter((el) => el.categories.includes(category));
    }
    if (search) {
      data = data.filter((el) => el.title.includes(search));
    }

    const response = {
      data: data.slice((page - 1) * 7, page * 7),
      pagination: {
        current: page,
        pages: Math.ceil(data.length / 7),
        total: data.length,
      },
    };
    return response;
  } catch (err) {
    return err;
  }
});
