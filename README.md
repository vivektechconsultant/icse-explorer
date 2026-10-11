# ICSE Explorer (Progressive Web App)

Class 10 ICSE study app for Physics (12 chapters), Chemistry (13 chapters) and Mathematics (28 chapters across 8 units): notes, formulas and equations, solved examples, quick quizzes, 10-question timed unit tests and YouTube video links.

It is a progressive web app: it can be installed on phones, tablets and computers, opens full screen like a native app, and works fully offline after the first visit.

## Run locally

    npm install
    npm run dev          # development server
    npm run build        # production build in dist/
    npm run preview      # serve dist/ at http://localhost:4173 to test install and offline mode

Install prompts and offline mode only work on the built app served over HTTPS (or on localhost).

## Deploy

`dist/` is a plain static site with relative paths, so it can be hosted anywhere that serves HTTPS:

- **Firebase Hosting** (config included):

      npm install -g firebase-tools
      firebase login
      firebase use --add          # pick your project, alias "default"
      npm run build
      firebase deploy --only hosting

- **Netlify**: drag the `dist` folder onto app.netlify.com/drop.
- **GitHub Pages / any web host**: upload the contents of `dist/`, including `sw.js` and `manifest.webmanifest`.

Make sure your host does not cache `sw.js` and `index.html` for long, so updates reach users (the Firebase config already does this).

## Android and iOS apps (Capacitor)

The same code is wrapped as native apps with Capacitor 6. The projects are in `android/` and `ios/`, with app id `com.icseexplorer.app` and name "ICSE Explorer".

    npm install
    npm run android      # builds the web app, syncs it, opens Android Studio
    npm run ios          # builds, syncs, opens Xcode (macOS only)

For iOS, run `cd ios/App && pod install` once on a Mac with Xcode and CocoaPods installed. After any change to the web code, run `npm run cap:sync` to copy the new build into both apps.

Inside the native apps the service worker and "Install app" button are switched off automatically (the apps already contain every file and work offline).

### Where the logo pack icons go

| Logo pack file | Used in the project as |
|---|---|
| `android/mipmap-*/ic_launcher.png` | `android/app/src/main/res/mipmap-*/ic_launcher.png` (square launcher icon, Android 7 and older) |
| `android/mipmap-*/ic_launcher_round.png` | `android/app/src/main/res/mipmap-*/ic_launcher_round.png` (round launcher icon, cut to a circle) |
| crest artwork | `mipmap-*/ic_launcher_foreground.png` + white background: adaptive icon for Android 8+ (`mipmap-anydpi-v26`), crest kept inside the 66 dp safe zone |
| `android/playstore/ic_launcher-512.png` | `android/play-store/ic_launcher-512.png` (upload this in Google Play Console) |
| `ios/AppIcon.appiconset/*.png` | `ios/App/App/Assets.xcassets/AppIcon.appiconset/` with a `Contents.json` mapping each file to its iPhone, iPad and App Store slot |
| `ios/.../icon_60pt_3x`, `83.5pt_2x`, `76pt_2x`, `60pt_2x` | `public/icons/apple-touch-icon*.png` for the web app on iPhone and iPad home screens |
| crest artwork | Android and iOS launch (splash) screens: crest centred on white |

All icons had the logo pack's faint grid background removed. iOS icons are saved without an alpha channel, which the App Store requires.

## How the PWA works

- `public/manifest.webmanifest` and `public/icons/` make the app installable (name, colours, standard and maskable icons, Apple touch icon, favicons). All icons are made from the ICSE Explorer crest in the supplied logo pack; `public/brand/` holds transparent cut-outs of the crest (64–512 px), and `src/logo.js` holds the small inlined copy used in the header.
- `pwa/sw-template.js` is the service worker. A small Vite plugin in `vite.config.js` writes `dist/sw.js` at build time with the list of every built file, so the whole app is cached on first visit. Pages use network-first with an offline fallback; hashed assets are cache-first; Google Fonts are cached for offline use.
- `src/pwa.js` registers the service worker, captures the install prompt (an "Install app" button appears in the header), shows install steps on iPhone and iPad, shows an offline badge, and offers an "Update" button when a new version is deployed.

## Responsive layout

- Desktop: sidebar of chapters, subject switch and formula sheet button in the header.
- Tablet: narrower sidebar and a single-row header.
- Phone: compact header with search, a bottom tab bar (Chapters, Physics, Chemistry, Maths, Formulas/Equations) and a slide-in chapter drawer. Safe areas for notched phones are respected; inputs are 16px so iOS does not zoom.
- Printing a chapter hides navigation and prints just the notes.

## Edit content

- Physics: `src/data.js` · Chemistry: `src/chemistry.js` · Mathematics: `src/maths.js` and `src/maths-more.js` (chapter order in the PLAN list at the end of `src/maths.js`).
- Subjects are registered in `src/subjects.js`.
- Unit tests (10 per chapter) are in `src/tests.js`, keyed by subject and chapter. Each question is `[question, [4 options], correct index, explanation]`; options are shuffled on screen.

After editing, run `npm run build` again and redeploy. Installed copies pick up the new version and show an "Update" button.
