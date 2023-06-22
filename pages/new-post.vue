<script setup>
var formObj = reactive({
  title: "",
  body: "",
});

const onFormSubmitted = async () => {
  const { data, pending, error } = await useFetch(() => `/api/posts`, {
    body: formObj,
    method: "POST",
  });
  console.log(data);
};
</script>

<template>
  <form @submit.prevent="onFormSubmitted" class="flex justify-center w-full">
    <!-- var x = Math.floor((Math.random() * 10000))  -->
    <div class="border bg-gray-100 my-5 w-1/3 rounded-lg">
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

        <button
          class="py-3 px-8 ml-auto bg-blue-500 text-white rounded-full"
          type="submit"
        >
          Save
        </button>
      </div>
    </div>
  </form>
</template>
