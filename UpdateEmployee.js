function doUpdateEmployee(updateData) {

  const ss = SpreadsheetApp.getActive()
  const sheet = ss.getActiveSheet()
  const lastRow = ss.getLastRow()
  const lastCol = ss.getLastColumn()
  const ids = sheet.getRange(1, 1, lastRow, 1).getValues()
  ids.shift()

  let result = false
  for (let i = 0; i < ids.length; i++) {
    const userId = ids[i][0]
    if (updateData.id == userId) {

      // first name
      sheet.getRange(i + 2, 3).setValue(updateData.firstName)
      
      // last name
      sheet.getRange(i + 2, 4).setValue(updateData.lastName)

      // age
      sheet.getRange(i + 2, 5).setValue(updateData.age)
      
      // birth date
      sheet.getRange(i + 2, 6).setValue(`'${updateData.birthDate}`)
      
      // nationality
      sheet.getRange(i + 2, 7).setValue(updateData.nationality)
      
      // address
      sheet.getRange(i + 2, 8).setValue(updateData.address)
      
      // updated_at
      sheet.getRange(i + 2, 12).setValue(Date())

      // profile image
      if(updateData.profileImage.name){
        const imageUrl = updateImage(updateData.id, updateData.profileImage, 'profile')
        sheet.getRange(i + 2, 9).setValue(imageUrl)
      }
      
      // idcard image
      if(updateData.idcardImage.name){
        const imageUrl = updateImage(updateData.id, updateData.idcardImage, 'idcard')
        sheet.getRange(i + 2, 10).setValue(imageUrl)
      }

      result = true

      break
    }
  }

  return result

}

const updateImage = (userId, image, imageType) => {

  const folderId = '1Y658vbbv97hEsPOANC8spv2PctzIUuw6'
  const folder = DriveApp.getFolderById(folderId)
  
  const image_fileExt = image.getName().split('.').pop()
  const image_fileName = `${imageType}_userId${userId}.${image_fileExt}`

  const imageUploaded = folder.createFile(image).setName(image_fileName)
  const url = imageUploaded.getUrl()

  return url

}
