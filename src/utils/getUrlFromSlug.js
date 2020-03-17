export default function getUrlFromSlug(slug) {
  const langMatch = slug.match(/\/\w{2}\/$/)
  const lang = langMatch && langMatch[0].substring(1, 3)
  const basePath = slug.replace(/\/\w{2}\/$/, "")
  const path = lang ? `/${lang}${basePath}/` : basePath
  return path
}
