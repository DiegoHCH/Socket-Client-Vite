
export const getDateNowMessageChat = (): string => {
  try {
    let dateNow = new Date();
    let year = dateNow.getUTCFullYear();
    let month = addNumZero(dateNow.getUTCMonth() + 1);
    let day = addNumZero(dateNow.getUTCDate());
    let hours = addNumZero(dateNow.getUTCHours());
    let minutes = addNumZero(dateNow.getUTCMinutes());
    let seconds = addNumZero(dateNow.getUTCSeconds());
    let milliseconds = dateNow.getUTCMilliseconds();

    let dateUTC = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}.${milliseconds} +0000`;

    return dateUTC;
  } catch (error) {
    return '';
  }
}

function addNumZero(num: number) {
  try {
    return num < 10 ? `0${num}` : num;
  } catch (error) {
    return '';
  }
}