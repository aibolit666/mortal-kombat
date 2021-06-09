const $arenas = document.querySelector(".arenas");
// const $randomButton = document.querySelector(".button");
const $formFight = document.querySelector(".control");
const HIT = {
  head: 30,
  body: 25,
  foot: 20,
};
const ATTACK = ["head", "body", "foot"];

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
  const $loseTitle = createElement("div", "loseTitle");
  if (name) {
    $loseTitle.innerText = name + " wins";
  } else {
    $loseTitle.innerText = "draw";
  }

  return $loseTitle;
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
  const $reloadButtonDiv = createElement("div", "reloadWrap");
  const $reloadButton = createElement("button", "button");
  $button.innerText = "Restart";

  $reloadButton.addEventListener("click", function () {
    window.location.reload();
  });

  $reloadButtonDiv.appendChild($reloadButton);
  $arenas.appendChild($reloadButtonDiv);
}

// $randomButton.addEventListener("click", function () {
//   player1.changeHP(getRandom(20));
//   player2.changeHP(getRandom(20));
//   player1.renderHP();
//   player2.renderHP();

//   if (player1.hp === 0 || player2.hp === 0) {
//     $randomButton.disabled = true;
//     createReloadButton();
//   }

//   if (player1.hp === 0 && player1.hp < player2.hp) {
//     $arenas.appendChild(playerWins(player2.name));
//   } else if (player2.hp === 0 && player2.hp < player1.hp) {
//     $arenas.appendChild(playerWins(player1.name));
//   } else if (player2.hp === 0 && player2.hp === 0) {
//     $arenas.appendChild(playerWins());
//   }
// });

$arenas.appendChild(createPlayer(player1));
$arenas.appendChild(createPlayer(player2));

function enemyAttack() {
  const hit = ATTACK[getRandom(3) - 1];
  const defence = ATTACK[getRandom(3) - 1];

  return {
    value: getRandom(HIT[hit]),
    hit,
    defence,
  };
}

$formFight.addEventListener("submit", function (e) {
  e.preventDefault();
  const enemy = enemyAttack();

  const attack = {};

  for (let item of $formFight) {
    if (item.checked && item.name === "hit") {
      attack.value = getRandom(HIT[item.value]);
      attack.hit = item.value;
    }

    if (item.checked && item.name === "defence") {
      attack.defence = item.value;
    }
    item.checked = false;
  }
  console.log("#### a", attack);
  console.log("#### e", enemy);
});
