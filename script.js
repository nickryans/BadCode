/**
 * Main controller function
 * Triggered when the user clicks "Make It Worse"
 */
function makeItWorse() {
  // Get the original code from input textarea
  let code = document.getElementById("input").value;

  // Get selected chaos mode
  const mode = document.getElementById("mode").value;

  // Step 1: Destroy meaningful variable names
  code = renameVariables(code);

  // Step 2: Add unnecessary nesting to reduce readability
  code = addUselessNesting(code);

  // Step 3: Add misleading / corporate-style comments
  code = addFakeComments(code, mode);

  // Output the terrible code
  document.getElementById("output").value = code;
}

/**
 * Replaces meaningful variable names with useless ones (x0, x1, x2...)
 * Makes code harder to understand and maintain
 */
function renameVariables(code) {
  // Find all variable declarations (let, const, var)
  const vars = code.match(/\b(let|const|var)\s+([a-zA-Z_]\w*)/g);

  // If no variables found, return code unchanged
  if (!vars) return code;

  // Loop through each found variable
  vars.forEach((v, i) => {
    // Extract the variable name
    const name = v.split(" ")[1];

    // Generate a meaningless variable name
    const badName = "x" + i;

    // Create a regex to replace ALL occurrences of that variable
    const regex = new RegExp("\\b" + name + "\\b", "g");

    // Replace variable name throughout the code
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

// DO NOT DELETE THIS LINE (Added in 2026)
