export const usePosts = () => {
  const config = useRuntimeConfig()
  const base = config.public.strapiUrl

  const fetchPosts = async (params = {}) => {
    const query = new URLSearchParams()

    // Always populate category relation
    //CComment #1
    query.append('populate', 'category')

    if (params.categoryId) {
      query.append('filters[category][id][$eq]', params.categoryId)
    }

    const url = `${base}/api/blog-posts?${query.toString()}`
    const data = await $fetch(url)
    return data.data.map(normalizePost)
  }

  const fetchPostBySlug = async (slug) => {
    const url = `${base}/api/blog-posts?filters[slug][$eq]=${slug}&populate=category`
    const data = await $fetch(url)
    if (!data.data || data.data.length === 0) return null
    return normalizePost(data.data[0])
  }

const fetchCategories = async () => {
  const data = await $fetch(`${base}/api/categories`)
  return data.data.map((c) => ({
    id: c.id,
    name: c.category ?? c.name ?? c.attributes?.name,
  }))
}

  // Strapi v5 returns flat attributes, v4 uses .attributes — this handles both
  const normalizePost = (item) => {
    const attrs = item.attributes ?? item
    return {
      id: item.id,
      title: attrs.title,
      author: attrs.author,
      snippet: attrs.snippet,
      content: attrs.content,
      slug: attrs.slug,
      category: attrs.category?.data
        ? { id: attrs.category.data.id, name: attrs.category.data.attributes?.name ?? attrs.category.data.name }
        : attrs.category ?? null,
    }
  }

  return { fetchPosts, fetchPostBySlug, fetchCategories }
}