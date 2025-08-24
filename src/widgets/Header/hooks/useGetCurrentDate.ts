export const useGetCurrentDate = () => {
    const days = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];
    const date = new Date();
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    const currentDay = date.getDay();
    return {currentDay: days[currentDay], date: `${day}/0${month}/${year}`}
}

