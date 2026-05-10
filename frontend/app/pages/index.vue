<template>
  <main>
    <div class="container">
      <header class="page-header">
        <p class="page-header__eyebrow">Latest writing</p>
        <h1 class="page-header__title">The Blog</h1>
        <p class="page-header__sub">Thoughts, ideas, and everything in between.</p>
      </header>

      <CategoryFilter v-model="selectedCategory" :categories="categories" />

      <div v-if="pending" class="state-message">
        <p>Loading posts...</p>
      </div>

      <div v-else-if="filteredPosts.length === 0" class="state-message">
        <h3>No posts found</h3>
        <p>Try a different category.</p>
      </div>

      <div v-else class="posts-grid">
        <PostCard v-for="post in filteredPosts" :key="post.id" :post="post" />
      </div>
    </div>
  </main>
</template>

<script setup>
const { fetchPosts, fetchCategories } = usePosts()

const selectedCategory = ref('')

const { data: allPosts, pending } = await useAsyncData('posts', () => fetchPosts())
const { data: categories } = await useAsyncData('categories', () => fetchCategories())

const filteredPosts = computed(() => {
  if (!selectedCategory.value) return allPosts.value ?? []
  return (allPosts.value ?? []).filter(
    (p) => p.category && String(p.category.id) === String(selectedCategory.value)
  )
})
</script>