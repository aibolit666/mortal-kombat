const $arenas = document.querySelector(".arenas");
const $randomButton = document.querySelector(".button");
let winner = 0;

const player1 = {
  player: 1,
  name: "SUBZERO",
  hp: 100,
  img: "http://reactmarathon-api.herokuapp.com/assets/subzero.gif",
  weapron: ["Snowballs"],
  attack: function (name) {
    console.log(name + " " + "Fight...");
  },
};

const player2 = {
  player: 2,
  name: "SONYA",
  hp: 100,
  img: "http://reactmarathon-api.herokuapp.com/assets/sonya.gif",
  weapron: ["Legs"],
  attack: function (name) {
    console.log(name + " " + "Fight...");
  },
};

function createElement(tag, className) {
  const $tag = document.createElement(tag);
  if (className) {
    $tag.classList.add(className);
  }
  return $tag;
}

function createPlayer(playerObj) {
  const $player = createElement("div", "player" + playerObj.player);
  const $progressbar = createElement("div", "progressbar");
  const $character = createElement("div", "character");
  const $life = createElement("div", "life");
  const $name = createElement("div", "name");
  const $img = createElement("img");

  $life.style.width = playerObj.hp + "%";
  $name.innerText = playerObj.name;
  $img.src = playerObj.img;

  $player.appendChild($progressbar);
  $progressbar.appendChild($life);
  $progressbar.appendChild($name);
  $player.appendChild($character);
  $character.appendChild($img);
  return $player;
}

function playerWin(name) {
  const $winTitle = createElement("div", "winTitle");
  if (name === player1.name) {
    $winTitle.innerText = player2.name + " wins";
  } else {
    $winTitle.innerText = player1.name + " wins";
  }
  return $winTitle;
}

function randomHIT() {
  return Math.floor(Math.random() * 20);
}

function changeHP(player) {
  const $playerLife = document.querySelector(
    ".player" + player.player + " .life"
  );
  player.hp -= randomHIT();
  $playerLife.style.width = player.hp + "%";

  if (player.hp <= 0) {
    player.hp = 0;
    $playerLife.style.width = player.hp + "%";
    $arenas.appendChild(playerWin(player.name));
    $randomButton.disabled = true;
  }
}

$randomButton.addEventListener("click", function () {
  changeHP(player1);
  changeHP(player2);
});

$arenas.appendChild(createPlayer(player1));
$arenas.appendChild(createPlayer(player2));
