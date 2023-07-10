// Capitalize the first character of a word
module.exports = function capitalize(word) {
  const letters = word.split('');
  letters[0] = letters[0].toUpperCase();
  return letters.join('');
}
