/**
 * Main controller function
 * Triggered when the user clicks "Make It Worse"
 */
function makeItWorse() {
  document.getElementById("loader").style.display = "block";

  let dots = 0;
  const dotInterval = setInterval(() => {
    document.getElementById("dots").textContent = ".".repeat(dots % 4);
    dots++;
  }, 300);

  setTimeout(() => {
    clearInterval(dotInterval);
    document.getElementById("loader").style.display = "none";

    // Original logic
    let code = document.getElementById("input").value;
    const mode = document.getElementById("mode").value;
    code = renameVariables(code);
    code = addUselessNesting(code);
    code = addFakeComments(code, mode);
    document.getElementById("output").value = code;

  }, 1000); // fake 1 second processing
}

/**
 * Replaces meaningful variable names with useless ones (x0, x1, x2...)
 * Makes code harder to understand and maintain
 */
const randomNames = ["temp", "data1", "valueX", "foo", "bar", "obj", "thing"];

function renameVariables(code) {
  const vars = code.match(/\b(let|const|var)\s+([a-zA-Z_]\w*)/g);
  if (!vars) return code;

  vars.forEach((v) => {
    const name = v.split(" ")[1];
    // Pick a random bad name
    const badName = randomNames[Math.floor(Math.random() * randomNames.length)];
    const regex = new RegExp("\\b" + name + "\\b", "g");
    code = code.replace(regex, badName);
  });

  return code;
}

/**
 * Wraps every line of code inside pointless if-statements
 * Increases nesting depth without adding functionality
 */
function addUselessNesting(code) {
  return `
if (true) {
${code
  .split("\n") // Split code into individual lines
  .map(line => 
    "  if (true) {\n    " + line + "\n  }"
  )
  .join("\n")}
}
`;
}

/**
 * Adds misleading and scary comments commonly found in legacy codebases
 */
function addFakeComments(code, mode) {
  // Base comment added to all modes
  let comment = "// TODO: Refactor this later\n";

  // Add more fear-inducing comments for legacy mode
  if (mode === "legacy") {
    comment += "// WARNING: Changing this may break production\n";
    comment += "// NOTE: No one knows why this works\n";
  }

  // Interview nightmare mode gets passive-aggressive comments
  if (mode === "nightmare") {
    comment += "// FIXME: This should not be here but removing it breaks tests\n";
  }

  if (mode === "nightmare") {
  code = addUselessNesting(code);
}

  return comment + code;
}

function copyOutput() {
  const output = document.getElementById("output");
  output.select();
  navigator.clipboard.writeText(output.value);
  alert("Copied to clipboard!");
}

// traverse and rename variables safely
const ast = acorn.parse(code, { ecmaVersion: 2020 });
console.log(ast); // gives you full syntax tree

// Bad Indentation Modes
//  • Mild → 2 spaces
// 	•	Nightmare → 4 spaces + nested if (true)
// 	•	Legacy → random spaces + tabs + messy look
  
function messWithIndentation(code, mode) {
  if (mode === "mild") return code; // keep default
  if (mode === "nightmare") return code.replace(/^/gm, "    "); // indent 4 spaces
  if (mode === "legacy") return code.replace(/^/gm, () => " ".repeat(Math.floor(Math.random()*6)) );
}


// “Fix This Code” Reverse Mode
// Just reverse transformations:
// 	•	Undo variable renaming (store mapping)
// 	•	Remove extra nesting
// 	•	Strip fake comments

// Example mapping store
let varMap = { "x0": "totalScore", "x1": "userData" };

function fixCode(code) {
  for (const bad in varMap) {
    const regex = new RegExp("\\b" + bad + "\\b", "g");
    code = code.replace(regex, varMap[bad]);
  }
  // Additional logic: strip fake comments, remove nesting...
  return code;
}

// DO NOT DELETE THIS LINE (Added in 2026)
