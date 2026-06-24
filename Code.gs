// Fetch guest data by token
function doGet(e) {
  try {
    const token = e.parameter.token;
    
    if (!token) {
      return ContentService.createTextOutput(JSON.stringify({
        status: 'error',
        message: 'Token no proporcionado'
      })).setMimeType(ContentService.MimeType.JSON);
    }
    
    const ss = SpreadsheetApp.getActiveSpreadsheet();
    const sheet = ss.getActiveSheet();
    const data = sheet.getDataRange().getValues();
    
    // Find guest by token (skip header row)
    for (let i = 1; i < data.length; i++) {
      if (data[i][1].toString() === token.toString()) {
        return ContentService.createTextOutput(JSON.stringify({
          status: 'success',
          guest: {
            numero: data[i][0],
            token: data[i][1],
            nombre: data[i][3],
            pareja: data[i][4],
            rowIndex: i + 1
          }
        })).setMimeType(ContentService.MimeType.JSON);
      }
    }
    
    return ContentService.createTextOutput(JSON.stringify({
      status: 'error',
      message: 'Token inválido'
    })).setMimeType(ContentService.MimeType.JSON);
    
  } catch (error) {
    return ContentService.createTextOutput(JSON.stringify({
      status: 'error',
      message: error.toString()
    })).setMimeType(ContentService.MimeType.JSON);
  }
}

// Handle form submission - update existing row
function doPost(e) {
  try {
    // Parse the JSON body from the request
    const payload = JSON.parse(e.postData.contents);
    
    // Get the active spreadsheet and sheet
    const ss = SpreadsheetApp.getActiveSpreadsheet();
    const sheet = ss.getActiveSheet();
    const data = sheet.getDataRange().getValues();
    
    // Find the row with matching guest name (rowIndex provided by frontend)
    const rowIndex = payload.rowIndex;
    
    if (rowIndex < 1 || rowIndex > data.length) {
      throw new Error('Guest not found');
    }
    
    // Update the row
    // Column F (index 5): Asistencia
    // Column G (index 6): Asistencia +1
    // Column H (index 7): Nombre +1
    sheet.getRange(rowIndex, 6).setValue(payload.asistencia); // Asistencia
    sheet.getRange(rowIndex, 7).setValue(payload.asistencia_mas1 || ''); // Asistencia +1
    sheet.getRange(rowIndex, 8).setValue(payload.nombre_mas1 || ''); // Nombre +1
    
    // Return a success response
    return ContentService.createTextOutput(JSON.stringify({
      status: 'success',
      message: 'Asistencia registrada correctamente'
    })).setMimeType(ContentService.MimeType.JSON);
    
  } catch (error) {
    // Return an error response
    return ContentService.createTextOutput(JSON.stringify({
      status: 'error',
      message: error.toString()
    })).setMimeType(ContentService.MimeType.JSON);
  }
}
