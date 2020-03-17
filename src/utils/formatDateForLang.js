const monthNames = {
  en: {
    "01": "January",
    "02": "February",
    "03": "March",
    "04": "April",
    "05": "May",
    "06": "June",
    "07": "July",
    "08": "August",
    "09": "September",
    "10": "October",
    "11": "November",
    "12": "December",
  },
  es: {
    "01": "Enero",
    "02": "Febrero",
    "03": "Marzo",
    "04": "Abril",
    "05": "Mayo",
    "06": "Junio",
    "07": "Julio",
    "08": "Agosto",
    "09": "Septiembre",
    "10": "Octubre",
    "11": "Noviembre",
    "12": "Diciembre",
  },
}

export default function formatDateForLang(date, lang) {
  if (!date.match(/^\d{4}-\d{2}-\d{2}$/)) {
    throw new Error("Date must be in YYYY-MM-DD format")
  }
  const year = date.match(/^\d{4}/)[0]
  const month = date.match(/-\d{2}-/)[0].substring(1, 3)
  console.log(month)
  const day = date.match(/\d{2}$/)[0]
  switch (lang) {
    case "en":
      return `${monthNames.en[month]} ${day}, ${year}`
    case "es":
      return `${day} de ${monthNames.es[month]}, ${year}`
    default:
      throw new Error(`Language ${lang} is invalid`)
  }
}
