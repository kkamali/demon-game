const START_GAME_URL = "http://localhost:3000/start"
const PLAYER_URL = "http://localhost:3000/players"
const SUMMONS_URL = "http://localhost:3000/summons"
const start = document.querySelector('div#start')

class Player {
  constructor(name) {
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
        this.name = player.name
      }.bind(this))
  }
}

document.addEventListener('DOMContentLoaded', function () {
  const playerSubmit = document.querySelector('div#start input[type="submit"')
  const playerNameField = document.querySelector('div#start input[type="text"')
  playerSubmit.addEventListener('click', function (e) {
    e.preventDefault()
    if (playerNameField.value === "") {
      alert("You must fill in your name, human")
    } else {
      const player = new Player(playerNameField.value)
      createGame(player)
    }
  })
})

function createGame(player) {
  start.setAttribute('hidden', 'true')
  fetch(SUMMONS_URL)
    .then(function (response) {
      return response.json()
    })
    .then(function (summons) {
      console.log(summons)
    })
}
