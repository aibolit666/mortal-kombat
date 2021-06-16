import {
  $arenas,
  $randomButton,
  $formFight,
  $chat,
  HIT,
  ATTACK,
} from "./const.js";
import getRandom from "./getrandom.js";
import { elHP, renderHP, changeHP } from "./hp.js";
import {
  createReloadButton,
  playerWins,
  showResult,
  generateLogs,
} from "./createelement.js";
import { playerAttack, enemyAttack } from "./attack.js";

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

$formFight.addEventListener("submit", function (e) {
  e.preventDefault();
  const enemy = enemyAttack();
  const player = playerAttack();

  if (player.defence !== enemy.hit) {
    player1.changeHP(enemy.value);
    player1.renderHP();
    generateLogs("hit", player1, player2);
  } else {
    generateLogs("defence", player1, player2);
  }

  if (enemy.defence !== player.hit) {
    player2.changeHP(player.value);
    player2.renderHP();
    generateLogs("hit", player2, player1);
  } else {
    generateLogs("defence", player2, player1);
  }

  showResult();
});

function init() {
  $arenas.appendChild(createPlayer(player1));
  $arenas.appendChild(createPlayer(player2));
  generateLogs("start", player1, player2);
}

init();

export { player1, player2, createElement };
