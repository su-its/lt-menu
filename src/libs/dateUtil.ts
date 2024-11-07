export const formatTimeToHHMM = (dateString: string | Date) => {
  const date = new Date(dateString);
  return date
    .toLocaleTimeString("ja-JP", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    })
    .slice(0, 5); // 秒を除去
};

export const formatDateToYYYYMMDD = (dateString: string | Date) => {
  return new Date(dateString).toLocaleDateString("ja-JP", {
    year: "numeric",
    month: "numeric",
    day: "numeric",
  });
};

export const formatDateToDuration = (
  dateString: string | Date,
  duration: number,
) => {
  const date = new Date(dateString);
  const end = new Date(date.getTime() + duration * 60 * 1000);
  return `${formatTimeToHHMM(date)} - ${formatTimeToHHMM(end)}`;
};
