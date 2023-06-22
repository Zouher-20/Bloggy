<script setup>
const currentPage = ref(1);
const search = ref(null);
const category = ref(null);
const { data, pending, error } = await useFetch(() => `/api/posts`, {
  query: { page: currentPage, search, category },
  watch: [currentPage, search, category],
});
useSeoMeta(() => {
  return {
    title: "Home",
    ogTitle: "Bloggy - blog platform",
    description: "a blog platform made by Zouhair Nasser with Nuxt.js",
    ogDescription: "a blog platform made by Zouhair Nasser with Nuxt.js",
  };
});
const categoriesData = await useFetch(() => `/api/categories`);
</script>

<template>
  <section class="px-6 py-8">
    <header class="max-w-xl mx-auto space-y-5 mt-20 text-center">
      <h1 class="text-4xl text-blue-500">Bloggy</h1>
      <h2 class="inline-flex mt-2">A Blog Platform By Zouhair Nasser</h2>
      <SearchField class="w-full" @search="search = $event" />
      <CategoriesFilter
        class="w-full"
        :categories="categoriesData.data"
        v-model="category"
      />
    </header>

    <main class="max-w-6xl mx-auto mt-6 lg:mt-20 space-y-6">
      <div class="lg:grid gap-2 lg:grid-cols-3">
        <FeaturedPostCard
          @categorySelected="category = $event"
          class="col-span-3"
          v-if="data.data[0]"
          :post="data.data[0]"
        />
        <PostCard
          @categorySelected="category = $event"
          :post="post"
          v-for="post in data.data.slice(1)"
          :key="post.id"
        />
      </div>
      <Pagination
        :pagination="data.pagination"
        v-model="currentPage"
        class="mx-auto w-fit"
      />
    </main>
  </section>
</template>
