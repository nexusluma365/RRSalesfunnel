# Google Sheets Lead Capture

The questionnaire sends lead data to a Google Apps Script Web App, which writes rows into the `Travel Q1` tab in the `Travel Leads` spreadsheet.

## Sheet Columns

1. Submitted At
2. Lead ID
3. First Name
4. Email
5. Destination
6. Priority
7. Timing
8. Source
9. Page URL
10. Referrer
11. UTM Source
12. UTM Medium
13. UTM Campaign
14. UTM Term
15. UTM Content
16. Timezone
17. Locale
18. User Agent

## Setup

1. Open the `Travel Leads` Google Sheet.
2. Go to Extensions > Apps Script.
3. Add the contents of `google-sheets-lead-capture.gs`.
4. Run `setupTravelLeadSheet` once from Apps Script to create and format the `Travel Q1` headers.
5. Click Deploy > New deployment.
6. Choose Web app.
7. Set Execute as to Me.
8. Set Who has access to Anyone.
9. Click Deploy and copy the Web App URL.
10. Put the deployed Web App URL into `LEADS_WEB_APP_URL` in `roots-routes-questionnaire.html`.

```js
const LEADS_WEB_APP_URL="https://script.google.com/macros/s/YOUR_DEPLOYMENT_ID/exec";
```

## Notes

- `SPREADSHEET_ID` is set to the `Travel Leads` spreadsheet ID from the sheet URL.
- If you replace the spreadsheet, update `SPREADSHEET_ID` before deploying the script.
- The website posts as `text/plain` to avoid browser preflight issues on static hosting.
- The questionnaire uses `sendBeacon` first so the lead submission can finish while the user is redirected.

The questionnaire also keeps a local browser backup under `roots_routes_leads`.
