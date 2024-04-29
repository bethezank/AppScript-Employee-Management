function doGetEmployeeById(id) {

  const ss = SpreadsheetApp.getActive()
  const sheet = ss.getActiveSheet()
  const lastRow = ss.getLastRow()
  const lastCol = ss.getLastColumn()
  const data = sheet.getRange(1, 1, lastRow, lastCol).getValues()
  const tableHeaders = data.shift()

  let employee = []
  for (let i = 0; i < data.length; i++) {
    const dataId = data[i][0]
    if (id == dataId) {
      employee = data[i]
      break
    }
  }

  let employeeObject = {}
  for(let i = 0; i < tableHeaders.length; i++ ){
    employeeObject[tableHeaders[i]] = employee[i]
  }

  employeeObject['profile_image_id'] = getIdFromUrl(employeeObject['profile_image'])[0]

  return employeeObject
}
