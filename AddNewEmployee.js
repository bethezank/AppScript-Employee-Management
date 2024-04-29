const folderId = '1Y658vbbv97hEsPOANC8spv2PctzIUuw6'
const folder = DriveApp.getFolderById(folderId)

const ss = SpreadsheetApp.getActive()
const sheet = ss.getActiveSheet()
const lastRow = ss.getLastRow()
const lastCol = ss.getLastColumn()

const startRow = 1
const startCol = 1

const employeeCodeTemplate = "PCNK_{{id}}"


const addNewData = data => {

  const formDataObject = createFormDataObject(data)

  if (sheet.appendRow(formDataObject)) {
    return true
  }
  else {
    return false
  }
}

const getRowId = () => {
  let lastId = sheet.getRange(lastRow == 1 ? 2 : lastRow, 1).getValue() ?? 0
  return lastId + 1
}

const createFormDataObject = data => {

  const tableHeaders = sheet.getRange(startRow, startCol, 1, lastCol).getValues()[0]

  const currentId = getRowId()

  const profileImage_fileExt = data.profileImage.getName().split('.').pop()
  const profileImage_fileName = `profile_userId${currentId}.${profileImage_fileExt}`

  const idcardImage_fileExt = data.idcardImage.getName().split('.').pop()
  const idcardImage_fileName = `idcard_userId${currentId}.${idcardImage_fileExt}`

  let values = []

  for (i in tableHeaders) {

    const header = tableHeaders[i]
    let val = ""

    switch (header) {

      case "id":
        val = currentId
        break

      case "employee_code":
        val = employeeCodeTemplate.replace("{{id}}", currentId)
        break

      case "first_name":
        val = data.firstName
        break

      case "last_name":
        val = data.lastName
        break

      case "age":
        val = data.age
        break

      case "birth_date":
        val = `'${data.birthDate}`
        break

      case "nationality":
        val = data.nationality
        break

      case "address":
        val = data.address
        break

      case "profile_image":
        const profileImage = folder.createFile(data.profileImage).setName(profileImage_fileName)
        val = profileImage.getUrl()
        break

      case "id_card":
        const idcardImage = folder.createFile(data.idcardImage).setName(idcardImage_fileName)
        val = idcardImage.getUrl()
        break

      case "created_at":
        val = Date()
        break;
        
      case "updated_at":
        val = 0
        break;
        
      case "deleted_at":
        val = 0
        break;

      default:
        val = 0
        break
    }
    values = [...values, val]
  }

  return values

}