<script setup>
import debounce from "lodash.debounce";
const emit = defineEmits(["search"]);
const search = ref(null);
watch(
  search,
  debounce((val) => {
    emit("search", val);
  }, 500)
);
</script>

<template>
  <div class="space-y-2 lg:space-y-0 lg:space-x-4 mt-8">
    <div
      class="flex lg:inline-flex justify-between items-center bg-gray-100 space-x-2 rounded-lg px-3 py-2"
    >
      <input
        v-model="search"
        type="text"
        name="search"
        placeholder="Find something"
        class="bg-transparent outline-none placeholder-black font-semibold text-sm"
      />
      <button
        :disabled="!search"
        class="text-red-500 hover:text-red-800 text-lg"
        @click="search = null"
      >
        ×
      </button>
    </div>
  </div>
</template>
