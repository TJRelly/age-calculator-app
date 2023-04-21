const svg = document.querySelector('svg')

const dayLabel = document.querySelector('label.day')
const monthLabel = document.querySelector('label.month')
const yearLabel = document.querySelector('label.year')

const dayInput = document.querySelector('#day')
const monthInput = document.querySelector('#month')
const yearInput = document.querySelector('#year')

const dayError = document.querySelector('p.day')
const monthError = document.querySelector('p.month')
const yearError = document.querySelector('p.year')

const days = document.querySelector('span.days')
const months = document.querySelector('span.months')
const years = document.querySelector('span.years')

const today = new Date()

let currMonth = today.getMonth() + 1
let currDay = today.getDate()
let currYear = today.getFullYear()

const redText = "hsl(var(--light-red-var), .75)"
const redBorder = "hsl(var(--light-red-var), .55)"
const LocalDate = JSJoda.LocalDate

svg.onclick = calculate

dayInput.addEventListener('keypress', (event) => {
    if (event.key == 'Enter' || event.which == 13) {
        event.preventDefault()
        svg.onclick()
    }
})

monthInput.addEventListener('keypress', (event) => {
    if (event.key == 'Enter' || event.which == 13) {
        event.preventDefault()
        svg.onclick()
    }
})

yearInput.addEventListener('keypress', (event) => {
    if (event.key == 'Enter' || event.which == 13) {
        event.preventDefault()
        svg.onclick()
    }
})

function calculate() {
    let day = dayInput.value
    let month = monthInput.value
    let year = yearInput.value

    let date = (day, month, year)

    clearInputs()
    if (isEmpty(day, month, year)) {
        emptyError(day, month, year)
        clearResults()
    }

    if (isError(day, month, year)) {
        dateError(day, month, year)
        inputError(day, month, year)
        futureError(day, month, year)
        emptyError(day, month, year)
        clearResults()

    } else {
        years.innerText = getYearsMonthsDays(day, month, year).years || 0
        months.innerText = getYearsMonthsDays(day, month, year).months || 0
        days.innerText = getYearsMonthsDays(day, month, year).days || 0
    }
}

function getYearsMonthsDays(day, month, year) {
    let d1 = LocalDate.now()
    let d2 = LocalDate.of(year, month, day)
    let str = d1.until(d2).toString()

    let resArr = str.replace(/[P -]/g, ' ')
        .replace(/[Y]/, 'Y ')
        .replace(/[M]/, 'M ')
        .split(' ')

    let res = resArr.reduce((obj, item) => {
        if (item.includes('Y')) obj['years'] = +item.replace('Y', '')
        if (item.includes('M')) obj['months'] = +item.replace('M', '')
        if (item.includes('D')) obj['days'] = +item.replace('D', '')
        return obj
    }, {})

    return res
}

function isEmpty(day, month, year) {
    return day == 0 || month == 0 || year == 0
}

function isError(day, month, year) {
    return (
        (day > 31 || day < 0)
        || (month > 12 || month < 0)
        || (year > currYear || year < 0)
        || !day
        || !month
        || !year
        || !isDateValid(day, month, year)
        || isInFuture(day, month, year)
    )
}

function inputError(day, month, year) {
    if (day > 31 || day < 0) {
        dayError.innerText = 'Must be a valid day'
        dayLabel.style.color = redText
        dayInput.style.borderColor = redBorder
        monthLabel.style.color = redText
        monthInput.style.borderColor = redBorder
        yearLabel.style.color = redText
        yearInput.style.borderColor = redBorder
    }
    if (month > 12 || month < 0) {
        monthError.innerText = 'Must be a valid month'
        monthLabel.style.color = redText
        monthInput.style.borderColor = redBorder
        dayLabel.style.color = redText
        dayInput.style.borderColor = redBorder
        yearLabel.style.color = redText
        yearInput.style.borderColor = redBorder
    }
    if (year > currYear || year < 0) {
        yearError.innerText = 'Must be in the past'
        yearLabel.style.color = redText
        yearInput.style.borderColor = redBorder
        monthLabel.style.color = redText
        monthInput.style.borderColor = redBorder
        dayLabel.style.color = redText
        dayInput.style.borderColor = redBorder
    }
}

function emptyError(day, month, year) {
    if (!day) {
        dayError.innerText = 'This field is required'
        dayLabel.style.color = redText
        dayInput.style.borderColor = redBorder
        monthLabel.style.color = redText
        monthInput.style.borderColor = redBorder
        yearLabel.style.color = redText
        yearInput.style.borderColor = redBorder

    }
    if (!month) {
        monthError.innerText = 'This field is required'
        monthLabel.style.color = redText
        monthInput.style.borderColor = redBorder
        yearLabel.style.color = redText
        yearInput.style.borderColor = redBorder
        dayLabel.style.color = redText
        dayInput.style.borderColor = redBorder
    }
    if (!year) {
        yearError.innerText = 'This field is required'
        yearLabel.style.color = redText
        yearInput.style.borderColor = redBorder
        monthLabel.style.color = redText
        monthInput.style.borderColor = redBorder
        dayLabel.style.color = redText
        dayInput.style.borderColor = redBorder
    }
}

function dateError(day, month, year) {
    if (!isDateValid(day, month, year)) {
        dayError.innerText = 'Must be valid date'
        dayLabel.style.color = redText
        dayInput.style.borderColor = redBorder
        monthLabel.style.color = redText
        monthInput.style.borderColor = redBorder
        yearLabel.style.color = redText
        yearInput.style.borderColor = redBorder
    }
}

function futureError(day, month, year) {
    if (isInFuture(day, month, year)) {
        dayError.innerText = 'This date has not occured'
        dayLabel.style.color = redText
        dayInput.style.borderColor = redBorder
        monthLabel.style.color = redText
        monthInput.style.borderColor = redBorder
        yearLabel.style.color = redText
        yearInput.style.borderColor = redBorder
    }
}

function clearInputs() {
    dayError.innerText = ''
    monthError.innerText = ''
    yearError.innerText = ''

    dayLabel.style.color = ''
    monthLabel.style.color = ''
    yearLabel.style.color = ''

    dayInput.style.borderColor = ''
    monthInput.style.borderColor = ''
    yearInput.style.borderColor = ''
}

function clearResults() {
    years.innerText = '- -'
    months.innerText = '- -'
    days.innerText = '- -'
}

function isDateValid(day, month, year) {
    try { if (LocalDate.of(year, month, day)) return true }
    catch {
        console.log('valid: invalid date')
        return false
    }
}

function isInFuture(day, month, year) {
    try {
        let d1 = LocalDate.of(year, month, day)
        let d2 = LocalDate.now()
        return d1.isAfter(d2)
    }
    catch {
        console.log('future: invalid date')
        return false
    }
}

