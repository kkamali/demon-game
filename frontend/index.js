const START_GAME_URL = "http://localhost:3000/start"
const PLAYER_URL = "http://localhost:3000/players"

class Player {
  constructor(name) {
    findPlayer(name)
  }

  get name() {
    return this.name
  }

  set name(name) {
    this.name = name
  }

  findPlayer = function (name) {
    let configObject = {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ name: name })
    }
    fetch(START_GAME_URL, configObject)
      .then(function (response) {
        return response.json()
      })
      .then(function (player) {
        console.log(player)
        name(player.name)
      })
  }
}

document.addEventListener('DOMContentLoaded', function () {
  const playerSubmit = document.querySelector('div#start input[type="submit"')
  const playerNameField = document.querySelector('div#start input[type="text"')
  playerSubmit.addEventListener('click', function (e) {
    e.preventDefault
  })
})

