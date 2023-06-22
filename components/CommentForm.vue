<script setup>
const emit = defineEmits(["commentSubmitted"]);
const comment = ref("");
</script>

<template>
  <form
    @submit.prevent="emit('commentSubmitted', comment)"
    class="border border-gray-200 p-3 rounded-xl"
  >
    <textarea
      required
      class="w-full text-sm p-4 focus:outline-none focus:ring"
      placeholder="Tell us what you think"
      name="body"
      cols="20"
      rows="3"
      v-model="comment"
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
</template>
