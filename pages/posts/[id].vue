<script setup>
definePageMeta({
  validate: async (route) => {
    return /^\d+$/.test(route.params.id);
  },
});
const route = useRoute();
const { data, pending, error } = await useFetch(
  () => `/api/posts/${route.params.id}`
);
if (error.value) {
  throw createError({ statusCode: 404, statusMessage: "Page Not Found" });
}

const dayjs = useDayjs();
</script>

<template>
  <section class="px-6 py-8">
    <main class="max-w-4xl mx-auto mt-10 lg:mt-20 space-y-6">
      <article class="mb-12 mx-auto lg:grid lg:grid-cols-8 gap-x-10">
        <div class="flex col-span-12 justify-between mb-6">
          <NuxtLink
            to="/"
            class="transition-colors duration-300 relative inline-flex items-center text-lg hover:text-blue-500"
          >
            <svg width="22" height="22" viewBox="0 0 22 22" class="mr-2">
              <g fill="none" fill-rule="evenodd">
                <path
                  stroke="#000"
                  stroke-opacity=".012"
                  stroke-width=".5"
                  d="M21 1v20.16H.84V1z"
                ></path>
                <path
                  class="fill-current"
                  d="M13.854 7.224l-3.847 3.856 3.847 3.856-1.184 1.184-5.04-5.04 5.04-5.04z"
                ></path>
              </g>
            </svg>

            Back to Posts
          </NuxtLink>
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
        <form class="mt-2 border border-gray-200 p-3 rounded-xl">
          <textarea
            required
            class="w-full text-sm p-4 focus:outline-none focus:ring"
            placeholder="Tell us what you think"
            name="body"
            cols="20"
            rows="3"
          />
          <hr class="my-2" />
          <div class="flex justify-end">
            <button
              class="py-3 px-8 ml-auto bg-blue-500 text-white rounded-full"
              type="submit"
            >
              Post
            </button>
          </div>
        </form>

        <article
          v-if="data.comments.length > 0"
          v-for="(comment, index) in data.comments"
          :key="index"
          class="my-4 flex gap-2 p-8 bg-gray-100 rounded-xl"
        >
          <div style="width: 85%">
            <div>
              <header class="mb-2">
                <h3 class="font-bold text-lg mb-2">Anonymous</h3>
                <p class="text-xs">
                  <time>22 - 10 - 2023</time>
                </p>
              </header>
            </div>
            <p>
              Lorem ipsum dolor, sit amet consectetur adipisicing elit. At
              impedit debitis nostrum? Atque doloremque cupiditate sequi
              delectus asperiores laudantium! Debitis magnam nisi aliquam, odit
              voluptates consequuntur quaerat similique optio velit!
            </p>
          </div>
        </article>
        <div v-else class="text-center text-gray-400 w-100 my-8">
          there is no comments yet ...
        </div>
      </section>
    </main>
  </section>
</template>
