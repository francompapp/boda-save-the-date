// Fetch guest data by token
function doGet(e) {
  try {
    const token = e.parameter.token;
    
    Logger.log('Received token: ' + token);
    Logger.log('Token type: ' + typeof token);
    
    if (!token) {
      return ContentService.createTextOutput(JSON.stringify({
        status: 'error',
        message: 'Token no proporcionado'
      })).setMimeType(ContentService.MimeType.JSON);
    }
    
    const ss = SpreadsheetApp.getActiveSpreadsheet();
    const sheet = ss.getActiveSheet();
    const data = sheet.getDataRange().getValues();
    
    Logger.log('Total rows: ' + data.length);
    
    // Find guest by token (skip header row)
    for (let i = 1; i < data.length; i++) {
      const sheetToken = data[i][1];
      Logger.log('Row ' + i + ' - Sheet token: ' + sheetToken + ' (type: ' + typeof sheetToken + ')');
      Logger.log('Comparing: "' + sheetToken.toString() + '" === "' + token.toString() + '"');
      
      if (sheetToken.toString() === token.toString()) {
        Logger.log('Match found at row ' + i);
        
        // Parse number of companions from Pareja column (column E, index 4)
        const numCompanions = parseInt(data[i][4]) || 0;
        Logger.log('Number of companions: ' + numCompanions);
        
        // Check if asistencia is already confirmed (column F, index 5)
        const asistenciaConfirmada = data[i][5] && data[i][5].toString().trim() !== '';
        Logger.log('Asistencia already confirmed: ' + asistenciaConfirmada);
        
        return ContentService.createTextOutput(JSON.stringify({
          status: 'success',
          guest: {
            numero: data[i][0],
            token: data[i][1],
            nombre: data[i][3],
            numCompanions: numCompanions,
            rowIndex: i + 1,
            asistenciaConfirmada: asistenciaConfirmada
          }
        })).setMimeType(ContentService.MimeType.JSON);
      }
    }
    
    Logger.log('No match found for token: ' + token);
    
    return ContentService.createTextOutput(JSON.stringify({
      status: 'error',
      message: 'Token inválido'
    })).setMimeType(ContentService.MimeType.JSON);
    
  } catch (error) {
    Logger.log('Error: ' + error.toString());
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
    // Column F (index 5): Asistencia principal
    // Column G (index 6): Asistencia +1
    // Column H (index 7): Nombre +1
    // Column I (index 8): Asistencia +2
    // Column J (index 9): Nombre +2
    sheet.getRange(rowIndex, 6).setValue(payload.asistencia); // Asistencia
    
    Logger.log('Updating companions. Count: ' + (payload.companions ? payload.companions.length : 0));
    
    // Update companion data
    if (payload.companions && payload.companions.length > 0) {
      for (let i = 0; i < payload.companions.length; i++) {
        const companion = payload.companions[i];
        const asistenciaCol = 7 + (i * 2); // G, I, K, etc. (7, 9, 11...)
        const nombreCol = asistenciaCol + 1; // H, J, L, etc. (8, 10, 12...)
        
        Logger.log('Companion ' + (i+1) + ': Asistencia col=' + asistenciaCol + ', Nombre col=' + nombreCol);
        Logger.log('Values: asistencia=' + companion.asistencia + ', nombre=' + companion.nombre);
        
        sheet.getRange(rowIndex, asistenciaCol).setValue(companion.asistencia || ''); // Asistencia +N
        sheet.getRange(rowIndex, nombreCol).setValue(companion.nombre || ''); // Nombre +N
      }
    }
    
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
