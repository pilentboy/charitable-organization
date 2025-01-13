function addCommasToNumber(number: string) {
  return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}
export default addCommasToNumber;
