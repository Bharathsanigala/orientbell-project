export const generateMonthCalendar=(year, month)=> {
    const daysInMonth = new Date(year, month, 0).getDate();
    const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const firstDayOfMonth = new Date(year, month - 1, 1);
    const firstDayOfWeek = firstDayOfMonth.getDay();
    const calendar = [];
    for(let i=0;i<firstDayOfWeek;i++){
        calendar.push({ date: '00/00/00', day: daysOfWeek[i] });
      }
    for (let day = 1; day <= daysInMonth; day++) {
        const date = new Date(year, month - 1, day);
        const dayOfWeekIndex = date.getDay();
        const dayOfWeek = daysOfWeek[dayOfWeekIndex];
        const formattedDate = date.toLocaleDateString('en-US', { day: '2-digit', month: '2-digit', year: 'numeric' });
        calendar.push({ date: formattedDate, day: dayOfWeek });
    }
    return calendar;
}
export const monthArray =['january','february','march','april','may','june','july','august','september','october','november','december']
export const dayArray =['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday']
