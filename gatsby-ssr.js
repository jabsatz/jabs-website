import i18n from "./src/i18n"

export function replaceRenderer({ bodyComponent, replaceBodyHTMLString }) {
  i18n.loadNamespaces(["common"], () => {
    replaceBodyHTMLString(bodyComponent)
  })
}
