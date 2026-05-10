<template>
  <div class="filter-bar">
    <label>Filter by category:</label>
    <div class="custom-select" :class="{ open: isOpen }" ref="dropdownRef">
      <button class="custom-select__trigger" @click="isOpen = !isOpen" type="button">
        <span>{{ selectedLabel }}</span>
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <path d="M6 9l6 6 6-6"/>
        </svg>
      </button>
      <ul v-if="isOpen" class="custom-select__menu">
        <li
          class="custom-select__option"
          :class="{ active: modelValue === '' }"
          @click="select('')"
        >
          All categories
        </li>
        <li
          v-for="category in categories"
          :key="category.id"
          class="custom-select__option"
          :class="{ active: String(modelValue) === String(category.id) }"
          @click="select(category.id)"
        >
          {{ category.name }}
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'

const props = defineProps({
  categories: { type: Array, default: () => [] },
  modelValue: { type: [String, Number], default: '' },
})

const emit = defineEmits(['update:modelValue'])

const isOpen = ref(false)
const dropdownRef = ref(null)

const selectedLabel = computed(() => {
  if (!props.modelValue) return 'All categories'
  const found = props.categories.find(c => String(c.id) === String(props.modelValue))
  return found ? found.name : 'All categories'
})

const select = (value) => {
  emit('update:modelValue', value)
  isOpen.value = false
}

const handleClickOutside = (e) => {
  if (dropdownRef.value && !dropdownRef.value.contains(e.target)) {
    isOpen.value = false
  }
}

onMounted(() => document.addEventListener('click', handleClickOutside))
onUnmounted(() => document.removeEventListener('click', handleClickOutside))
</script>

<style scoped>
.custom-select {
  position: relative;
  min-width: 200px;
}

.custom-select__trigger {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 8px;
  background: #161616;
  border: 1px solid #2a2a2a;
  border-radius: 6px;
  color: #f0ede8 !important;
  padding: 10px 16px;
  font-size: 0.9rem;
  font-family: 'DM Sans', sans-serif;
  cursor: pointer;
  transition: border-color 0.2s;
}

.custom-select__trigger:hover {
  border-color: #e8c97e;
}

.custom-select__trigger svg {
  transition: transform 0.2s;
  flex-shrink: 0;
  color: #888 !important;
}

.custom-select.open .custom-select__trigger svg {
  transform: rotate(180deg);
}

.custom-select__menu {
  position: absolute;
  top: calc(100% + 4px);
  left: 0;
  right: 0;
  background: #1f1f1f !important;
  border: 1px solid #2a2a2a;
  border-radius: 6px;
  list-style: none;
  z-index: 50;
  overflow: hidden;
  box-shadow: 0 8px 24px rgba(0,0,0,0.4);
}

.custom-select__option {
  padding: 10px 16px;
  font-size: 0.9rem;
  color: #f0ede8 !important;
  background: #1f1f1f !important;
  cursor: pointer;
  transition: background 0.15s;
}

.custom-select__option:hover {
  background: #161616 !important;
  color: #f0ede8 !important;
}

.custom-select__option.active {
  color: #e8c97e !important;
  background: rgba(232, 201, 126, 0.12) !important;
}
</style>