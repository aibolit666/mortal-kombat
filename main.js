const player1 = {
  name: "Subzero",
  hp: 80,
  img: "http://reactmarathon-api.herokuapp.com/assets/subzero.gif",
  weapron: ["Snowballs"],
  attack: function () {
    console.log(player1.name + " Fight...");
  },
};

const player2 = {
  name: "Sonya",
  hp: 20,
  img: "http://reactmarathon-api.herokuapp.com/assets/sonya.gif",
  weapron: ["Legs"],
  attack: function () {
    console.log(player2.name + " Fight...");
  },
};

function createPlayer(playerClass, player) {
  const $player = document.createElement("div");
  $player.classList.add(playerClass);

  const $progressbar = document.createElement("div");
  $progressbar.classList.add("progressbar");

  const $character = document.createElement("div");
  $character.classList.add("character");

  const $life = document.createElement("div");
  $life.classList.add("life");
  $life.style.width = player.hp + "%";

  const $name = document.createElement("div");
  $name.classList.add("name");
  $name.innerText = player.name;

  const $img = document.createElement("img");
  $img.src = player.img;

  const $root = document.querySelector(".root");
  $root.appendChild($player);
  $player.appendChild($progressbar);
  $progressbar.appendChild($life);
  $progressbar.appendChild($name);
  $player.appendChild($character);
  $character.appendChild($img);

  const $arenas = document.querySelector(".arenas");
  $arenas.appendChild($player);
}

createPlayer("player1", player1);
createPlayer("player2", player2);
