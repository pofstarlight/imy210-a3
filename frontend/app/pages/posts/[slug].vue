<template>
  <main>
    <div class="container">
      <div class="post-full">
        <NuxtLink to="/" class="back-link">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M19 12H5M12 5l-7 7 7 7"/>
          </svg>
          Back to all posts
        </NuxtLink>

        <div v-if="pending" class="state-message">
          <p>Loading post...</p>
        </div>

        <div v-else-if="!post" class="state-message">
          <h3>Post not found</h3>
          <p>This post doesn't exist or may have been removed.</p>
        </div>

        <article v-else>
          <div v-if="post.category" class="post-full__category">
            {{ post.category.name }}
          </div>
          <h1 class="post-full__title">{{ post.title }}</h1>
          <div class="post-full__meta">
            <span>By {{ post.author }}</span>
          </div>
          <div class="post-full__content" v-html="renderedContent" />
        </article>
      </div>
    </div>
  </main>
</template>

<script setup>
import { marked } from 'marked'

const route = useRoute()
const { fetchPostBySlug } = usePosts()

const { data: post, pending } = await useAsyncData(
  `post-${route.params.slug}`,
  () => fetchPostBySlug(route.params.slug)
)

const renderedContent = computed(() => {
  if (!post.value?.content) return ''

  // Strapi Blocks (v5) returns an array — convert to markdown string first
  if (Array.isArray(post.value.content)) {
    const text = post.value.content
      .map((block) => {
        if (block.type === 'paragraph') {
          return block.children?.map((c) => c.text).join('') ?? ''
        }
        if (block.type === 'heading') {
          const level = '#'.repeat(block.level ?? 2)
          return `${level} ${block.children?.map((c) => c.text).join('') ?? ''}`
        }
        if (block.type === 'list') {
          return block.children
            ?.map((item) => `- ${item.children?.map((c) => c.text).join('') ?? ''}`)
            .join('\n') ?? ''
        }
        if (block.type === 'code') {
          return `\`\`\`\n${block.children?.map((c) => c.text).join('') ?? ''}\n\`\`\``
        }
        return ''
      })
      .join('\n\n')
    return marked(text)
  }

  // Plain markdown string (if you used the Markdown field type in Strapi)
  return marked(post.value.content)
})

useHead({
  title: post.value?.title ?? 'Post',
})
</script>