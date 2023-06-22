<script setup>
const emit = defineEmits(["update:modelValue"]);
const props = defineProps(["modelValue", "pagination"]);

const page = computed({
  set(val) {
    emit("update:modelValue", val);
  },
  get() {
    return props.modelValue;
  },
});
</script>

<template>
  <div>
    <a
      @click="page = pageNum"
      v-for="pageNum in pagination.pages"
      :key="pageNum"
      :class="{ 'bg-blue-400 text-white': pageNum === page }"
      href="#"
      class="relative inline-flex items-center px-4 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-100 focus:z-20 focus:outline-offset-0"
      >{{ pageNum }}</a
    >
  </div>
</template>
