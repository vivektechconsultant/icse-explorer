# ICSE Explorer

Class 10 ICSE study app for Physics (12 chapters), Chemistry (13 chapters) and Mathematics (28 chapters across 8 units): notes, formulas, solved examples and quizzes, with search, a combined formula sheet and progress saved in the browser.

## Run locally

    npm install
    npm run dev

## Build for hosting

    npm run build

The static site is written to `dist/`.

## Edit content

Unit tests (10 questions per chapter) are in `src/tests.js`, keyed by physics chapter number or maths chapter id. Each question is `[question, [4 options], correct index, explanation]`; options are shuffled on screen.

Physics content is in `src/data.js`, chemistry in `src/chemistry.js`, and maths content in `src/maths.js` and `src/maths-more.js` (chapter order and units are set in the PLAN list at the end of `src/maths.js`). Subjects are registered in `src/subjects.js`. Each chapter has `notes`, `formulas`, `examples` and `quiz` arrays.
