<script setup>
const props = defineProps(["post"]);
const dayjs = useDayjs();
</script>

<template>
  <article
    class="transition-colors duration-300 hover:bg-gray-100 border border-black border-opacity-0 hover:border-opacity-5 rounded-xl"
  >
    <div class="py-6 px-5 lg:flex">
      <div class="flex-1 flex flex-col justify-between">
        <header class="mt-8 lg:mt-0">
          <a
            href="#"
            class="px-3 py-1 border border-blue-400 rounded-full text-blue-400 text-xs uppercase font-semibold"
            style="font-size: 10px"
            >Technical</a
          >

          <div class="mt-4">
            <h1 class="text-3xl">
              {{ post.title }}
            </h1>

            <span class="mt-2 block text-gray-400 text-xs">
              Published <time>{{ dayjs(post.publishedAt).fromNow() }}</time>
            </span>
          </div>
        </header>

        <div class="text-sm mt-2">
          <p>
            {{ post.body }}
          </p>
        </div>

        <footer class="flex justify-between items-center mt-8">
          <div class="block">
            <NuxtLink
              :to="`/posts/${post.id}`"
              class="transition-colors duration-300 text-xs font-semibold bg-gray-200 hover:bg-gray-300 rounded-full py-2 px-8"
              >Read More</NuxtLink
            >
          </div>
        </footer>
      </div>
    </div>
  </article>
</template>
