# Bryle's Portfolio — Run, Push to GitHub, Deploy to Vercel

## 0. What this project is (and the "MERN" question)

MERN = **M**ongoDB, **E**xpress, **R**eact, **N**ode. A portfolio is a static site, so it only needs:

| Letter | Used here? | Why |
|---|---|---|
| **R** – React | Yes | Your UI (`client/src/App.jsx`) |
| **N** – Node.js | Yes (as a tool) | Runs Vite and installs packages |
| **M** – MongoDB / **E** – Express | No | You have no database or API. Adding them would make deployment harder (Vercel would need serverless functions) for no benefit. |

If you later add a contact form that saves messages, that is the time to add `server/` (Express + MongoDB) next to `client/`. Your current layout already leaves room for it.

## 1. Folder structure

```
BrylePortfolio/                 <- repo root (this is what you push to GitHub)
├── .gitignore
├── README.md
├── DEPLOYMENT_GUIDE.md         <- this file
└── client/                     <- the Vite + React app (Vercel "Root Directory")
    ├── index.html
    ├── package.json
    ├── package-lock.json
    ├── vite.config.js
    ├── eslint.config.js
    ├── public/                 <- favicon etc.
    └── src/
        ├── main.jsx            <- imports AOS css + starts React
        ├── App.jsx             <- all sections + AOS.init()
        ├── index.css           <- all styling
        └── assets/             <- profile.jpg, hulab.jpg, blj.jpg, radar.jpg
```

The structure is fine as is. I only removed `src/App.css` (unused Vite template leftovers that nothing imported).

## 2. Run it on your computer (VSCode terminal)

**Step 1 — Check Node.js.** Vite 8 needs Node **20.19 or newer**.

```bash
node -v
```

If it prints something lower than v20.19 (or "not found"), install the current LTS from https://nodejs.org, then **close and reopen VSCode**.

**Step 2 — Open the project in VSCode.** `File → Open Folder…` and choose the repo root (`BrylePortfolio`). Open the terminal with `` Ctrl+` ``.

**Step 3 — Go into the client folder.**

```bash
cd client
```

**Step 4 — Install packages (this also installs `aos`, the animation library, and updates `package-lock.json`).**

```bash
npm install
```

**Step 5 — Start the dev server.**

```bash
npm run dev
```

Open the link it prints (normally http://localhost:5173). Edits you save show up instantly. Stop the server with `Ctrl+C`.

**Step 6 — Test the production build (what Vercel will do).**

```bash
npm run build
npm run preview
```

`build` should finish with no errors and create `client/dist/`. `preview` serves that build at http://localhost:4173. If this works, Vercel will work too.

**Optional:** `npm run lint` checks your code style.

**What to look for when testing:** the navbar stays at the top while you scroll, nav links grow and "light up" on hover, and each section animates in the first time you scroll to it.

> Animations not playing? Your operating system may have "reduce motion" turned on (Windows: Settings → Accessibility → Visual effects → Animation effects). The site deliberately turns animations off for those visitors.

## 3. Push to GitHub

**Step 1 — Install Git** (https://git-scm.com) if `git --version` fails, and tell it who you are (once per computer):

```bash
git config --global user.name "Your Name"
git config --global user.email "bryleadammallorca@gmail.com"
```

**Step 2 — Create an empty repository on GitHub.** Go to https://github.com/new, name it `BrylePortfolio`, keep it **Public** (or Private; Vercel works with both), and **do not** tick "Add a README", ".gitignore" or license (your project already has them). Click **Create repository**.

**Step 3 — From the repo root (not `client/`), initialise Git.**

```bash
cd ..            # only if you are still inside client/
git init
git branch -M main
```

**Step 4 — Check that `node_modules` will NOT be uploaded.**

```bash
git status
```

You should see `client/`, `.gitignore`, etc. — but **no** `node_modules` and **no** `dist`. If you see them, stop and check that `.gitignore` exists.

**Step 5 — Commit.**

```bash
git add .
git commit -m "Portfolio with AOS animations"
```

**Step 6 — Connect to GitHub and push.** Replace `YOUR-USERNAME` with your GitHub username:

```bash
git remote add origin https://github.com/YOUR-USERNAME/BrylePortfolio.git
git push -u origin main
```

A browser window will ask you to sign in to GitHub the first time. (If asked for a password in the terminal, GitHub needs a Personal Access Token instead: GitHub → Settings → Developer settings → Personal access tokens.)

Refresh the repository page — your files should be there.

**Later changes** are just:

```bash
git add .
git commit -m "Describe what you changed"
git push
```

## 4. Deploy on Vercel

1. Go to https://vercel.com and choose **Sign Up → Continue with GitHub**.
2. Click **Add New… → Project**, find `BrylePortfolio` and click **Import**. (If it is missing, click "Adjust GitHub App Permissions" and give Vercel access to the repo.)
3. **Important:** because the app lives in `client/`, next to **Root Directory** click **Edit** and select **`client`**.
4. Vercel should detect **Framework Preset: Vite** and fill in:
   - Build Command: `npm run build`
   - Output Directory: `dist`
   - Install Command: `npm install`

   Leave those as they are.
5. Click **Deploy**. After about a minute you get a live URL like `https://bryleportfolio.vercel.app`.

From now on, every `git push` to `main` redeploys your site automatically.

## 5. If something goes wrong

| Problem | Fix |
|---|---|
| `npm install` errors about Node version | Update Node to 20.19+ (step 2.1) |
| `'vite' is not recognized` | You skipped `npm install`, or you are not inside `client/` |
| Vercel build says no `package.json` found / 404 | Root Directory wasn't set to `client` (Project → Settings → General → Root Directory) |
| Images missing only on Vercel | Vercel runs on Linux where file names are case-sensitive. `profile.jpg` ≠ `Profile.jpg`; match the imports exactly. |
| `git push` rejected: "fetch first" | You ticked "Add a README" on GitHub. Run `git pull origin main --allow-unrelated-histories`, then `git push` |
| Page looks unchanged after deploy | Hard refresh with `Ctrl+Shift+R` |
