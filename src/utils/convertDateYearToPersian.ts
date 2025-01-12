import moment from "jalali-moment";

const convertDateYearToPersian = (dateString: string) => {
  const date = moment(dateString, "YYYY-MM-DD").locale("fa");
  return `${date.jYear()}/${date.jMonth() + 1}/${date.jDate()}`;
};

export default convertDateYearToPersian;
