<script setup>
const emit = defineEmits(["update:modelValue"]);
const props = defineProps(["modelValue", "label", "id"]);
const value = computed({
  set(val) {
    emit("update:modelValue", val);
  },
  get() {
    return props.modelValue;
  },
});

const attrs = useAttrs();
</script>

<template>
  <div>
    <label class="block mb-2 font-bold text-xs text-gray-700" :for="id">
      {{ label }}
    </label>
    <textarea
      v-model="value"
      class="border border-gray-400 p-2 w-full rounded-lg"
      :id="id"
      v-bind="attrs"
      type="textarea"
    >
    </textarea>
  </div>
</template>
