<template>
  <main>
    <div class="container">
      <header class="page-header">
        <p class="page-header__eyebrow">Find anything</p>
        <h1 class="page-header__title">Search</h1>
        <p class="page-header__sub">Search by post title or author name.</p>
      </header>

      <div class="filter-bar">
        <div class="search-wrapper">
          <svg class="search-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>
          </svg>
          <input
            v-model="query"
            type="text"
            placeholder="Search posts or authors..."
            autofocus
          />
        </div>
      </div>

      <div v-if="!query" class="state-message">
        <h3>Start typing to search</h3>
        <p>Results will appear as you type.</p>
      </div>

      <div v-else-if="pending" class="state-message">
        <p>Searching...</p>
      </div>

      <div v-else-if="results.length === 0" class="state-message">
        <h3>No results for "{{ query }}"</h3>
        <p>Try a different search term.</p>
      </div>

      <div v-else class="posts-grid">
        <PostCard v-for="post in results" :key="post.id" :post="post" />
      </div>
    </div>
  </main>
</template>

<script setup>
const { fetchPosts } = usePosts()

const query = ref('')

const { data: allPosts, pending } = await useAsyncData('search-posts', () => fetchPosts())

const results = computed(() => {
  if (!query.value.trim()) return []
  const q = query.value.toLowerCase()
  return (allPosts.value ?? []).filter(
    (p) =>
      p.title?.toLowerCase().includes(q) ||
      p.author?.toLowerCase().includes(q)
  )
})
</script>