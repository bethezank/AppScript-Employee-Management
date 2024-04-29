function doGet(e) {

  if (!e.parameter.page) {
    return HtmlService
      .createTemplateFromFile('index')
      .evaluate()
      .setTitle('Bethezank Lab')
      .addMetaTag('viewport', 'width=device-width , initial-scale=1')
      .setXFrameOptionsMode(HtmlService.XFrameOptionsMode.ALLOWALL)
  }
  
  return HtmlService
    .createTemplateFromFile(e.parameter['page'])
    .evaluate()
    .setTitle('Bethezank Lab')
    .addMetaTag('viewport', 'width=device-width , initial-scale=1')
    .setXFrameOptionsMode(HtmlService.XFrameOptionsMode.ALLOWALL)

}

function include(filename) {
  return HtmlService.createHtmlOutputFromFile(filename).getContent()
}

function genNavbarLink(nav) {
  const url = getScriptUrl()
  return nav.replaceAll('{{url}}', url)
}

function getScriptUrl() {
  return ScriptApp.getService().getUrl()
}

function getFileNameAndId(){
  const folderId = '1Y658vbbv97hEsPOANC8spv2PctzIUuw6'
  const folder = DriveApp.getFolderById(folderId)

  const files = folder.getFiles()
  while( files.hasNext() ){
    const file = files.next()
    console.log( file.getName(), file.getId() )
  }
}

function getIdFromUrl(url) { return url.match(/[-\w]{25,}/); }