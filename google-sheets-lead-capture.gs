const SHEET_NAME = 'Travel Q1';
const SPREADSHEET_ID = '';

const HEADERS = [
  'Submitted At',
  'Lead ID',
  'First Name',
  'Email',
  'Destination',
  'Priority',
  'Timing',
  'Source',
  'Page URL',
  'Referrer',
  'UTM Source',
  'UTM Medium',
  'UTM Campaign',
  'UTM Term',
  'UTM Content',
  'Timezone',
  'Locale',
  'User Agent'
];

function doGet() {
  return ContentService
    .createTextOutput(JSON.stringify({ ok: true, service: 'Roots & Routes lead capture' }))
    .setMimeType(ContentService.MimeType.JSON);
}

function doPost(e) {
  try {
    const payload = JSON.parse((e && e.postData && e.postData.contents) || '{}');
    const sheet = getLeadSheet(payload.sheetName || SHEET_NAME);
    ensureHeaders(sheet);
    sheet.appendRow(toRow(payload));

    return ContentService
      .createTextOutput(JSON.stringify({ ok: true }))
      .setMimeType(ContentService.MimeType.JSON);
  } catch (error) {
    return ContentService
      .createTextOutput(JSON.stringify({ ok: false, error: error.message }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

function setupTravelLeadSheet() {
  const sheet = getLeadSheet(SHEET_NAME);
  ensureHeaders(sheet);
  return {
    ok: true,
    sheetName: SHEET_NAME,
    columns: HEADERS.length
  };
}

function getLeadSheet(sheetName) {
  const spreadsheet = SPREADSHEET_ID
    ? SpreadsheetApp.openById(SPREADSHEET_ID)
    : SpreadsheetApp.getActiveSpreadsheet();

  return spreadsheet.getSheetByName(sheetName) || spreadsheet.insertSheet(sheetName);
}

function ensureHeaders(sheet) {
  const headerRange = sheet.getRange(1, 1, 1, HEADERS.length);
  const existing = headerRange.getValues()[0];
  const hasHeaders = existing.some(Boolean);

  if (!hasHeaders) {
    headerRange.setValues([HEADERS]);
    formatLeadSheet(sheet);
  }
}

function formatLeadSheet(sheet) {
  const headerRange = sheet.getRange(1, 1, 1, HEADERS.length);
  headerRange.setFontWeight('bold');
  headerRange.setBackground('#f26a21');
  headerRange.setFontColor('#ffffff');
  sheet.setFrozenRows(1);
  sheet.autoResizeColumns(1, HEADERS.length);
}

function toRow(payload) {
  return [
    payload.submittedAt || new Date().toISOString(),
    payload.leadId || '',
    payload.firstName || '',
    payload.email || '',
    payload.destination || '',
    payload.priority || '',
    payload.timing || '',
    payload.source || '',
    payload.pageUrl || '',
    payload.referrer || '',
    payload.utmSource || '',
    payload.utmMedium || '',
    payload.utmCampaign || '',
    payload.utmTerm || '',
    payload.utmContent || '',
    payload.timezone || '',
    payload.locale || '',
    payload.userAgent || ''
  ];
}
