# Push to GitHub & Enable GitHub Pages

Your local repo is ready! Follow these steps:

## 1. Create a GitHub Repository

1. Go to [github.com/new](https://github.com/new)
2. Create a **public** repository (required for free GitHub Pages hosting)
3. Name it something like: `laura-franco-wedding` or `wedding-invitation`
4. Do NOT initialize with README (you already have one)
5. Click "Create repository"

## 2. Add Remote & Push

After creating the repo, GitHub will show you commands. Run these in your terminal:

```bash
cd "/Users/francopapp/Proyectos WEB/Invitacion Casamiento Save the date"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git
git push -u origin main
```

**Replace:**
- `YOUR_USERNAME` - Your GitHub username
- `YOUR_REPO_NAME` - Your repo name (e.g., `laura-franco-wedding`)

## 3. Enable GitHub Pages

1. Go to your GitHub repo → **Settings**
2. Scroll to **"Pages"** (left sidebar)
3. Under "Source", select **main** branch
4. Click **Save**
5. Wait 1-2 minutes for deployment

## 4. Your Site URL

GitHub Pages will be available at:
```
https://YOUR_USERNAME.github.io/YOUR_REPO_NAME/
```

For example:
```
https://francopapp.github.io/laura-franco-wedding/
```

## 5. Update APPS_SCRIPT_URL

Once you have the GitHub Pages URL, open the file in your repo and update:

```javascript
const APPS_SCRIPT_URL = 'https://script.google.com/macros/d/YOUR_DEPLOYMENT_ID/usercall';
```

(Keep your Google Apps Script URL that you already deployed)

---

**That's it!** Your invitation site will be live at your GitHub Pages URL. 🎉
