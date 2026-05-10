<template>
  <NuxtLink :to="`/posts/${post.slug}`" class="post-card">
    <div v-if="post.category" class="post-card__category">
      {{ post.category.name }}
    </div>
    <h2 class="post-card__title">{{ post.title }}</h2>
    <p class="post-card__snippet">{{ post.snippet }}</p>
    <div class="post-card__meta">
      <span>{{ post.author }}</span>
    </div>
  </NuxtLink>
</template>

<script setup>
defineProps({
  post: {
    type: Object,
    required: true,
  },
})
</script>