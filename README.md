# Laura & Franco - Wedding Invitation

A minimalist and elegant wedding invitation single-page app (HTML/CSS/JS, no frameworks).

**Event Details:**
- **Date:** 10 de octubre de 2025
- **Venue:** El Xalet de Montjuïc, Barcelona

## Features

✨ **Minimalist Design**
- Cream background (#faf8f5)
- Serif display font (Cormorant Garamond)
- Sans-serif body (Montserrat Light)
- Muted beige/taupe palette

📱 **Responsive Layout**
- Mobile-friendly
- Sticky navigation
- Smooth scrolling

📋 **Sections**
- **Hero** - Names, date, venue
- **Programa del Día** - Timeline of events
- **Galería** - Photo gallery (3-column grid)
- **Regalos** - Gift info with IBAN & copy-to-clipboard
- **RSVP** - Guest search & attendance confirmation

## RSVP Flow

1. Guest searches for their name from the guest list
2. If they have a +1 companion, additional fields appear
3. They confirm attendance for themselves and/or their +1
4. Data is sent to Google Apps Script and stored in Google Sheets

## Setup

### 1. Deploy Google Apps Script (Code.gs)
- Create a new Google Apps Script project linked to your Google Sheet
- Copy the `Code.gs` code into the script editor
- Deploy as a web app:
  - Execute as: Your email
  - Who has access: Anyone
- Copy the deployment URL (e.g., `https://script.google.com/macros/d/YOUR_ID/usercall`)

### 2. Update APPS_SCRIPT_URL
In `index.html`, update line with:
```javascript
const APPS_SCRIPT_URL = 'https://script.google.com/macros/d/YOUR_DEPLOYMENT_ID/usercall';
```

### 3. Open the app
Open `index.html` in your browser or deploy via GitHub Pages.

## Google Sheet Structure

Your sheet should have these columns:
- **A** - Numero
- **B** - Procedencia (optional)
- **C** - Invitado (Guest Name)
- **D** - Pareja (Companion name or empty)
- **E** - Asistencia (Will be filled by form)
- **F** - Asistencia +1 (Will be filled by form)
- **G** - Nombre +1 (Will be filled by form)

## Technologies

- HTML5
- CSS3 (Grid, Flexbox, Animations)
- Vanilla JavaScript (no frameworks)
- Google Fonts (Cormorant Garamond, Montserrat)
- Google Apps Script (backend)
- Google Sheets (database)

## Browser Support

Modern browsers (Chrome, Firefox, Safari, Edge) with ES6 support.

---

Made with 💕 for Laura & Franco's wedding
