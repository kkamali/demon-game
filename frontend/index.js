const START_GAME_URL = "http://localhost:3000/start"
const PLAYER_URL = "http://localhost:3000/players"
const SUMMONS_URL = "http://localhost:3000/summons"
const SACRIFICES_URL = 'http://localhost:3000/sacrifices'
const start = document.querySelector('div#start')
const gameContainer = document.getElementById('game')
const assetsContainer = document.getElementById('assets')
const dialogueContainer = document.getElementById('dialogue')
let player
let currentSummon

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
      .then(function (info) {
        this.name = info.name
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
      player = new Player(playerNameField.value)
      createGame(player)
    }
  })
})

function createGame() {
  start.setAttribute('hidden', 'true')
  fetch(SUMMONS_URL)
    .then(function (response) {
      return response.json()
    })
    .then(function (summons) {
      if (summons.length === 0) {
        summon()
      } else {
        selectASummon(summons)
      }
    })
}

function summon() {
  let header = document.createElement('h2')
  header.innerText = "Many objects are before you..."
  let smaller = document.createElement('h3')
  smaller.innerText = "What will you take?"
  assetsContainer.appendChild(header)
  assetsContainer.appendChild(smaller)
  let sacrificeSelect = document.createElement('select')
  fetch(SACRIFICES_URL)
    .then(function (response) {
      return response.json()
    }).then(function (sacrifices) {
      for (sacrifice of sacrifices) {
        let option = document.createElement('option')
        option.setAttribute('value', sacrifice.name)
        option.innerText = sacrifice.name
        sacrificeSelect.appendChild(option)
      }
    })
  assetsContainer.appendChild(sacrificeSelect)
  let submit = document.createElement('input')
  submit.setAttribute('type', 'submit')
  submit.setAttribute('value', 'Take')
  submit.addEventListener('click', function (e) {
    e.preventDefault()
    createSummon(sacrificeSelect.value)
  })
  assetsContainer.appendChild(submit)
}

function createSummon(sacrifice) {
  let configObject = {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ sacrifice: sacrifice })
  }
  fetch(SUMMONS_URL, configObject)
    .then(function (response) {
      return response.json()
    }).then(function (summon) {
      console.log(summon)
    })
}

function selectASummon(summons) {
  console.log("TODO")
}