api.chatRoom.broadcast({}, 'room:demo', {cmdType: 'ANSWER', correct: false})
api.chatRoom.broadcast({}, 'room:demo', {cmdType: 'HUECMD',  state: [['on']]})
api.chatRoom.broadcast({}, 'room:demo', {cmdType: 'SETSCORES',  teams: [{score:10, color: [100,125,0]}, {score:5, color: [200,0,100]}]})
api.chatRoom.broadcast({}, 'room:demo', {cmdType: 'STARTCOUNTDOWN',  seconds:10})
