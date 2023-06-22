<script setup>
const emit = defineEmits(["update:modelValue"]);
const props = defineProps(["modelValue"]);
const { data, error, refresh } = await useFetch(() => `/api/categories`);
var selected = ref([]);
const newCategory = ref("");
const onCategoryPushed = async () => {
  const categoryCreate = await useFetch(() => `/api/categories`, {
    method: "POST",
    body: {
      category: newCategory.value,
    },
  });
  refresh();
};
const toggleCategory = (cat) => {
  if (selected.value.includes(cat))
    selected.value.splice(selected.value.indexOf(cat), 1);
  else selected.value.push(cat);
  emit("update:modelValue", selected.value);
};
</script>

<template>
  <div class="flex flex-wrap items-center gap-4">
    <TransitionGroup
      v-if="data.length > 0"
      tag="ul"
      name="fade"
      class="flex flex-wrap items-center gap-4"
    >
      <li
        @click="toggleCategory(category)"
        v-for="(category, index) in data"
        :key="index"
        :class="{ 'bg-blue-400 text-white': selected.includes(category) }"
        class="px-3 cursor-pointer py-1 border border-blue-400 rounded-full text-blue-400 text-xs uppercase font-semibold"
        style="font-size: 10px"
      >
        {{ category }}
      </li>
    </TransitionGroup>
    <form @submit.prevent="onCategoryPushed">
      <input
        class="border-b-2 rounded-xl w-32 text-sm py-1 px-2"
        required
        type="text"
        v-model="newCategory"
        placeholder="other ..."
      />
    </form>
  </div>
</template>
