let str1 = 'P-42Y-9M-26D'
let str2 = 'P2M4D'
let str3 = 'P-2D'

function getYearsMonthsDays(str) {
    
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

    console.log(res)
}

getYearsMonthsDays(str1)
getYearsMonthsDays(str2)
getYearsMonthsDays(str3)

// let matches = str.match(/(\d+)/g);
// console.log(matches)


// let today = new Date()
// let date = new Date(2023, 4, 20)

// function getYearsMonthsDays(date){
//     let milliYears = today - date
//     let years = Math.floor(milliYears / 31556952000)
//     let milliMonths = milliYears % 31556952000
//     let months = Math.floor(milliMonths / 2629746000)
//     let milliDays = milliMonths % 2629746000
//     let days = Math.floor(milliDays / 86400000)
//     console.log([years, months, days])
// }

// getYearsMonthsDays(date)
