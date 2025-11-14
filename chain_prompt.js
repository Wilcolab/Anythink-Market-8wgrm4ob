/**
 * Convert a string to kebab-case.
 *
 * Steps:
 * 1. Validate input is a non-empty string (whitespace-only strings are considered empty).
 * 2. Trim leading/trailing whitespace.
 * 3. Convert to lowercase.
 * 4. Replace spaces and underscores (and runs of them) with a single hyphen.
 * 5. Collapse multiple hyphens and remove leading/trailing hyphens.
 *
 * @param {string} input - The string to convert.
 * @returns {string} The kebab-cased string.
 * @throws {TypeError} If input is not a non-empty string.
 *
 * Examples:
 * toKebabCase(' Hello  World ') // 'hello-world'
 * toKebabCase('foo_bar__baz')   // 'foo-bar-baz'
 * toKebabCase('Already-kebab')  // 'already-kebab'
 */
function toKebabCase(input) {
    if (typeof input !== 'string' || input.trim().length === 0) {
        throw new TypeError('Input must be a non-empty string.');
    }

    // Trim and lowercase
    const normalized = input.trim().toLowerCase();

    // Replace spaces and underscores (runs of them) with a single hyphen
    let kebab = normalized.replace(/[\s_]+/g, '-');

    // Collapse multiple hyphens that may already exist and remove leading/trailing hyphens
    kebab = kebab.replace(/-+/g, '-').replace(/^-+|-+$/g, '');

    return kebab;
}

/* Example calls demonstrating input and expected output */
console.log(toKebabCase(' Hello  World '));                 // 'hello-world'
console.log(toKebabCase('foo_bar__baz'));                   // 'foo-bar-baz'
console.log(toKebabCase('__Leading_Underscores__'));        // 'leading-underscores'
console.log(toKebabCase('Mixed--Separators__ and  Spaces'));// 'mixed-separators-and-spaces'
console.log(toKebabCase('Already-kebab-case'));             // 'already-kebab-case'

// Uncommenting the following will throw:
// toKebabCase('   '); // throws TypeError: Input must be a non-empty string.