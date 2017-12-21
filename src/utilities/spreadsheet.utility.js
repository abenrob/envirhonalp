import axios from 'axios'
import * as Promise from 'promise'

const spreadsheetUri = `https://sheets.googleapis.com/v4/spreadsheets/${process.env.REACT_APP_SHEETID}/values/${process.env.REACT_APP_SHEETNAME}?key=${process.env.REACT_APP_SHEETKEY}`

const DataFormat = new Promise((resolve, reject) => {
    axios.get(spreadsheetUri)
        .then(res => {
            if (!res.data && !res.data.values){
                reject('no data returned')
            }
            // grab first record as headers
            const headers = res.data.values.shift()

            // map remaining rows to objects, using header index to assign key
            const rows = res.data.values.map(row => {
                let rowObj = {}
                headers.forEach((col,idx) => {
                    rowObj[col] = row[idx]
                })

                // use y if no latitude
                if (!rowObj.latitude || rowObj.latitude === '') {
                    rowObj.latitude = rowObj.y
                }

                // use x if no longitude
                if (!rowObj.longitude || rowObj.longitude === '') {
                    rowObj.latitude = rowObj.x
                }

                // clean-up temporal
                rowObj.couverture_temporelle_fin = rowObj.couverture_temporelle_fin || 'aujourd\'hui'
                return rowObj
            }).filter(row => {
                // don't use data without georef
                return (row.latitude && row.latitude !== '') && (row.longitude && row.longitude !== '')
            })
            resolve(rows)
        }).catch(err => {
            reject(err)
        })
})
// re-format spreadsheet values
export default DataFormat