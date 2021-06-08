const $arenas = document.querySelector(".arenas");
const $randomButton = document.querySelector(".button");
const $button = document.querySelector(".button");

const player1 = {
  playerNumber: 1,
  name: "SUBZERO",
  hp: 100,
  changeHP: changeHP,
  elHP: elHP,
  renderHP: renderHP,
  img: "http://reactmarathon-api.herokuapp.com/assets/subzero.gif",
  weapron: ["Snowballs"],
  attack: function (name) {
    console.log(name + " " + "Fight...");
  },
};

const player2 = {
  playerNumber: 2,
  name: "SONYA",
  hp: 100,
  changeHP: changeHP,
  elHP: elHP,
  renderHP: renderHP,
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
  const $player = createElement("div", "player" + playerObj.playerNumber);
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

function playerWins(name) {
  const $winTitle = createElement("div", "winTitle");
  if (name) {
    $winTitle.innerText = name + " wins";
  } else {
    $winTitle.innerText = "draw";
  }

  return $winTitle;
}

function getRandom(num) {
  return Math.ceil(Math.random() * num);
}

function elHP() {
  return document.querySelector(".player" + this.playerNumber + " .life");
}

function renderHP() {
  this.elHP().style.width = this.hp + "%";
}

function changeHP(num) {
  this.hp -= num;
  if (this.hp <= 0) {
    this.hp = 0;
  }
}

function createReloadButton() {
  const $reloadWrap = createElement("div", "reloadWrap");

  $button.innerText = "Restart";

  $arenas.appendChild($reloadWrap);
  $reloadWrap.appendChild($button);

  $button.addEventListener("click", function () {
    window.location.reload();
  });
  return $reloadWrap;
}

$randomButton.addEventListener("click", function () {
  player1.changeHP(getRandom(20));
  player2.changeHP(getRandom(20));
  player1.renderHP();
  player2.renderHP();

  if (player1.hp === 0 || player2.hp === 0) {
    $arenas.appendChild(createReloadButton());
  }

  if (player1.hp === 0 && player1.hp < player2.hp) {
    $arenas.appendChild(playerWins(player2.name));
  } else if (player2.hp === 0 && player2.hp < player1.hp) {
    $arenas.appendChild(playerWins(player1.name));
  } else if (player2.hp === 0 && player2.hp === 0) {
    $arenas.appendChild(playerWins());
  }
});

$arenas.appendChild(createPlayer(player1));
$arenas.appendChild(createPlayer(player2));
