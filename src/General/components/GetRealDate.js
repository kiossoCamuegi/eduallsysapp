
export default  function GetRealDate(date1, date2) {
      let crDate1 = date1.split('-'); // m d a
      let crDate2 = date2.split('-'); // m d a
      if(crDate1.length < 3 && crDate2.length < 3) return false
      let newDate1 = new Date(crDate1[1]+'/'+crDate1[2]+'/'+crDate1[0]);
      let newDate2 = new Date(crDate2[1]+'/'+crDate2[2]+'/'+crDate2[0]);

      var difference = newDate1.getTime() - newDate2.getTime();
      var days = Math.ceil(difference / (1000 * 3600 * 24));
      
      return days;
}
 