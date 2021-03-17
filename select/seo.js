export default function withSeo(f) {
  return function(args) {
    try {
      return {
        ...f(args),
        seo: args.meta.seo
      }
    } catch (error) {
      throw error
    }
  }
}
