import { $arenas, $randomButton, $chat } from "./const.js";
import { player1, player2, createElement } from "./main.js";
import { logs } from "./log.js";
import getRandom from "./getrandom.js";

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

export { createReloadButton, playerWins, showResult, generateLogs };
