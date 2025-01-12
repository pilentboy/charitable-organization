import moment from "jalali-moment";

const convertDateToPersian = (timestamp: any) => {
  const date = moment(timestamp, "YYYY-MM-DDTHH:mm:ss.SSSZ").locale("fa");
  return `${date.jYear()}/${date.jMonth() + 1}/${date.jDate()}`;
};



export default convertDateToPersian;
