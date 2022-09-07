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

svg.onclick = calculate

function calculate() {
    let year = yearInput.value
    let month = monthInput.value
    let day = dayInput.value

    dayError.innerText = ''
    monthError.innerText = ''
    yearError.innerText = ''

    dayLabel.style.color = ''
    monthLabel.style.color = ''
    yearLabel.style.color = ''

    if (day < 1) {
        dayError.innerText = 'This field is required'
        dayLabel.style.color = 'var(--light-red)'
        dayInput.style.borderColor = 'var(--light-red)'
    }
    if (month < 1) {
        monthError.innerText = 'This field is required'
        monthLabel.style.color = 'var(--light-red)'
    }
    if (year < 1) {
        yearError.innerText = 'This field is required'
        yearLabel.style.color = 'var(--light-red)'
    }

    let d = new Date(year, month-1, day)

    let yearsPassed = currYear - year

    if (month < currMonth) years.innerText = yearsPassed - 1
    else if (currMonth == month && day < currDay) years.innerText = yearsPassed - 1
    else years.innerText = yearsPassed
}