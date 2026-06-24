// Fetch guest list for form autocomplete
function doGet(e) {
  try {
    const ss = SpreadsheetApp.getActiveSpreadsheet();
    const sheet = ss.getActiveSheet();
    const data = sheet.getDataRange().getValues();
    
    // Build guest list (skip header row)
    const guests = [];
    for (let i = 1; i < data.length; i++) {
      guests.push({
        numero: data[i][0],
        nombre: data[i][2],
        pareja: data[i][3],
        rowIndex: i + 1
      });
    }
    
    return ContentService.createTextOutput(JSON.stringify({
      status: 'success',
      guests: guests
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
    // Column E (index 4): Asistencia
    // Column F (index 5): Asistencia +1
    // Column G (index 6): Nombre +1
    sheet.getRange(rowIndex, 5).setValue(payload.asistencia); // Asistencia
    sheet.getRange(rowIndex, 6).setValue(payload.asistencia_mas1 || ''); // Asistencia +1
    sheet.getRange(rowIndex, 7).setValue(payload.nombre_mas1 || ''); // Nombre +1
    
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
