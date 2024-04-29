function doDeleteEmployee(id) {

  const ss = SpreadsheetApp.getActive()
  const sheet = ss.getActiveSheet()
  const lastRow = ss.getLastRow()
  const lastCol = ss.getLastColumn()
  const data = sheet.getRange(1, 1, lastRow, 1).getValues()
  data.shift()

  let result = false
  for( let i = 0 ; i < data.length; i++ ){
    const dataId = data[i][0]
    if( id == dataId){
      sheet.getRange(i + 2, lastCol).setValue(Date())
      result = true
      break
    }
  }

  return result

}
