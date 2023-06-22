<script setup>
import BackLink from "~/components/BackLink.vue";
import CommentForm from "~/components/CommentForm.vue";
definePageMeta({
  validate: async (route) => {
    return /^\d+$/.test(route.params.id);
  },
});
const route = useRoute();
const { data, pending, error, refresh } = await useFetch(
  () => `/api/posts/${route.params.id}`
);
if (error.value) {
  throw createError({ statusCode: 404, statusMessage: "Page Not Found" });
}

useSeoMeta(() => {
  return {
    title: data.value.title,
    ogTitle: data.value.title,
    description: data.value.body,
    ogDescription: data.value.body,
  };
});

const onCommentSubmitted = async (comment) => {
  const { data, pending, error } = await useFetch(
    () => `/api/comments/${route.params.id}`,
    {
      method: "POST",
      body: { body: comment },
    }
  );
  refresh();
};

const dayjs = useDayjs();
</script>

<template>
  <section class="px-6 py-8">
    <main class="max-w-4xl mx-auto mt-10 lg:mt-20 space-y-6">
      <article class="mb-12 mx-auto lg:grid lg:grid-cols-8 gap-x-10">
        <div class="flex col-span-12 justify-between mb-6">
          <BackLink />
        </div>

        <div class="col-span-8">
          <h1 class="font-bold text-3xl lg:text-4xl mb-10">
            {{ data.title }}
          </h1>
          <p class="my-4 block text-gray-400 text-xs">
            {{ dayjs(data.publishedAt).fromNow() }}
          </p>
          <div class="lg:text-lg leading-loose">
            <p>
              {{ data.body }}
            </p>
          </div>
        </div>
      </article>
      <section>
        <CommentForm class="mt-2" @comment-submitted="onCommentSubmitted" />
        <TransitionGroup
          v-if="data.comments.length > 0"
          tag="ul"
          name="fade"
          class="container"
        >
          <li
            v-for="(comment, index) in data.comments"
            :key="comment.publishedAt"
          >
            <article class="my-4 flex gap-2 p-8 bg-gray-100 rounded-xl">
              <div style="width: 85%">
                <div>
                  <header class="mb-2">
                    <h3 class="font-bold text-lg mb-2">Anonymous</h3>
                    <p class="text-xs">
                      <time>{{ dayjs(comment.publishedAt).fromNow() }}</time>
                    </p>
                  </header>
                </div>
                <p>
                  {{ comment.body }}
                </p>
              </div>
            </article>
          </li>
        </TransitionGroup>
        <div v-else class="text-center text-gray-400 w-100 my-8">
          there is no comments yet ...
        </div>
      </section>
    </main>
  </section>
</template>
