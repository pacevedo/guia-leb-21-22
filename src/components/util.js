const Util = {
  getYearsOld (bornDate) {
    if (bornDate !== undefined) {
      const dob = Util.getDateFromString(bornDate)
      var diff_ms = Date.now() - dob.getTime();
      var age_dt = new Date(diff_ms); 
      return Math.abs(age_dt.getUTCFullYear() - 1970);
    } else {
      return 0
    }
  },
  getYearsOldDecimal (bornDate) {
    if (bornDate !== undefined) {
      const dob = Util.getDateFromString(bornDate)
      const diff_ms = Date.now() - dob.getTime();
      return diff_ms / 31536000000
    } else {
      return 0
    }
  },
  getNearestBirthday(date) {
    const currentDate = new Date()
    const currentYear = currentDate.getFullYear()
    let returnDate = new Date(date)
    returnDate.setYear(currentYear)
    if (returnDate.getTime() > currentDate.getTime){
      returnDate.setYear(currentYear-1)
    }
    return returnDate
  },
  getDifferenceDays(date1, date2) {
    const diffTime = Math.abs(date2 - date1);
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24)); 
  },
  getDateFromString (date) {
    const partsDate = date.split('/')
    if (partsDate.length === 3) {
      const year = parseInt(partsDate[2])
      const month = parseInt(partsDate[1]) - 1
      const day = parseInt(partsDate[0])
      return new Date(year,month,day)
    } else {
      return null
    }
  },
  orderByAvgYearsOld(a,b){
    if(a.avgYearsOld < b.avgYearsOld) {
      return 1
    }
    if(a.avgYearsOld > b.avgYearsOld) {
      return -1
    }
    return 0
  },
  orderByAvgHeight(a,b){
    if(a.avgHeight < b.avgHeight) {
      return 1
    }
    if(a.avgHeight > b.avgHeight) {
      return -1
    }
    return 0
  },
  orderByCount(a,b){
    if(a.count < b.count) {
      return 1
    }
    if(a.count > b.count) {
      return -1
    }
    return 0
  }
}

export default Util