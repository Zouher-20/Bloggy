<script setup>
import CategoriesSelect from "~/components/CategoriesSelect.vue";

var formObj = reactive({
  title: "",
  body: "",
  categories: [],
});
const router = useRouter();
const onFormSubmitted = async () => {
  const _ = await useFetch(() => `/api/posts`, {
    body: formObj,
    method: "POST",
  });
  router.push("/");
};

useSeoMeta(() => {
  return {
    title: "Create New Post",
    ogTitle: "Bloggy - blog platform",
    description: "a blog platform made by Zouhair Nasser with Nuxt.js",
    ogDescription: "a blog platform made by Zouhair Nasser with Nuxt.js",
  };
});
</script>

<template>
  <form
    @submit.prevent="onFormSubmitted"
    class="lg:w-1/3 md:w-1/2 mx-auto w-11/12"
  >
    <BackLink class="my-8" />
    <div class="border bg-gray-100 my-5 rounded-lg">
      <div class="text-xl shadow-lg p-2 text-blue-500">Create New Post</div>
      <hr />

      <div class="p-4 space-y-4">
        <InputField
          label="Title"
          id="title"
          name="title"
          required
          type="text"
          v-model="formObj.title"
        />

        <TextareaField
          required
          label="Body"
          id="body"
          name="body"
          v-model="formObj.body"
        />

        <CategoriesSelect v-model="formObj.categories" />

        <button
          class="py-3 lg:w-fit mt-4 w-full px-8 ml-auto bg-blue-500 text-white rounded-full"
          type="submit"
        >
          Save
        </button>
      </div>
    </div>
  </form>
</template>
