const MIN_LENGTH = 2;
const MAX_LENGTH = 50;
const ALLOWED_PATTERN = /^[A-Za-z0-9 ]+$/;

function isValidSearchTerm(term) {
  if (typeof term !== 'string') return false;
  const trimmed = term.trim();
  if (trimmed.length < MIN_LENGTH || trimmed.length > MAX_LENGTH) return false;
  return ALLOWED_PATTERN.test(trimmed);
}

if (typeof module !== 'undefined' && module.exports) {
  module.exports = { isValidSearchTerm, MIN_LENGTH, MAX_LENGTH };
}
