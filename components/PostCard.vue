<script setup>
const emit = defineEmits(["categorySelected"]);
const props = defineProps(["post"]);
const dayjs = useDayjs();
</script>

<template>
  <article
    class="transition-colors duration-300 hover:bg-gray-100 border border-black border-opacity-0 hover:border-opacity-5 rounded-xl"
  >
    <div class="py-6 px-5">
      <div class="flex flex-col justify-between">
        <header>
          <div class="gap-2 flex flex-wrap">
            <span
              v-for="(cat, i) in post.categories"
              :key="i"
              @click="emit('categorySelected', cat)"
              class="px-3 py-1 border border-blue-400 cursor-pointer rounded-full text-blue-400 text-xs uppercase font-semibold"
              style="font-size: 10px"
              >{{ cat }}</span
            >
          </div>
          <div class="mt-4">
            <h1 class="text-3xl h-36">
              {{ post.title }}
            </h1>

            <span class="mt-2 block text-gray-400 text-xs">
              Published <time>{{ dayjs(post.publishedAt).fromNow() }}</time>
            </span>
          </div>
        </header>

        <div class="text-sm mt-4">
          <p class="h-24">
            {{ post.body }}
          </p>
        </div>

        <footer class="flex justify-between items-center mt-8">
          <div>
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
