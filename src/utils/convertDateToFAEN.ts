const convertDateToFAEN = (date: string, expectedType: string) => {
  const persianNumbers = "۰۱۲۳۴۵۶۷۸۹";
  const englishNumbers = "0123456789";
  let result = date
    .split("")
    .map((char) => {
      if (expectedType === "persian") {
        const index = englishNumbers.indexOf(char);
        return index === -1 ? char : persianNumbers[index];
      } else {
        const index = persianNumbers.indexOf(char);
        return index === -1 ? char : englishNumbers[index];
      }
    })
    .join("");
  if (expectedType === "persian") {
    console.log(result.replace(/-/g, "/"));
  } else {
    console.log(result.replace(/\//g, "-"));
  }
};
export default convertDateToFAEN