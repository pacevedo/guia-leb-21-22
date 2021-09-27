const PlayerService = {
  getTotalSeconds: mins => {
    if (mins !== undefined) {
      const time = mins.split(':')
      const [hours, minutes, seconds] = time
      return (hours*3600 + minutes*60 + seconds*1)
    } else {
      return 0
    }
  },
  getMinutes: mins => {
    if (mins !== undefined) {
      const time = mins.split(':')
      const [hours, minutes, seconds] = time
      return hours*60 + minutes*1 + ':' + seconds.toString().padStart(2,'0')
    } else {
      return ''
    }
  },
  getMinutesPerGame: (mins, matches) => {
    if (mins !== undefined && matches > 0) {
      const totalSeconds = PlayerService.getTotalSeconds(mins)
      const secondsPerMatch = Math.trunc(totalSeconds / matches)
      const minutes = Math.trunc(secondsPerMatch / 60)
      const seconds = (secondsPerMatch % 60).toString().padStart(2,'0')
      return minutes + ':' + seconds
    } else {
      return ''
    }
  },
  getRatio: (made, attempted, showPercentage) => {
    if (attempted > 0) {
      const percentage = ((made / attempted) * 100).toFixed(1)
      return made+'/'+ attempted + (showPercentage ?' ('+percentage+'%)' : '')
    } else {
      return attempted !== undefined ? '0/0':''
    }
  },
  getRatioPerGame: (made, attempted, matches, showPercentage) => {
    if (attempted > 0) {
      const madePerMatch = (made / matches).toFixed(1)
      const attemptedPerMatch = (attempted / matches).toFixed(1)
      const percentage = ((made / attempted) * 100).toFixed(1)
      return madePerMatch+'/'+ attemptedPerMatch + (showPercentage ?' ('+percentage+'%)' : '')
    } else {
      return attempted !== undefined ? '0/0':''
    } 
  },
  getRatioPer40Minutes: (made, attempted, mins, showPercentage) => {
    if (attempted > 0) {
      const seconds = PlayerService.getTotalSeconds(mins)
      const madePer40Min = ((made / seconds) * 2400).toFixed(1)
      const attemptedPerMin = ((attempted / seconds) * 2400).toFixed(1)
      const percentage = ((made / attempted) * 100).toFixed(1)
      return madePer40Min+'/'+ attemptedPerMin + (showPercentage ?' ('+percentage+'%)' : '')
    } else {
      return attempted !== undefined ? '0/0':''
    }
  },
  getPercentage: (made, attempted) => {
    if (attempted > 0) {
      return ((made / attempted) * 100).toFixed(1)+'%'
    } else {
      return ''
    }
  },
  getElementPer40Minutes: (element, mins) => {
    if (mins !== undefined) {
      const seconds = PlayerService.getTotalSeconds(mins)
      return ((element / seconds) * 2400).toFixed(1)
    } else {
      return mins !== undefined ? '0' : ''
    }
  },
  getNationality: (nationality, index) => {
    if (nationality !== undefined) {
      return nationality.split('/')[index - 1]
    } else {
      return ''
    }
  },
  hasDoubleNationality: (nationality) => {
    if (nationality !== undefined) {
      return nationality.includes('/')
    } else {
      return false
    }
  },
  getFlag: (nationality, countries) => {
    const listCountries = countries.filter(item => item.abr === nationality)
    if (listCountries.length === 1){
      const country = listCountries[0]
      return require('../assets/flags/'+country.flag)
    }
    else {
      return ""
    }
  },
  getEFG: (made2, made3, attempted2, attempted3) => {
    const efg = (made2 + made3 + 0.5 * made3) / (attempted2 + attempted3)
    return (efg * 100).toFixed(1)
  },
  getTS: (pts, attempted2, attempted3, attemptedFT) => {
    const ts = pts / (2 * (attempted2 + attempted3 + 0.44 * attemptedFT))
    return (ts * 100).toFixed(1)
  },
  get3Par: (attempted2, attempted3) => {
    const threePar = attempted3 / (attempted3 + attempted2)
    return (threePar * 100).toFixed(1)
  }
}

export default PlayerService