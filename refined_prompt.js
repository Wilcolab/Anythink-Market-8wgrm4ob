/**
 * Convert a string to camelCase.
 *
 * Handles:
 * - Errors for non-string, empty, or whitespace-only input.
 * - Multiple consecutive separators (spaces, hyphens, underscores, or any non-alphanumeric).
 * - Leading/trailing separators.
 * - Mixed casing (normalizes tokens separated by non-alphanumerics).
 * - Preserves internal camelCase for inputs that have no separators (e.g. "helloWorld").
 *
 * Examples:
 *   toCamelCase('hello world')       // 'helloWorld'
 *   toCamelCase('__FOO---bar__')    // 'fooBar'
 *   toCamelCase('helloWorld')       // 'helloWorld' (preserves internal camel casing)
 *
 * @param {string} input
 * @returns {string}
 * @throws {TypeError|Error}
 */
function toCamelCase(input) {
    // Validate type
    if (typeof input !== 'string') {
        throw new TypeError(`toCamelCase: expected a string input, received ${typeof input}`);
    }

    // Check for empty string
    if (input.length === 0) {
        throw new Error('toCamelCase: input string is empty');
    }

    // Trim surrounding whitespace and check for whitespace-only
    const trimmed = input.trim();
    if (trimmed.length === 0) {
        throw new Error('toCamelCase: input string contains only whitespace');
    }

    // If there are no non-alphanumeric separators, assume the string is a single token.
    // In that case preserve internal casing but ensure the first character is lowercased
    // so that "HelloWorld" -> "helloWorld" and "helloWorld" stays "helloWorld".
    const hasSeparator = /[^\p{L}\p{N}]/u.test(trimmed);
    if (!hasSeparator) {
        return trimmed.charAt(0).toLowerCase() + trimmed.slice(1);
    }

    // Split on any sequence of characters that are NOT letters or numbers (Unicode-aware).
    // This treats spaces, hyphens, underscores, punctuation, etc. as separators.
    const rawTokens = trimmed.split(/[^\p{L}\p{N}]+/u);

    // Remove empty tokens produced by leading/trailing/multiple separators
    const tokens = rawTokens.filter(Boolean);

    if (tokens.length === 0) {
        throw new Error('toCamelCase: no alphanumeric tokens found in input');
    }

    // Normalize: first token is all lowercase, subsequent tokens are Capitalized (first letter upper, rest lower)
    const first = tokens[0].toLowerCase();
    const rest = tokens.slice(1).map((t) => {
        if (t.length === 0) return '';
        const firstChar = t.charAt(0).toUpperCase();
        const restChars = t.slice(1).toLowerCase();
        return firstChar + restChars;
    });

    return [first, ...rest].join('');
}

module.exports = toCamelCase;

/**
 * Convert a string to dot.case.
 *
 * Behavior:
 * - Errors for non-string, empty, or whitespace-only input.
 * - Treats any non-alphanumeric (Unicode-aware) sequence as a separator.
 * - Handles multiple, leading, and trailing separators.
 * - When there are no explicit separators, splits common camelCase / PascalCase
 *   and numeric boundaries (e.g. "helloWorld42" -> "hello.world.42").
 * - Normalizes all tokens to lowercase and joins with dots.
 *
 * @param {string} input
 * @returns {string}
 * @throws {TypeError|Error}
 */
function toDotCase(input) {
    if (typeof input !== 'string') {
        throw new TypeError(`toDotCase: expected a string input, received ${typeof input}`);
    }

    if (input.length === 0) {
        throw new Error('toDotCase: input string is empty');
    }

    const trimmed = input.trim();
    if (trimmed.length === 0) {
        throw new Error('toDotCase: input string contains only whitespace');
    }

    const hasSeparator = /[^\p{L}\p{N}]/u.test(trimmed);
    let tokens = [];

    if (hasSeparator) {
        tokens = trimmed.split(/[^\p{L}\p{N}]+/u).filter(Boolean);
    } else {
        // Split camelCase, PascalCase, acronyms and numbers.
        // Matches:
        //  - consecutive uppercase letters that form an acronym before a mixed case word (e.g. "XMLHttp" -> "XML", "Http")
        //  - optional leading uppercase + lowercase run (e.g. "Hello" -> "Hello")
        //  - numbers
        tokens = trimmed.match(/(\p{Lu}+?(?=\p{Lu}\p{Ll}))|(\p{Lu}?\p{Ll}+)|(\p{N}+)/gu) || [trimmed];
    }

    if (tokens.length === 0) {
        throw new Error('toDotCase: no alphanumeric tokens found in input');
    }

    return tokens.map(t => t.toLowerCase()).join('.');
}

module.exports.toDotCase = toDotCase;