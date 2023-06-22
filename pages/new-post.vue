<script setup>
import CategoriesSelect from "~/components/CategoriesSelect.vue";
import { useToast } from "vue-toastification";
const toast = useToast();

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
    onResponse(_) {
      toast.success("Post has been published successfully");
      router.push("/");
    },
    onResponseError(_) {
      toast.error("There was an error publishing your post");
    },
  });
};

useSeoMeta(() => {
  return {
    title: "Create New Post",
    ogTitle: "Bloggy - blog platform",
    ogDescription: "Create amazing blog posts using Bloggy",
  };
});
</script>

<template>
  <form
    @submit.prevent="onFormSubmitted"
    class="lg:w-1/3 md:w-1/2 mx-auto w-11/12"
  >
    <BackLink class="my-8" />
    <h1 class="font-bold text-3xl lg:text-4xl mb-5">Create New Post</h1>
    <hr class="mb-8" />

    <div class="p-4 space-y-10">
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
        rows="6"
      />

      <CategoriesSelect v-model="formObj.categories" />

      <button
        class="py-3 lg:w-fit mt-4 w-full px-8 ml-auto bg-blue-500 text-white rounded-full"
        type="submit"
      >
        Save
      </button>
    </div>
  </form>
</template>
