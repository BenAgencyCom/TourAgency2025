import moment from "moment";

export const fullDate = (date: Date): string => moment(date).format("YYYY-MM-DD HH:mm:ss");
export const ageOnly = (date: Date): number => Number(moment().diff(date, "years"));
