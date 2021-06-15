import { logs } from "./log.js";
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
    generateLogs("draw", player1, player2);
  }
  return $loseTitle;
}

function createReloadButton() {
  const $reloadButtonDiv = createElement("div", "reloadWrap");
  const $reloadButton = createElement("button", "button");
  $reloadButton.innerText = "Restart";

  $reloadButton.addEventListener("click", function () {
    window.location.reload();
  });

  $reloadButtonDiv.appendChild($reloadButton);
  $arenas.appendChild($reloadButtonDiv);
}

generateLogs("start", player1, player2);
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

function playerAttack() {
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
  return attack;
}

function showResult() {
  if (player1.hp === 0 || player2.hp === 0) {
    $randomButton.disabled = true;
    createReloadButton();
  }

  if (player1.hp === 0 && player1.hp < player2.hp) {
    $arenas.appendChild(playerWins(player2.name));
    generateLogs("end", player2, player1);
  } else if (player2.hp === 0 && player2.hp < player1.hp) {
    $arenas.appendChild(playerWins(player1.name));
    generateLogs("end", player1, player2);
  } else if (player2.hp === 0 && player2.hp === 0) {
    $arenas.appendChild(playerWins());
  }
}

function generateLogs(type, player1, player2) {
  let el;
  let text;
  const date = new Date();
  const normalize = (num) => (num.toString().length > 1 ? num : `0${num}`);
  const time = `${normalize(date.getHours())}:${normalize(
    date.getMinutes()
  )}:${normalize(date.getSeconds())}`;

  switch (type) {
    case "start":
      text = logs[type]
        .replace("[time]", time)
        .replace("[player1]", player1.name)
        .replace("[player2]", player2.name);
      el = `<p>${text}</p>`;
      break;
    case "end":
      text = logs[type][getRandom(logs[type].length - 1)]
        .replace("[playerWins]", player1.name)
        .replace("[playerLose]", player2.name);
      el = `<p>${text}</p>`;
      break;
    case "hit":
      text = logs[type][getRandom(logs[type].length - 1)]
        .replace("[playerKick]", player2.name)
        .replace("[playerDefence]", player1.name);
      el = `<p>${time}: ${text} ${-player1.damage} [${player1.hp}/100]</p>`;
      break;
    case "defence":
      text = logs[type][getRandom(logs[type].length - 1)]
        .replace("[playerKick]", player2.name)
        .replace("[playerDefence]", player1.name);
      el = `<p>${time}: ${text}</p>`;
      break;
    case "draw":
      el = `<p>${logs[type]}</p>`;
      break;
    default:
      el = `<p>${time}: Error</p>`;
  }
  $chat.insertAdjacentHTML("afterbegin", el);
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
