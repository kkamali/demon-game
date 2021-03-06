const START_GAME_URL = "http://localhost:3000/start"
const PLAYER_URL = "http://localhost:3000/players"
const SUMMONS_URL = "http://localhost:3000/summons"
const SACRIFICES_URL = 'http://localhost:3000/sacrifices'
const start = document.querySelector('div#start')
const gameContainer = document.getElementById('game')
const assetsContainer = document.getElementById('assets')
const dialogueContainer = document.getElementById('dialogue')
let player
let demon
let currentSummon

class Player {
  constructor(name, id) {
    this.name = name
    this.id = id
  }
}

class Summon {
  constructor(id, demon, affection, currentPhase) {
    this.id = id
    this.demon = demon
    this.affection = affection
    this.currentPhase = currentPhase
  }
}

class Demon {
  constructor(name, title, affection) {
    this.name = name
    this.title = title
    this.affection = affection
  }

  willEat() {
    if (this.affection == 10) {
      currentSummon.currentPhase = "win"
    } else {
      currentSummon.currentPhase = "lose"
    }
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
      let configObject = {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ name: playerNameField.value })
      }
      fetch(START_GAME_URL, configObject)
        .then(function (response) {
          return response.json()
        })
        .then(function (info) {
          player = new Player(info.name, info.id)
          summon()
        })
    }
  })
})

function summon() {
  start.setAttribute('hidden', 'true')
  dialogueContainer.innerHTML = ""
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
    body: JSON.stringify({
      player_id: player.id,
      sacrifice: sacrifice
    })
  }
  fetch(SUMMONS_URL, configObject)
    .then(function (response) {
      return response.json()
    }).then(function (summon) {
      demon = new Demon(summon.demon.name, summon.demon.title, 0)
      currentSummon = new Summon(summon.id, demon, 0, "introduction")
      play()
    })
}

function play() {
  assetsContainer.innerHTML = ""
  dialogueContainer.innerHTML = ""
  getDialogue()
}

function getDialogue() {
  fetch(`${SUMMONS_URL}/${currentSummon.id}/dialogues/${currentSummon.currentPhase}`)
    .then(function (response) {
      return response.json()
    }).then(function (dialogue) {
      let dialogueBox = document.createElement('div')
      dialogueBox.setAttribute('class', 'dialogue')
      let speech = document.createElement('p')
      speech.innerHTML = `<strong>${demon.title} ${demon.name}: </strong> ${dialogue[0].dialogue}`
      dialogueBox.appendChild(speech)
      dialogueContainer.appendChild(dialogueBox)
      if (currentSummon.currentPhase === "win" || currentSummon.currentPhase === "lose") {
        createEnding(dialogueBox)
      } else {
        createChoices(dialogue[0], dialogueBox)
      }
    })
}

function goodChoice() {
  currentSummon.affection += 5
  demon.affection += 5
  updatePhase()
}

function badChoice() {
  currentSummon.affection -= 5
  demon.affection -= 5
  updatePhase()
}

function updatePhase() {
  if (currentSummon.currentPhase === "placating") {
    demon.willEat()
  } else {
    currentSummon.currentPhase = "placating"
  }
  let configObject = {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json"
    },
    body: JSON.stringify({ id: currentSummon.id, affection_level: currentSummon.affection, current_phase: currentSummon.currentPhase })
  }
  fetch(`${SUMMONS_URL}/${currentSummon.id}`, configObject)
    .then(function (response) {
      return response.json()
    }).then(function (summon) {
      play()
    })
}

function createChoices(dialogue, dialogueBox) {
  let ul = document.createElement('ul')
  let rightChoice = document.createElement('li')
  rightChoice.addEventListener('click', function (e) {
    e.preventDefault()
    goodChoice()
  })
  rightChoice.innerHTML = dialogue.right
  let wrongChoice = document.createElement('li')
  wrongChoice.addEventListener('click', function (e) {
    e.preventDefault()
    badChoice()
  })
  wrongChoice.innerHTML = dialogue.wrong
  ul.appendChild(rightChoice)
  ul.appendChild(wrongChoice)
  dialogueBox.appendChild(ul)
}

function createEnding() {
  let ending = document.createElement('h1')
  if (currentSummon.currentPhase === "win") {
    ending.innerText = "Congratulations -- you narrowly avoided a horrible fate!"
  } else {
    ending.innerText = "Oh my, looks like you've met a nasty end!"
  }
  let tryAgain = document.createElement('span')
  tryAgain.innerHTML = "Play again?"
  tryAgain.addEventListener('click', function (e) {
    e.preventDefault()
    summon()
  })
  dialogueContainer.appendChild(ending)
  dialogueContainer.appendChild(tryAgain)
}