// ICSE Class 10 Mathematics — chapter content.
// Notes are condensed summaries written for this app; worked examples use fresh numbers.
// Matrices are written row by row, rows separated by ";" — e.g. [2 3; 1 4].

import { MORE } from "./maths-more.js";

// Chapters from the first upload, keyed by their original number.
const BASE = [
  {
    n: 1, title: "Sales Tax and Value Added Tax", unit: "1",
    scope: "Cost price, marked price, discount and selling price; sales tax on the selling price; VAT as tax on value added at each stage of sale.",
    note: "Your book teaches VAT, the system before 2017. Current ICSE papers use GST, which has its own chapter here. The input–output method is the same: tax payable = tax collected on sales − tax paid on purchases.",
    notes: [
      { h: "Key terms", pts: [
        "Cost price (C.P.): what a trader pays to buy goods.",
        "Marked or list price (M.P.): the price printed on the article.",
        "Discount: a reduction given on the marked price. Selling price (S.P.) = M.P. − discount.",
        "Sales tax is charged by the government on the sale of goods, as a percentage of the selling price.",
      ]},
      { h: "Calculating sales tax", pts: [
        "With no discount, tax is worked out on the marked price.",
        "With a discount, first subtract the discount, then charge tax on the reduced selling price.",
        "Amount paid by the customer = S.P. + sales tax = S.P. × (1 + r/100).",
        "To find the price before tax from the amount paid, divide by (1 + r/100).",
        "To find the rate: r = (tax ÷ price before tax) × 100.",
      ]},
      { h: "Value Added Tax (VAT)", pts: [
        "VAT is charged at every stage where goods change hands, but only on the value added at that stage.",
        "A dealer collects tax on what they sell (output tax) and has already paid tax on what they bought (input tax).",
        "VAT paid by a dealer to the government = output tax − input tax.",
        "When the rate is the same throughout, VAT = r% × (S.P. − C.P.) for that dealer.",
        "The first seller in the chain pays VAT on their whole selling price, since they had no input tax.",
        "Total tax received by the government from the whole chain = tax on the final price paid by the consumer.",
      ]},
    ],
    formulas: [
      { f: "S.P. = M.P. − Discount", d: "Selling price after discount" },
      { f: "Tax = (r/100) × S.P.", d: "Sales tax at r%" },
      { f: "Amount paid = S.P. × (1 + r/100)", d: "Price including tax" },
      { f: "VAT payable = Output tax − Input tax", d: "For one dealer" },
      { f: "VAT = (r/100) × (S.P. − C.P.)", d: "Same rate at every stage" },
    ],
    examples: [
      { q: "An article is marked ₹2400. The shop gives a 10% discount and charges 8% sales tax. How much does the customer pay?",
        s: ["Discount = 10% of 2400 = ₹240, so S.P. = ₹2160", "Tax = 8% of 2160 = ₹172.80", "Amount paid = 2160 + 172.80 = ₹2332.80"] },
      { q: "A customer pays ₹1166 for an article, including 6% sales tax. Find its price before tax.",
        s: ["Price × 1.06 = 1166", "Price = 1166 ÷ 1.06 = ₹1100"] },
      { q: "An article costs ₹800 and the customer pays ₹848 including tax. Find the rate of tax.",
        s: ["Tax = 848 − 800 = ₹48", "Rate = 48/800 × 100 = 6%"] },
      { q: "A manufacturer sells goods to a dealer for ₹5000. The dealer sells them to a consumer for ₹6500. VAT is 10% at each stage. Find the VAT paid by the dealer and the total tax the government receives.",
        s: ["Dealer's input tax = 10% of 5000 = ₹500", "Dealer's output tax = 10% of 6500 = ₹650", "VAT paid by dealer = 650 − 500 = ₹150", "Government receives 500 (manufacturer) + 150 (dealer) = ₹650, which is 10% of the final price"] },
    ],
    quiz: [
      { q: "When a discount is given, sales tax is charged on the", o: ["marked price", "cost price", "price after discount", "discount"], a: 2, e: "Discount first, then tax on the reduced price." },
      { q: "A dealer buys for ₹1000 and sells for ₹1200, with VAT at 5%. VAT paid by the dealer is", o: ["₹60", "₹50", "₹10", "₹110"], a: 2, e: "5% of the value added, ₹200, is ₹10." },
      { q: "A price of ₹500 with 12% tax becomes", o: ["₹512", "₹560", "₹600", "₹440"], a: 1, e: "500 × 1.12 = 560." },
      { q: "Under VAT, the total tax collected from a chain of sales equals tax on", o: ["the first sale", "the manufacturer's cost", "the final selling price", "the total profit only"], a: 2, e: "Each stage pays tax only on the value it adds." },
      { q: "If a customer pays ₹1060 including 6% tax, the price before tax is", o: ["₹1000", "₹996.40", "₹1003.60", "₹1054"], a: 0, e: "1060 ÷ 1.06 = 1000." },
    ],
  },
  {
    n: 2, title: "Banking", unit: "1",
    scope: "Interest on a savings bank account by the product method, and recurring deposit accounts: interest, maturity value, instalment and rate.",
    notes: [
      { h: "Savings bank account", pts: [
        "A savings account earns simple interest each month on the balance that qualifies for that month.",
        "In your book's rule, the qualifying balance is the minimum balance between the 10th and the last day of the month.",
        "Product method: add the qualifying balances for all the months. Treat this sum as a principal kept for 1 month.",
        "Interest = sum of balances × r/100 × 1/12.",
      ]},
      { h: "Recurring deposit (RD)", pts: [
        "In an RD account you deposit a fixed sum P every month for n months, and the bank pays simple interest.",
        "The first instalment earns interest for n months, the second for n − 1 months, and so on, down to 1 month for the last.",
        "Total money-months = P × n(n + 1)/2, which acts as a principal for 1 month.",
        "Interest I = P × n(n + 1)/2 × r/(12 × 100).",
        "Maturity value = total deposited + interest = P × n + I.",
      ]},
      { h: "Working backwards", pts: [
        "To find the instalment P, write the maturity value in terms of P and solve.",
        "To find the rate r, first find interest = maturity value − P × n, then solve the interest formula for r.",
        "To find the number of months n, the interest formula gives a quadratic in n; take the positive root.",
      ]},
    ],
    formulas: [
      { f: "I = P × n(n + 1)/2 × r/1200", d: "Interest on a recurring deposit" },
      { f: "M.V. = P × n + I", d: "Maturity value of an RD" },
      { f: "I = (Σ monthly balances) × r/1200", d: "Savings account, product method" },
    ],
    examples: [
      { q: "Ria deposits ₹500 a month in a recurring deposit for 2 years at 8% per annum. Find the interest and the maturity value.",
        s: ["n = 24, so n(n + 1)/2 = 24 × 25/2 = 300", "I = 500 × 300 × 8/1200 = ₹1000", "Deposited = 500 × 24 = ₹12 000", "Maturity value = 12 000 + 1000 = ₹13 000"] },
      { q: "An RD for 1 year at 6% matures to ₹6195. Find the monthly instalment.",
        s: ["n = 12, so n(n + 1)/2 = 78", "I = P × 78 × 6/1200 = 0.39P", "12P + 0.39P = 6195, so 12.39P = 6195", "P = ₹500"] },
      { q: "₹200 a month for 3 years matures to ₹8310. Find the rate of interest.",
        s: ["Deposited = 200 × 36 = ₹7200, so I = ₹1110", "n(n + 1)/2 = 36 × 37/2 = 666", "1110 = 200 × 666 × r/1200 = 111r", "r = 10%"] },
      { q: "The qualifying monthly balances in a savings account add up to ₹48 000. Find the interest at 4% per annum.",
        s: ["I = 48 000 × 4/1200", "I = ₹160"] },
    ],
    quiz: [
      { q: "For an RD of 12 months, the value of n(n + 1)/2 is", o: ["66", "72", "78", "144"], a: 2, e: "12 × 13 / 2 = 78." },
      { q: "Maturity value of an RD equals", o: ["interest only", "total deposits + interest", "P × n only", "P + interest"], a: 1, e: "You get back all your instalments plus interest." },
      { q: "In the RD formula, r is divided by 1200 because", o: ["the rate is monthly", "the rate is a yearly percentage applied to months", "of tax", "the bank keeps a fee"], a: 1, e: "÷100 for percent and ÷12 to convert a yearly rate to months." },
      { q: "₹100 a month for 10 months at 12% earns interest of", o: ["₹55", "₹66", "₹120", "₹110"], a: 0, e: "100 × 55 × 12/1200 = 55." },
      { q: "In the product method for a savings account, the sum of balances is treated as principal for", o: ["1 year", "1 day", "1 month", "the number of months"], a: 2, e: "Each balance is a one-month deposit." },
    ],
  },
  {
    n: 3, title: "Linear Inequations", unit: "2",
    scope: "Linear inequations in one variable, replacement and solution sets, rules for solving, combined inequations, number-line graphs and set operations on solution sets.",
    note: "Your uploads had two Linear Inequations chapters from different books. They are combined here.",
    notes: [
      { h: "Basics", pts: [
        "A linear inequation in one variable has the form ax + b > c, < c, ≥ c or ≤ c, with a ≠ 0.",
        "The replacement set (domain) is the set the variable is allowed to come from. It is always given.",
        "Common replacement sets: N = {1, 2, 3, …}, W = {0, 1, 2, …}, I or Z = {…, −2, −1, 0, 1, 2, …}, R = all real numbers.",
        "The solution set is the set of values from the replacement set that satisfy the inequation. It is a subset of the replacement set.",
      ]},
      { h: "Rules for solving", pts: [
        "Adding or subtracting the same number or expression on both sides keeps the sign.",
        "Multiplying or dividing both sides by the same positive number keeps the sign.",
        "Multiplying or dividing both sides by a negative number reverses the sign: < becomes >, ≤ becomes ≥.",
        "a < b is the same statement as b > a.",
        "Clear fractions by multiplying through by the LCM of the denominators.",
      ]},
      { h: "Combined inequations", pts: [
        "A statement like a < px + q ≤ b is two inequations at once.",
        "Either solve each part separately and take values that satisfy both, or work on all three parts together (keeping the middle term as x).",
        "Remember to reverse both signs if you divide all three parts by a negative number.",
      ]},
      { h: "Graphing on a number line", pts: [
        "For N, W or I, mark the solutions as separate solid dots.",
        "For R, draw a thick line over the solution region.",
        "A solid (filled) circle means the end value is included (≤ or ≥). An open circle means it is excluded (< or >).",
        "An arrow on the thick line shows that the solution continues without end.",
      ]},
      { h: "Sets of solutions", pts: [
        "A ∩ B: values in both solution sets (where the graphs overlap).",
        "A ∪ B: values in either set.",
        "A′ (complement of A in R): all real numbers not in A. For A = {x : x > 3}, A′ = {x : x ≤ 3}.",
        "A − B: values in A but not in B.",
      ]},
    ],
    formulas: [
      { f: "a < b ⇒ a + c < b + c", d: "Adding keeps the sign" },
      { f: "a < b, k > 0 ⇒ ka < kb", d: "Positive multiplier keeps the sign" },
      { f: "a < b, k < 0 ⇒ ka > kb", d: "Negative multiplier reverses the sign" },
      { f: "N ⊂ W ⊂ I ⊂ R", d: "Replacement sets" },
    ],
    examples: [
      { q: "Solve 3x − 5 < 7, x ∈ W.",
        s: ["3x < 12", "x < 4", "Solution set = {0, 1, 2, 3}"] },
      { q: "Solve 5 − 2x ≥ 11, x ∈ I.",
        s: ["−2x ≥ 6", "Divide by −2 and reverse the sign: x ≤ −3", "Solution set = {…, −5, −4, −3}"] },
      { q: "Solve −4 ≤ 2x + 2 < 8, x ∈ R, and describe its graph.",
        s: ["Subtract 2: −6 ≤ 2x < 6", "Divide by 2: −3 ≤ x < 3", "Graph: thick line from −3 (solid circle) to 3 (open circle)", "Solution set = {x : −3 ≤ x < 3, x ∈ R}"] },
      { q: "A = {x : 2x + 1 > 5, x ∈ R} and B = {x : x − 3 ≤ 4, x ∈ R}. Find A ∩ B.",
        s: ["A: 2x > 4, so x > 2", "B: x ≤ 7", "A ∩ B = {x : 2 < x ≤ 7, x ∈ R}"] },
    ],
    quiz: [
      { q: "Dividing both sides of an inequation by −3", o: ["keeps the sign", "reverses the sign", "makes it an equation", "is not allowed"], a: 1, e: "Multiplying or dividing by a negative number reverses the inequality." },
      { q: "The solution set of x < 3, x ∈ N is", o: ["{0, 1, 2}", "{1, 2}", "{1, 2, 3}", "{…, 1, 2}"], a: 1, e: "N starts at 1, and 3 is excluded." },
      { q: "On a number line, an open circle at 5 means", o: ["5 is included", "5 is excluded", "the graph ends", "x = 5 only"], a: 1, e: "Open circle for < or >; solid circle for ≤ or ≥." },
      { q: "If −2x > 8, then", o: ["x > −4", "x < −4", "x > 4", "x < 4"], a: 1, e: "Divide by −2 and reverse: x < −4." },
      { q: "The solution set of −1 < x ≤ 2, x ∈ I is", o: ["{−1, 0, 1, 2}", "{0, 1, 2}", "{0, 1}", "{−1, 0, 1}"], a: 1, e: "−1 is excluded, 2 is included." },
    ],
  },
  {
    n: 4, title: "Quadratic Equations", unit: "2",
    scope: "Standard form, roots, solving by factorisation and by formula, nature of roots using the discriminant, and equations reducible to quadratic form.",
    notes: [
      { h: "What a quadratic equation is", pts: [
        "Standard form: ax² + bx + c = 0, where a, b, c are real and a ≠ 0.",
        "A root is a value of x that makes the left side zero. A quadratic has at most two roots.",
        "Before solving, clear fractions and brackets and bring every term to one side.",
      ]},
      { h: "Solving by factorisation", pts: [
        "Split the middle term: find two numbers whose product is ac and sum is b.",
        "Write the expression as a product of two linear factors.",
        "Zero-product rule: if pq = 0, then p = 0 or q = 0. Set each factor to zero.",
        "Never divide both sides by an expression containing x; you may lose a root.",
      ]},
      { h: "Quadratic formula", pts: [
        "x = (−b ± √(b² − 4ac)) / 2a. It works for every quadratic.",
        "When the answer is asked to a number of decimal places or significant figures, find the square root carefully and round only at the end.",
      ]},
      { h: "Nature of roots", pts: [
        "The discriminant is D = b² − 4ac.",
        "D > 0: two real, distinct roots. If D is a perfect square (with rational a, b, c), the roots are rational.",
        "D = 0: two real, equal roots, each equal to −b/2a.",
        "D < 0: no real roots.",
        "To find k for equal roots, set D = 0 and solve for k.",
      ]},
      { h: "Equations reducible to quadratics", pts: [
        "Use a substitution, e.g. put y = x² in x⁴ − 5x² + 4 = 0, or y = x + 1/x where it appears.",
        "Equations with x in denominators: multiply through by the LCM, then check that no root makes a denominator zero.",
      ]},
    ],
    formulas: [
      { f: "ax² + bx + c = 0, a ≠ 0", d: "Standard form" },
      { f: "x = (−b ± √(b² − 4ac)) / 2a", d: "Quadratic formula" },
      { f: "D = b² − 4ac", d: "Discriminant" },
      { f: "D > 0, D = 0, D < 0", d: "Distinct real, equal real, no real roots" },
    ],
    examples: [
      { q: "Solve x² − 5x + 6 = 0.",
        s: ["Numbers with product 6 and sum −5: −2 and −3", "(x − 2)(x − 3) = 0", "x = 2 or x = 3"] },
      { q: "Solve 2x² + 3x − 2 = 0 using the formula.",
        s: ["a = 2, b = 3, c = −2; D = 9 + 16 = 25", "x = (−3 ± 5)/4", "x = 1/2 or x = −2"] },
      { q: "Solve x² − 4x − 3 = 0, giving answers correct to two decimal places.",
        s: ["D = 16 + 12 = 28, √28 ≈ 5.2915", "x = (4 ± 5.2915)/2", "x ≈ 4.65 or x ≈ −0.65"] },
      { q: "Find the nature of the roots of 3x² − 4x + 2 = 0.",
        s: ["D = (−4)² − 4 × 3 × 2 = 16 − 24 = −8", "D < 0, so there are no real roots"] },
      { q: "Find k so that x² + kx + 9 = 0 has equal roots.",
        s: ["Equal roots: D = 0", "k² − 36 = 0", "k = 6 or k = −6"] },
    ],
    quiz: [
      { q: "The discriminant of x² + 4x + 4 = 0 is", o: ["0", "8", "16", "32"], a: 0, e: "16 − 16 = 0, so the roots are equal (−2, −2)." },
      { q: "If D < 0, the quadratic has", o: ["two equal roots", "two distinct real roots", "no real roots", "one root"], a: 2, e: "The square root of a negative number is not real." },
      { q: "The roots of x² − 9 = 0 are", o: ["3 only", "−3 only", "3 and −3", "9 and −9"], a: 2, e: "(x − 3)(x + 3) = 0." },
      { q: "Which is a quadratic equation?", o: ["x³ + x = 0", "2x + 1 = 0", "x² − 3x = 0", "1/x = 2"], a: 2, e: "Highest power of x is 2." },
      { q: "For 2x² − 7x + 3 = 0, the value of b² − 4ac is", o: ["25", "73", "49", "24"], a: 0, e: "49 − 24 = 25." },
    ],
  },
  {
    n: 5, title: "Problems on Quadratic Equations", unit: "2",
    scope: "Forming and solving quadratic equations from word problems on numbers, ages, geometry, speed and time, work and money.",
    notes: [
      { h: "Method", pts: [
        "Let the unknown quantity be x and write the other quantities in terms of x.",
        "Translate the given condition into an equation, then simplify it to ax² + bx + c = 0.",
        "Solve by factorisation or by the formula.",
        "Reject values that make no sense: negative lengths, speeds, ages or prices, and non-integer counts of people or objects.",
        "Check the answer against the original statement.",
      ]},
      { h: "Common types", pts: [
        "Numbers: sum and product, consecutive integers (x and x + 1), a number and its reciprocal (x + 1/x).",
        "Ages: write present ages, then add or subtract years for the past or future before forming the equation.",
        "Geometry: area of rectangle = length × breadth; right triangles use Pythagoras' theorem.",
        "Speed and time: time = distance ÷ speed. 'Takes 1 hour less' becomes old time − new time = 1.",
        "Work: if A does a job in x days, A does 1/x of it per day; rates add when people work together.",
        "Money: number of articles × price per article = total cost.",
      ]},
    ],
    formulas: [
      { f: "Time = Distance / Speed", d: "Speed–time problems" },
      { f: "Work per day = 1 / (days for whole job)", d: "Work problems" },
      { f: "h² = b² + p²", d: "Pythagoras' theorem (right triangles)" },
    ],
    examples: [
      { q: "Two numbers have sum 15 and product 56. Find them.",
        s: ["Let the numbers be x and 15 − x", "x(15 − x) = 56, so x² − 15x + 56 = 0", "(x − 7)(x − 8) = 0", "The numbers are 7 and 8"] },
      { q: "A rectangle is 3 m longer than it is wide, and its area is 70 m². Find its dimensions.",
        s: ["Breadth x, length x + 3", "x(x + 3) = 70, so x² + 3x − 70 = 0", "(x + 10)(x − 7) = 0, so x = 7 (reject −10)", "Breadth 7 m, length 10 m"] },
      { q: "A car covers 300 km. Had its speed been 10 km/h more, it would take 1 hour less. Find its speed.",
        s: ["300/x − 300/(x + 10) = 1", "3000 = x(x + 10), so x² + 10x − 3000 = 0", "(x + 60)(x − 50) = 0", "Speed = 50 km/h (reject −60)"] },
      { q: "The product of two consecutive positive integers is 132. Find them.",
        s: ["x(x + 1) = 132, so x² + x − 132 = 0", "(x + 12)(x − 11) = 0", "x = 11, so the integers are 11 and 12"] },
    ],
    quiz: [
      { q: "If the speed is x km/h, the time to cover 120 km is", o: ["120x h", "x/120 h", "120/x h", "120 − x h"], a: 2, e: "Time = distance ÷ speed." },
      { q: "A root of x² + 2x − 15 = 0 gives a length. Which do you keep?", o: ["−5", "3", "both", "neither"], a: 1, e: "Roots are 3 and −5; a length cannot be negative." },
      { q: "Two consecutive even integers can be written as", o: ["x, x + 1", "x, x + 2", "x, 2x", "2x, 2x + 1"], a: 1, e: "Consecutive even integers differ by 2." },
      { q: "If A completes a job in x days, the part done in one day is", o: ["x", "1/x", "x − 1", "1 − x"], a: 1, e: "One day's work is the reciprocal of the total days." },
      { q: "A number exceeds its square root by 6. If the square root is y, the equation is", o: ["y² − y = 6", "y² + y = 6", "y − y² = 6", "2y = 6"], a: 0, e: "Number = y², so y² − y = 6, giving y = 3 and the number 9." },
    ],
  },
  {
    n: 6, title: "Ratio and Proportion", unit: "2",
    scope: "Ratios and their types, proportion, fourth, third and mean proportionals, continued proportion, and the properties invertendo, alternendo, componendo, dividendo and componendo–dividendo.",
    notes: [
      { h: "Ratio", pts: [
        "The ratio of a to b (same kind, same units) is a/b, written a : b. a is the antecedent, b the consequent.",
        "Multiplying or dividing both terms by the same non-zero number does not change a ratio.",
        "Compounded ratio of a : b and c : d is ac : bd.",
        "Duplicate ratio of a : b is a² : b²; triplicate is a³ : b³.",
        "Sub-duplicate ratio is √a : √b; sub-triplicate is ∛a : ∛b. Reciprocal ratio is b : a.",
        "To increase x in the ratio a : b, the new value is x × b/a.",
      ]},
      { h: "Proportion", pts: [
        "a, b, c, d are in proportion (a : b :: c : d) when a/b = c/d, i.e. ad = bc (product of extremes = product of means).",
        "Fourth proportional to a, b, c is d = bc/a.",
        "a, b, c are in continued proportion when a/b = b/c, so b² = ac.",
        "Third proportional to a and b is c = b²/a.",
        "Mean proportional between a and c is b = √(ac).",
      ]},
      { h: "Properties of proportion", pts: [
        "If a/b = c/d, then:",
        "Invertendo: b/a = d/c.",
        "Alternendo: a/c = b/d.",
        "Componendo: (a + b)/b = (c + d)/d.",
        "Dividendo: (a − b)/b = (c − d)/d.",
        "Componendo and dividendo: (a + b)/(a − b) = (c + d)/(c − d). It also works in reverse, which is useful for solving equations like (3x + 2y)/(3x − 2y) = 5/3.",
      ]},
      { h: "k-method for proofs", pts: [
        "Put a/b = c/d = k, so a = bk and c = dk.",
        "Substitute into both sides of the statement to prove and show they simplify to the same expression in k.",
      ]},
    ],
    formulas: [
      { f: "a : b :: c : d ⇔ ad = bc", d: "Proportion" },
      { f: "d = bc / a", d: "Fourth proportional" },
      { f: "c = b² / a", d: "Third proportional" },
      { f: "b = √(ac)", d: "Mean proportional" },
      { f: "(a + b)/(a − b) = (c + d)/(c − d)", d: "Componendo and dividendo" },
      { f: "a : b and c : d → ac : bd", d: "Compounded ratio" },
    ],
    examples: [
      { q: "Find the fourth proportional to 3, 5 and 12.",
        s: ["3 : 5 :: 12 : d", "d = 5 × 12/3 = 20"] },
      { q: "Find the mean proportional between 4 and 25.",
        s: ["b = √(4 × 25) = √100", "b = 10"] },
      { q: "Find the third proportional to 4 and 6.",
        s: ["c = 6²/4 = 36/4", "c = 9"] },
      { q: "If (3x + 2y)/(3x − 2y) = 5/3, find x : y.",
        s: ["Componendo and dividendo: (3x + 2y + 3x − 2y)/(3x + 2y − 3x + 2y) = (5 + 3)/(5 − 3)", "6x/4y = 8/2 = 4", "6x = 16y, so x : y = 8 : 3"] },
      { q: "Find the compounded ratio of 2 : 3 and 9 : 4.",
        s: ["(2 × 9) : (3 × 4) = 18 : 12", "= 3 : 2"] },
    ],
    quiz: [
      { q: "The duplicate ratio of 3 : 4 is", o: ["6 : 8", "9 : 16", "√3 : 2", "27 : 64"], a: 1, e: "Square both terms." },
      { q: "The mean proportional between 9 and 16 is", o: ["12", "12.5", "25", "144"], a: 0, e: "√(9 × 16) = √144 = 12." },
      { q: "If a : b = c : d, then (a + b)/(a − b) = (c + d)/(c − d) is called", o: ["alternendo", "invertendo", "componendo and dividendo", "dividendo"], a: 2, e: "Componendo and dividendo together." },
      { q: "If 2, 6 and x are in continued proportion, x is", o: ["12", "18", "3", "36"], a: 1, e: "6² = 2x, so x = 18." },
      { q: "The sub-duplicate ratio of 25 : 49 is", o: ["5 : 7", "625 : 2401", "50 : 98", "7 : 5"], a: 0, e: "Square roots of both terms." },
    ],
  },
  {
    n: 7, title: "Matrices", unit: "2",
    scope: "Order and types of matrices, equality, addition and subtraction, multiplication by a scalar, multiplication of matrices, and the identity matrix.",
    note: "Matrices are written row by row with rows separated by a semicolon. [2 3; 1 4] means first row 2, 3 and second row 1, 4. Both of your Matrices uploads are covered here.",
    notes: [
      { h: "Matrix and order", pts: [
        "A matrix is a rectangular arrangement of numbers in rows and columns. Each number is an element.",
        "A matrix with m rows and n columns has order m × n (read 'm by n').",
        "Number of elements = m × n.",
      ]},
      { h: "Types of matrices", pts: [
        "Row matrix: one row (order 1 × n). Column matrix: one column (order m × 1).",
        "Square matrix: as many rows as columns. Its leading diagonal runs from top left to bottom right.",
        "Zero (null) matrix: every element is 0.",
        "Diagonal matrix: a square matrix whose non-diagonal elements are all 0.",
        "Unit (identity) matrix I: a diagonal matrix with every diagonal element 1, e.g. I = [1 0; 0 1].",
      ]},
      { h: "Equality, addition and subtraction", pts: [
        "Two matrices are equal only if they have the same order and every corresponding element is equal. Equating elements gives equations to solve.",
        "Matrices can be added or subtracted only if they have the same order; add or subtract corresponding elements.",
        "Addition is commutative (A + B = B + A) and associative. The zero matrix is the additive identity; −A is the additive inverse of A.",
      ]},
      { h: "Scalar multiplication", pts: [
        "To multiply a matrix by a number k, multiply every element by k.",
        "k(A + B) = kA + kB.",
      ]},
      { h: "Multiplying matrices", pts: [
        "AB exists only if the number of columns of A equals the number of rows of B.",
        "If A is m × n and B is n × p, then AB is m × p.",
        "Each element of AB = sum of products of a row of A with the matching column of B (row-by-column).",
        "In general AB ≠ BA, so matrix multiplication is not commutative. AB can be zero even when neither A nor B is zero.",
        "AI = IA = A for a square matrix A. A² means A × A.",
      ]},
    ],
    formulas: [
      { f: "Order = rows × columns", d: "m × n" },
      { f: "(m × n)(n × p) → m × p", d: "Condition and order of a product" },
      { f: "[a b; c d][p q; r s] = [ap + br  aq + bs; cp + dr  cq + ds]", d: "2 × 2 product" },
      { f: "AI = IA = A", d: "Identity matrix" },
      { f: "AB ≠ BA (in general)", d: "Not commutative" },
    ],
    examples: [
      { q: "A = [2 3; 1 4] and B = [1 0; −2 5]. Find A + B and 2A − B.",
        s: ["A + B = [3 3; −1 9]", "2A = [4 6; 2 8]", "2A − B = [3 6; 4 3]"] },
      { q: "With the same A and B, find AB.",
        s: ["Row 1: 2 × 1 + 3 × (−2) = −4; 2 × 0 + 3 × 5 = 15", "Row 2: 1 × 1 + 4 × (−2) = −7; 1 × 0 + 4 × 5 = 20", "AB = [−4 15; −7 20]"] },
      { q: "Find x and y if [x + y; x − y] = [7; 1].",
        s: ["x + y = 7 and x − y = 1", "Adding: 2x = 8, so x = 4", "y = 3"] },
      { q: "A is of order 2 × 3 and B of order 3 × 2. What are the orders of AB and BA?",
        s: ["AB: (2 × 3)(3 × 2) gives 2 × 2", "BA: (3 × 2)(2 × 3) gives 3 × 3"] },
      { q: "Find A² for A = [1 2; 0 1].",
        s: ["A² = [1 2; 0 1][1 2; 0 1]", "= [1 × 1 + 2 × 0  1 × 2 + 2 × 1; 0 + 0  0 + 1]", "A² = [1 4; 0 1]"] },
    ],
    quiz: [
      { q: "A matrix with 3 rows and 2 columns has order", o: ["2 × 3", "3 × 2", "6", "3 × 3"], a: 1, e: "Rows first, then columns." },
      { q: "If A is 2 × 3 and B is 2 × 3, which exists?", o: ["AB", "BA", "A + B", "None of these"], a: 2, e: "Same order allows addition; AB needs columns of A = rows of B." },
      { q: "The identity matrix of order 2 is", o: ["[0 0; 0 0]", "[1 1; 1 1]", "[1 0; 0 1]", "[0 1; 1 0]"], a: 2, e: "Ones on the leading diagonal, zeros elsewhere." },
      { q: "[1 2][3; 4] equals", o: ["[11]", "[3 8]", "[3; 8]", "[10]"], a: 0, e: "1 × 3 + 2 × 4 = 11, a 1 × 1 matrix." },
      { q: "In general, matrix multiplication is", o: ["commutative", "not commutative", "not associative", "undefined"], a: 1, e: "AB and BA are usually different." },
    ],
  },
  {
    n: 8, title: "Remainder and Factor Theorems", unit: "2",
    scope: "Polynomials and their values, the division algorithm, the remainder theorem, the factor theorem, finding unknown coefficients and factorising cubic polynomials.",
    notes: [
      { h: "Polynomials", pts: [
        "A polynomial in x has terms with whole-number powers of x. Its degree is the highest power with a non-zero coefficient.",
        "p(a) means the value of p(x) when x = a.",
        "Division algorithm: dividend = divisor × quotient + remainder, where the remainder is 0 or of lower degree than the divisor.",
      ]},
      { h: "Remainder theorem", pts: [
        "When p(x) is divided by (x − a), the remainder is p(a).",
        "Divisor (x + a): remainder is p(−a).",
        "Divisor (ax − b): remainder is p(b/a). Set the divisor equal to zero to get the value to substitute.",
      ]},
      { h: "Factor theorem", pts: [
        "(x − a) is a factor of p(x) if and only if p(a) = 0.",
        "To test a possible factor, substitute and check for zero.",
        "To find an unknown coefficient, set p(a) = 0 (or equal to the given remainder) and solve.",
        "With two unknowns, use two conditions to get two simultaneous equations.",
      ]},
      { h: "Factorising a cubic", pts: [
        "Try small values (factors of the constant term: ±1, ±2, ±3, …) until p(a) = 0. Then (x − a) is a factor.",
        "Divide p(x) by (x − a) by long division or by comparing coefficients to get a quadratic.",
        "Factorise the quadratic to finish.",
        "If the sum of all coefficients is 0, then (x − 1) is a factor. If the sum of coefficients of even powers equals that of odd powers, (x + 1) is a factor.",
      ]},
    ],
    formulas: [
      { f: "p(x) = d(x) · q(x) + r(x)", d: "Division algorithm" },
      { f: "Remainder of p(x) ÷ (x − a) = p(a)", d: "Remainder theorem" },
      { f: "Remainder of p(x) ÷ (ax − b) = p(b/a)", d: "Linear divisor in general" },
      { f: "p(a) = 0 ⇔ (x − a) is a factor", d: "Factor theorem" },
    ],
    examples: [
      { q: "Find the remainder when x³ − 2x² + 4x − 5 is divided by (x − 2).",
        s: ["p(2) = 8 − 8 + 8 − 5", "Remainder = 3"] },
      { q: "Find the remainder when 4x² + 3x − 1 is divided by (2x − 1).",
        s: ["2x − 1 = 0 gives x = 1/2", "p(1/2) = 4 × 1/4 + 3/2 − 1 = 1 + 1.5 − 1", "Remainder = 1.5 (that is, 3/2)"] },
      { q: "Find k if (x − 3) is a factor of 2x² − kx + 3.",
        s: ["p(3) = 0: 18 − 3k + 3 = 0", "3k = 21, so k = 7"] },
      { q: "Show that (x + 1) is a factor of x³ + 2x² − x − 2 and factorise it completely.",
        s: ["p(−1) = −1 + 2 + 1 − 2 = 0, so (x + 1) is a factor", "x³ + 2x² − x − 2 = x²(x + 2) − 1(x + 2) = (x + 2)(x² − 1)", "= (x + 2)(x − 1)(x + 1)"] },
      { q: "Factorise x³ − 6x² + 11x − 6.",
        s: ["Sum of coefficients 1 − 6 + 11 − 6 = 0, so (x − 1) is a factor", "Dividing gives x² − 5x + 6", "x² − 5x + 6 = (x − 2)(x − 3)", "Answer: (x − 1)(x − 2)(x − 3)"] },
    ],
    quiz: [
      { q: "The remainder when x² + 3x + 5 is divided by (x + 1) is", o: ["3", "9", "1", "−3"], a: 0, e: "p(−1) = 1 − 3 + 5 = 3." },
      { q: "(x − 2) is a factor of p(x) if", o: ["p(−2) = 0", "p(2) = 0", "p(0) = 2", "p(2) = 2"], a: 1, e: "Factor theorem: p(a) = 0." },
      { q: "To find the remainder on dividing by (3x − 2), substitute x =", o: ["2", "3", "2/3", "−2/3"], a: 2, e: "Set 3x − 2 = 0." },
      { q: "Which is a factor of x³ − 1?", o: ["x + 1", "x − 1", "x² + 1", "x"], a: 1, e: "p(1) = 0." },
      { q: "If the sum of the coefficients of a polynomial is zero, a factor is", o: ["x", "x + 1", "x − 1", "x² − 1"], a: 2, e: "The sum of coefficients equals p(1)." },
    ],
  },
];

// Stable ids used for saved progress; these never change even if chapters are reordered.
export const LEGACY_IDS = { 1: "vat", 2: "banking", 3: "inequations", 4: "quadratic", 5: "quadratic-problems", 6: "ratio", 7: "matrices", 8: "factor" };

const BY_ID = { ...MORE };
BASE.forEach((c) => { BY_ID[LEGACY_IDS[c.n]] = c; });

const PLAN = [
  { id: "1", name: "Commercial mathematics", ids: ["gst", "vat", "banking", "shares"] },
  { id: "2", name: "Algebra", ids: ["inequations", "quadratic", "quadratic-problems", "ratio", "factor", "matrices", "ap", "gp"] },
  { id: "3", name: "Coordinate geometry", ids: ["reflection", "section", "line"] },
  { id: "4", name: "Geometry", ids: ["symmetry", "similarity", "loci", "circles", "constructions"] },
  { id: "5", name: "Mensuration", ids: ["circle-area", "solids"] },
  { id: "6", name: "Trigonometry", ids: ["trig-identities", "heights"] },
  { id: "7", name: "Statistics", ids: ["graphs", "mean", "median"] },
  { id: "8", name: "Probability", ids: ["probability"] },
];

export const CHAPTERS = [];
export const UNITS = PLAN.map((u) => ({
  id: u.id,
  name: u.name,
  chapters: u.ids.map((id) => {
    const c = BY_ID[id];
    if (!c) throw new Error("Missing maths chapter " + id);
    const n = CHAPTERS.length + 1;
    CHAPTERS.push({ ...c, id, n, unit: u.id });
    return n;
  }),
}));
