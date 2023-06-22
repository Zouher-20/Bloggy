<script setup>
import { useToast } from "vue-toastification";
const toast = useToast();
const route = useRoute();
const dayjs = useDayjs();

definePageMeta({
  validate: async (route) => {
    return /^\d+$/.test(route.params.id);
  },
});

const { data, refresh } = await useFetch(
  () => `/api/posts/${route.params.id}`,
  {
    onResponseError() {
      throw createError({ statusCode: 404, statusMessage: "Page Not Found" });
    },
  }
);

useSeoMeta(() => {
  return {
    title: data.value.title,
    ogTitle: data.value.title,
    ogDescription: data.value.body,
  };
});

const onCommentSubmitted = async (comment) => {
  const _ = await useFetch(() => `/api/comments/${route.params.id}`, {
    method: "POST",
    body: { body: comment },
    onResponse() {
      toast.success("Comment has been published .");
      refresh();
    },
    onResponseError() {
      toast.error("There was an error publishing your comment !");
    },
  });
};
</script>

<template>
  <main class="max-w-4xl mx-auto mt-10 lg:mt-20 space-y-6">
    <!-- 👉 Post COntent -->

    <article class="mb-12 flex flex-col">
      <BackLink class="w-fit mb-8" />

      <div class="w-full">
        <h1 class="font-bold text-3xl lg:text-4xl mb-5">
          {{ data.title }}
        </h1>
        <time class="my-4 block text-gray-400 text-xs">
          {{ dayjs(data.publishedAt).format("MMM DD ,  YYYY") }}
        </time>
        <p class="lg:text-lg leading-loose">
          {{ data.body }}
        </p>
      </div>
    </article>

    <!-- 👉 Post Comments -->

    <section>
      <CommentForm class="mt-2" @comment-submitted="onCommentSubmitted" />
      <TransitionGroup tag="ul" name="fade" class="container">
        <li
          v-for="(comment, index) in data.comments"
          :key="comment.publishedAt"
        >
          <article class="my-4 flex gap-2 p-8 bg-gray-100 rounded-xl">
            <div style="width: 85%">
              <div>
                <header class="mb-4">
                  <h3 class="font-bold text-lg mb-1">Anonymous</h3>
                  <time class="text-xs">{{
                    dayjs(comment.publishedAt).fromNow()
                  }}</time>
                </header>
              </div>
              <p>
                {{ comment.body }}
              </p>
            </div>
          </article>
        </li>
      </TransitionGroup>

      <!-- 👉 No Commments Alert -->

      <div
        v-if="data.comments.length === 0"
        class="text-center text-gray-400 w-100 my-8"
      >
        there is no comments yet ...
      </div>
    </section>
  </main>
</template>
