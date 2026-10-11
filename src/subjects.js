import * as physics from "./data.js";
import * as chemistry from "./chemistry.js";
import * as maths from "./maths.js";

export const SUBJECTS = {
  physics: { id: "physics", name: "Physics", short: "Physics", units: physics.UNITS, chapters: physics.CHAPTERS, formulaLabel: "Formulas" },
  chemistry: { id: "chemistry", name: "Chemistry", short: "Chemistry", units: chemistry.UNITS, chapters: chemistry.CHAPTERS, formulaLabel: "Equations" },
  maths: { id: "maths", name: "Mathematics", short: "Maths", units: maths.UNITS, chapters: maths.CHAPTERS, formulaLabel: "Formulas" },
};
export const SUBJECT_ORDER = ["physics", "chemistry", "maths"];
