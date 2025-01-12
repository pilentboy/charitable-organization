const convertDateNumbersToFAEN = (date: string, expectedType: string) => {
  const persianNumbers = "۰۱۲۳۴۵۶۷۸۹";
  const englishNumbers = "0123456789";
  // Defining Persian and English number sets

  let result = date
    .split("")
    .map((char) => {
      if (expectedType === "persian") {
        const index = englishNumbers.indexOf(char);
        return index === -1 ? char : persianNumbers[index];
        // Converting English numbers to Persian numbers
      } else {
        const index = persianNumbers.indexOf(char);
        return index === -1 ? char : englishNumbers[index];
        // Converting Persian numbers to English numbers
      }
    })
    .join("");
  // Splitting the input date string and mapping each character to its corresponding number in the target language, then joining back to form the result string

  if (expectedType === "persian") {
    return result.replace(/-/g, "/");
    // Replacing hyphens with slashes in the Persian date format
  } else {
    return result.replace(/\//g, "-");
    // Replacing slashes with hyphens in the English date format
  }
};

export default convertDateNumbersToFAEN;
// Exporting the convertDateToFAEN function as the default export
