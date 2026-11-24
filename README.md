<<<<<<< HEAD
# UGC Creator Portfolio

A single-page, black-and-white portfolio for a male UGC creator. Plain HTML, CSS and vanilla JavaScript, served by a small FastAPI app. No frontend framework, no database.

## Folder structure
```
ugc-creator-portfolio/
├── main.py            FastAPI app (serves index.html, /static, /assets, /api/health)
├── index.html         The whole single-page site
├── requirements.txt   Python dependencies
├── .python-version    Python 3.12
├── static/css/style.css
├── static/js/main.js     Work data, nav, animations, contact form
├── static/js/videos.js   Video data, gallery, video modal
└── assets/{images,videos,thumbnails,icons}
```

## Install and run locally
Requires Python 3.12.
```bash
python -m venv .venv
source .venv/bin/activate        # Windows: .venv\Scripts\activate
pip install -r requirements.txt
pip install "uvicorn[standard]"  # local dev server only
uvicorn main:app --reload
```
Open http://127.0.0.1:8000 (health check: /api/health).

## Replace the placeholders
Search the project for `[YOUR NAME]`, `yourhandle`, `hello@yourdomain.com` and `910000000000` (WhatsApp) and replace them. Also update `CONTACT_EMAIL` in `static/js/main.js` and the `<title>` and meta tags in `index.html`.

## Add images
1. Put the file in `assets/images/` (JPG/WebP, about 1600px on the long side, under 400 KB).
2. Add an object to the `works` array at the top of `static/js/main.js`:
```js
{ title: "Gold Chain Editorial", category: "Jewellery", brand: "Brand name", image: "assets/images/gold-chain.jpg", size: "lg" }
```
`size` is `"lg"`, `"md"`, `"sm"` or `""` and controls the layout. Replace `portrait.svg`, `hero-product.svg` and `about.svg` in `index.html` with your own photos.

## Add videos
Add an object to the `videos` array at the top of `static/js/videos.js`:
```js
{ title: "Skincare Product Video", category: "Beauty", thumbnail: "assets/thumbnails/skincare.jpg",
  video: "assets/videos/skincare.mp4", brand: "Brand name" }
```
- Use a 9:16 thumbnail (about 540x960 JPG).
- `video` can be a local MP4 or a full `https://` URL. Videos load only when clicked.
- GitHub rejects files over 100 MB and large repos get slow. Prefer compressed MP4s (H.264, under about 20 MB each) or host them externally (Cloudinary, Bunny, Cloudflare R2) and paste the URL.

## Upload to GitHub
```bash
git init
git add .
git commit -m "Initial portfolio"
git branch -M main
git remote add origin https://github.com/<you>/ugc-creator-portfolio.git
git push -u origin main
```

## Deploy on Vercel
1. Read the plan note below first.
2. In Vercel choose Add New, then Project, import the GitHub repository, and click Deploy. Vercel detects the root `main.py` and its `app` instance automatically. No `vercel.json` is needed.
3. Every later push to `main` redeploys automatically.
4. After the first deploy, open the live URL and check that the page, the CSS, the images and `/api/health` all load.

### Plan note: Hobby is non-commercial
Vercel's fair use guidelines restrict Hobby teams to non-commercial personal use only, and commercial usage requires Pro or Enterprise. A Vercel community answer treated a static site promoting paid services as commercial use, so a creator portfolio that wins brand work should be treated the same way. Plan for a Pro plan, or host on a different provider. Check https://vercel.com/docs/limits/fair-use-guidelines and the Terms of Service before deploying.
=======
# ugc-creator-portfolio
My Porfolio
>>>>>>> 06789408761fbc910d932b5ef6d695f3353ec9b0
