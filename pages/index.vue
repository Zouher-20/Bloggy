<script setup>
const currentPage = ref(1);
const search = ref(null);

const { data, pending, error } = await useFetch(() => `/api/posts`, {
  query: { page: currentPage, search },
  watch: [currentPage, search],
});
</script>

<template>
  <section class="px-6 py-8">
    <header class="max-w-xl mx-auto mt-20 text-center">
      <h1 class="text-4xl text-blue-500">Bloggy</h1>
      <h2 class="inline-flex mt-2">A Blog Platform By Zouhair Nasser</h2>

      <SearchField @search="search = $event" />
    </header>

    <main class="max-w-6xl mx-auto mt-6 lg:mt-20 space-y-6">
      <FeaturedPostCard v-if="data.data[0]" :post="data.data[0]" />
      <div class="lg:grid gap-2 lg:grid-cols-3">
        <PostCard
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
