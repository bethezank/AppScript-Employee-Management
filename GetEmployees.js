const getEmployees = () => {

  const ss = SpreadsheetApp.getActive()
  const sheet = ss.getActiveSheet()
  const lastRow = ss.getLastRow()
  const lastCol = ss.getLastColumn()

  const startRow = 1
  const startCol = 1

  // have no data
  if( startRow == lastRow ){
    return { data: [] }
  }

  const tableHeaders = sheet.getRange(startRow, startCol, 1, lastCol).getValues()[0]

  const dataSet = sheet.getRange(startRow, startCol, lastRow, lastCol).getValues()
  dataSet.shift()

  let dataObject = []

  dataSet.forEach(data => {

    const isDeleted = data[lastCol - 1]
    if(isDeleted) return

    values = {}
    for(let i = 0; i < tableHeaders.length; i++ ){
      values[tableHeaders[i]] = data[i]
    }

    values['profile_image_id'] = getIdFromUrl(values['profile_image'])[0]

    dataObject = [...dataObject, values]

  })

  dataObject = { data: dataObject }

  console.log(dataObject)

  return dataObject

}

