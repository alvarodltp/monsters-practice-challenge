document.addEventListener("DOMContentLoaded", init);

let nameInput = document.getElementById("name");
let ageInput = document.getElementById("age");
let createButton = document.getElementById("submit");
let monsterContainer = document.getElementById("monster-container");
let backButton = document.getElementById("back");
let forwardButton = document.getElementById("forward");
let pageCounter = 1;

function init() {
  createButton.addEventListener("click", onClick);
  backButton.addEventListener("click", pageDown);
  forwardButton.addEventListener("click", pageUp);
  fetchFiftyMonsters();
}

function onClick(event) {
  event.preventDefault();
  let name = document.getElementById("name").value;
  let age = document.getElementById("age").value;
  let description = document.getElementById("description").value;
  addNewMonster(name, age, description);
}

function fetchFiftyMonsters() {
  fetch("http://localhost:3000/monsters/?_limit=50")
    .then(response => response.json())
    .then(json => {
      monsters = json;
      Object.keys(monsters).forEach(function(key) {
        let name = document.createElement("h2");
        let age = document.createElement("h3");
        let description = document.createElement("p");
        name.innerText = monsters[key].name;
        age.innerText = monsters[key].age;
        description.innerText = monsters[key].description;
        monsterContainer.appendChild(name);
        monsterContainer.appendChild(age);
        monsterContainer.appendChild(description);
      });
    });
}

function render(monster) {
  let name = document.createElement("h2");
  let age = document.createElement("h3");
  let description = document.createElement("p");
  monsterContainer.appendChild(name);
  monsterContainer.appendChild(age);
  monsterContainer.appendChild(description);
  name.innerText = monster.name;
  age.innerText = monster.age;
  description.innerText = monster.description;
}

function addNewMonster(name, age, description) {
  fetch(`http://localhost:3000/monsters/`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      name: name,
      age: age,
      description: description
    })
  })
    .then(response => response.json())
    .then(json => {
      let newMonster = json;
      render(newMonster);
    });
}

function pageUp() {
  let containerToClear = document.getElementById("monster-container");
  containerToClear.innerHTML = "";
  // debugger;
  let page = ++pageCounter;
  fetch(`http://localhost:3000/monsters/?_limit=50&_page=${page}`)
    .then(response => response.json())
    .then(json => {
      // debugger;
      data = json;
      Object.keys(data).forEach(function(key) {
        let name = document.createElement("h2");
        let age = document.createElement("h3");
        let description = document.createElement("p");
        name.innerText = data[key].name;
        age.innerText = data[key].age;
        description.innerText = data[key].description;
        // debugger;
        monsterContainer.appendChild(name);
        monsterContainer.appendChild(age);
        monsterContainer.appendChild(description);
      });
    });
}

function pageDown() {
  let containerToClear = document.getElementById("monster-container");
  containerToClear.innerHTML = "";
  let page = --pageCounter;
  if (page < 1) {
    alert("Can't go that way!");
  }
  fetch(`http://localhost:3000/monsters/?_limit=50&_page=${page}`)
    .then(response => response.json())
    .then(json => {
      // debugger;
      data = json;
      Object.keys(data).forEach(function(key) {
        let name = document.createElement("h2");
        let age = document.createElement("h3");
        let description = document.createElement("p");
        name.innerText = data[key].name;
        age.innerText = data[key].age;
        description.innerText = data[key].description;
        // debugger;
        monsterContainer.appendChild(name);
        monsterContainer.appendChild(age);
        monsterContainer.appendChild(description);
      });
    });
}
