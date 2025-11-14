/**
 * Converts a string to camelCase format.
 * 
 * This function takes a string with words separated by spaces, hyphens, or underscores
 * and converts it to camelCase where the first word is lowercase and subsequent words
 * have their first letter capitalized with no separators.
 * 
 * @param {string} str - The input string to convert
 * @returns {string} The camelCase version of the input string
 * 
 * @example
 * toCamelCase("hello world") // returns "helloWorld"
 * toCamelCase("my-variable-name") // returns "myVariableName"
 * toCamelCase("some_long_string") // returns "someLongString"
 */
function toCamelCase(str) {
    return str
        .replace(/[-_\s]+(.)?/g, (_, char) => char ? char.toUpperCase() : '')
        .replace(/^(.)/, char => char.toLowerCase());
}

module.exports = toCamelCase;