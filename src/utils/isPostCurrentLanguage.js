const isPostCurrentLanguage = lang => ({ node: { fileAbsolutePath } }) => {
  if (lang === "en" && fileAbsolutePath.endsWith("index.md")) {
    return true
  }
  return fileAbsolutePath.endsWith(`${lang}.md`)
}

export default isPostCurrentLanguage
