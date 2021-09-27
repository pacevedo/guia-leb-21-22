const MatchService = {
  getWins: (matches, idTeam) => {
    return matches.reduce((acum,match) => { 
      const {scoreLocal, scoreVisit} = match
      const isWin = (match.local === idTeam && scoreLocal > scoreVisit) || 
      (match.visit === idTeam && scoreLocal < scoreVisit)
      return acum + isWin*1
    }, 0)
  },
  getLosses: (matches, idTeam) => {
    return matches.reduce((acum,match) => { 
      const {scoreLocal, scoreVisit} = match
      const isLoss = (match.local === idTeam && scoreLocal < scoreVisit) || 
      (match.visit === idTeam && scoreLocal > scoreVisit)
      return acum + isLoss*1
    }, 0)
  },
  getPoints: (matches, idTeam, favor) => {
    return matches.reduce((acum, match) => {
      const {scoreLocal, scoreVisit} = match
      let score = 0;
      if (favor) {
        score = match.local === idTeam ? scoreLocal : scoreVisit
      } else {
        score = match.local === idTeam ? scoreVisit : scoreLocal
      }
      return acum + score
    }, 0)
  }
}

export default MatchService