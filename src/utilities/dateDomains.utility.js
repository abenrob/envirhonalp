const range = [1900, (new Date()).getFullYear()]

const DateDomains = {
    displayDateLookup: (value) => {
        let actuals = []

        if (value[0] === 0) {
            actuals[0] = '<= 1900'
        } else {
            actuals[0] = Math.round((value[0] / 100) * (range[1] - range[0])) + range[0]
        }

        if (value[1] === 100) {
            actuals[1] = 'ajd.'
        } else {
            actuals[1] = Math.round((value[1] / 100) * (range[1] - range[0])) + range[0]
        }

        return actuals
    },
    valueDateLookup: (value) => {
        let actuals = []

        actuals[0] = Math.round((value[0] / 100) * (range[1] - range[0])) + range[0]

        actuals[1] = Math.round((value[1] / 100) * (range[1] - range[0])) + range[0]

        return actuals
    }
}

export default DateDomains