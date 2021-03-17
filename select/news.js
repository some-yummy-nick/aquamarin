import withSeo from '@/select/seo'

export const selectNewsList = withSeo(({ data, meta }) => {
  return { news: data, total: meta.total_pages }
})

export const selectNewsItem = withSeo(({ data }) => {
  return { news: data }
})
