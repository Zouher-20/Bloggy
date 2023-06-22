<script setup>
const props = defineProps(["categories", "modelValue"]);
const emit = defineEmits(["update:modelValue"]);
const selectedCat = computed({
  set(val) {
    emit("update:modelValue", val);
  },
  get() {
    return props.modelValue;
  },
});
const clearSelected = () => {
  selectedCat.value = null;
};
</script>
<template>
  <div
    class="flex lg:inline-flex justify-between items-center bg-gray-100 space-x-2 rounded-lg py-2 px-2"
  >
    <select
      required
      class="bg-transparent w-full rounded-lg"
      name="category"
      id="category"
      v-model="selectedCat"
    >
      <option :value="null">select category ...</option>
      <option v-for="(cat, i) in categories.value" :key="i">
        {{ cat }}
      </option>
    </select>
    <button
      :disabled="!selectedCat"
      class="text-red-500 hover:text-red-800 text-lg"
      @click="clearSelected"
    >
      ×
    </button>
  </div>
</template>
