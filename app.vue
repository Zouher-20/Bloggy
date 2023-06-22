<script setup>
const { data } = await useFetch("/api/hello");
</script>

<template>
  <div>
    <nav class="md:flex bg-blue-500 w-full py-5 md:items-center">
      <div class="ml-2 space-x-4">
        <NuxtLink class="text-white text-xl" to="/">Bloggy</NuxtLink>
        <NuxtLink
          to="/new-post"
          class="bg-green-500 ml-3 rounded-full text-xs font-semibold text-white uppercase py-3 px-5"
        >
          <span class="text-lg"> + </span>
          New Post
        </NuxtLink>
      </div>
    </nav>
    <NuxtPage />
  </div>
</template>
