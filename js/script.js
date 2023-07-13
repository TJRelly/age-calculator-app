const svg = document.querySelector("svg")

const dayLabel = document.querySelector("label.day")
const monthLabel = document.querySelector("label.month")
const yearLabel = document.querySelector("label.year")

const dayInput = document.querySelector("#day")
const monthInput = document.querySelector("#month")
const yearInput = document.querySelector("#year")

const dayError = document.querySelector("p.day")
const monthError = document.querySelector("p.month")
const yearError = document.querySelector("p.year")

const days = document.querySelector("span.days")
const months = document.querySelector("span.months")
const years = document.querySelector("span.years")

const daysText = document.querySelector(".days-text")
const monthsText = document.querySelector(".months-text")
const yearsText = document.querySelector(".years-text")

const redText = "hsl(var(--light-red-var), .75)"
const redBorder = "hsl(var(--light-red-var), .55)"

const LocalDate = JSJoda.LocalDate
let currYear = LocalDate.now().year()

svg.onclick = calculate

function keypress(event) {
  if (event.key == "Enter" || event.which == 13) {
    event.preventDefault()
    return svg.onclick()
  }
}

dayInput.addEventListener("keypress", (event) => {
  keypress(event)
})

monthInput.addEventListener("keypress", (event) => {
  keypress(event)
})

yearInput.addEventListener("keypress", (event) => {
  keypress(event)
})

let inputError, dayInputError, monthInputError, yearInputError, inTheFuture

function calculate() {
  let day = dayInput.value
  let month = monthInput.value
  let year = yearInput.value

  clearInputs()
  clearResults()

  checkDay(day)
  checkMonth(month)
  checkYear(year)

  if (!dayInputError && !monthInputError && !yearInputError)
    checkInput(year, month, day)

  if (!inputError) isInFuture(year, month, day)

  if (!inTheFuture) {
    getYearsMonthsDays(year, month, day)
    years.innerText = getYearsMonthsDays(year, month, day).years || 0
    months.innerText = getYearsMonthsDays(year, month, day).months || 0
    days.innerText = getYearsMonthsDays(year, month, day).days || 0
    days.innerText === "1"
      ? (daysText.innerText = "day")
      : (daysText.innerText = "days")
    months.innerText === "1"
      ? (monthsText.innerText = "month")
      : (monthsText.innerText = "months")
    years.innerText === "1"
      ? (yearsText.innerText = "year")
      : (yearsText.innerText = "years")
  }
}

function clearResults() {
  years.innerText = "- -"
  months.innerText = "- -"
  days.innerText = "- -"
}

function clearInputs() {
  dayError.innerText = ""
  monthError.innerText = ""
  yearError.innerText = ""

  dayLabel.style.color = ""
  monthLabel.style.color = ""
  yearLabel.style.color = ""

  dayInput.style.borderColor = ""
  monthInput.style.borderColor = ""
  yearInput.style.borderColor = ""
}

function everthingRed() {
  dayLabel.style.color = redText
  dayInput.style.borderColor = redBorder
  monthLabel.style.color = redText
  monthInput.style.borderColor = redBorder
  yearLabel.style.color = redText
  yearInput.style.borderColor = redBorder
}

function checkDay(day) {
  dayInputError = true
  if (!day) {
    dayError.innerText = "This field is required"
    everthingRed()
  } else if (day > 31 || day < 1 || isNaN(day)) {
    dayError.innerText = "Must be a valid day"
    everthingRed()
  } else {
    dayInputError = false
  }
}

function checkMonth(month) {
  monthInputError = true
  if (!month) {
    monthError.innerText = "This field is required"
    everthingRed()
  } else if (month > 12 || month < 1 || isNaN(month)) {
    monthError.innerText = "Must be a valid month"
    everthingRed()
  } else {
    monthInputError = false
  }
}

function checkYear(year) {
  yearInputError = true
  if (!year) {
    yearError.innerText = "This field is required"
    everthingRed()
  } else if (year > currYear || year < 0) {
    yearError.innerText = "Year has not occured"
    everthingRed()
  } else if (isNaN(year)) {
    yearError.innerText = "Must be a valid year"
    everthingRed()
  } else {
    yearInputError = false
  }
}

function getYearsMonthsDays(year, month, day) {
  let d1 = LocalDate.now()
  let d2 = LocalDate.of(year, month, day)
  let str = d1.until(d2).toString()

  let resArr = str
    .replace(/[P -]/g, " ")
    .replace(/[Y]/, "Y ")
    .replace(/[M]/, "M ")
    .split(" ")

  let resObj = resArr.reduce((obj, item) => {
    if (item.includes("Y")) obj["years"] = +item.replace("Y", "")
    if (item.includes("M")) obj["months"] = +item.replace("M", "")
    if (item.includes("D")) obj["days"] = +item.replace("D", "")
    return obj
  }, {})

  return resObj
}

function checkInput(year, month, day) {
  try {
    if (LocalDate.of(year, month, day)) return (inputError = false)
  } catch {
    dayError.innerText = "Must be valid date"
    everthingRed()
    return (inputError = true)
  }
}

function isInFuture(year, month, day) {
  let d1 = LocalDate.of(year, month, day)
  let d2 = LocalDate.now()
  if (d1.isAfter(d2)) {
    dayError.innerText = "Date has not occured"
    everthingRed()
  }
  return (inTheFuture = d1.isAfter(d2))
}
