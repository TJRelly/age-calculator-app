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

svg.onclick = calculate

function calculate() {
    let day = dayInput.value
    let month = monthInput.value -1
    let year = yearInput.value

    let date = new Date(year, month, day)

    clearInputs()
    if(isEmpty(day, month, year)) error()

    years.innerText = getYearsMonthsDays(date)[0]

}

function getYearsMonthsDays(date){
    let milliYears = today - date
    let years = milliYears / 31556952000
    return [Math.floor(years)]
}

function isEmpty(day, month, year) {
    return day === '' || month === '' || year === ''
}

function error(day, month, year) {
    if (!day) {
        dayError.innerText = 'This field is required'
        dayLabel.style.color = redText
        dayInput.style.borderColor = redBorder
    }
    if (!month) {
        monthError.innerText = 'This field is required'
        monthLabel.style.color = redText
        monthInput.style.borderColor = redBorder
    }
    if (!year) {
        yearError.innerText = 'This field is required'
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