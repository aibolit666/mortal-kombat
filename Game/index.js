import { getRandom, createElement } from "../utils/index.js";
import { HIT, ATTACK, LOGS } from "../constans/const.js";
import Player from "../Player/index.js";

class Game {
  constructor() {
    this.$arenas = document.querySelector(".arenas");
    this.$randomButton = document.querySelector(".button");
    this.$formFight = document.querySelector(".control");
    this.$chat = document.querySelector(".chat");
  }

  player1 = new Player({
    player: 1,
    name: "SUBZERO",
    hp: 100,
    img: "http://reactmarathon-api.herokuapp.com/assets/subzero.gif",
    rootSelector: "arenas",
  });

  player2 = new Player({
    player: 2,
    name: "SONYA",
    hp: 100,
    img: "http://reactmarathon-api.herokuapp.com/assets/sonya.gif",
    rootSelector: "arenas",
  });

  createReloadButton = () => {
    const $reloadButtonDiv = createElement("div", "reloadWrap");
    const $reloadButton = createElement("button", "button");
    $reloadButton.innerText = "Restart";

    $reloadButton.addEventListener("click", function () {
      window.location.reload();
    });

    $reloadButtonDiv.appendChild($reloadButton);
    this.$arenas.appendChild($reloadButtonDiv);
  };

  playerWins = (name) => {
    const $loseTitle = createElement("div", "loseTitle");
    if (name) {
      $loseTitle.innerText = name + " wins";
    } else {
      $loseTitle.innerText = "draw";
      generateLogs("draw", player1, player2);
    }
    return $loseTitle;
  };

  enemyAttack = () => {
    const hit = ATTACK[getRandom(3) - 1];
    const defence = ATTACK[getRandom(3) - 1];

    return {
      value: getRandom(HIT[hit]),
      hit,
      defence,
    };
  };

  playerAttack = () => {
    const attack = {};

    for (let item of this.$formFight) {
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
  };

  showResult = () => {
    if (this.player1.hp === 0 || this.player2.hp === 0) {
      this.$randomButton.disabled = true;
      this.createReloadButton();
    }

    if (this.player1.hp === 0 && this.player1.hp < this.player2.hp) {
      this.$arenas.appendChild(this.playerWins(this.player2.name));
      this.generateLogs("end", this.player2, this.player1);
    } else if (this.player2.hp === 0 && this.player2.hp < this.player1.hp) {
      this.$arenas.appendChild(this.playerWins(this.player1.name));
      this.generateLogs("end", this.player1, this.player2);
    } else if (this.player2.hp === 0 && this.player2.hp === 0) {
      this.$arenas.appendChild(this.playerWins());
    }
  };

  generateLogs = (type, player1, player2) => {
    let el;
    let text = this.text;
    const date = new Date();
    const normalize = (num) => (num.toString().length > 1 ? num : `0${num}`);
    const time = `${normalize(date.getHours())}:${normalize(
      date.getMinutes()
    )}:${normalize(date.getSeconds())}`;
    switch (type) {
      case "start":
        text = LOGS[type]
          .replace("[time]", time)
          .replace("[player1]", player1.name)
          .replace("[player2]", player2.name);
        el = `<p>${text}</p>`;
        break;
      case "end":
        text = LOGS[type][getRandom(LOGS[type].length - 1)]
          .replace("[playerWins]", player1.name)
          .replace("[playerLose]", player2.name);
        el = `<p>${text}</p>`;
        break;
      case "hit":
        text = LOGS[type][getRandom(LOGS[type].length - 1)]
          .replace("[playerKick]", player2.name)
          .replace("[playerDefence]", player1.name);
        el = `<p>${time}: ${text} ${-player1.damage} [${player1.hp}/100]</p>`;
        break;
      case "defence":
        text = LOGS[type][getRandom(LOGS[type].length - 1)]
          .replace("[playerKick]", player2.name)
          .replace("[playerDefence]", player1.name);
        el = `<p>${time}: ${text}</p>`;
        break;
      case "draw":
        el = `<p>${LOGS[type]}</p>`;
        break;
      default:
        el = `<p>${time}: Error</p>`;
    }
    this.$chat.insertAdjacentHTML("afterbegin", el);
  };

  start = () => {
    this.player1.createPlayer();
    this.player2.createPlayer();

    this.generateLogs("start", this.player1, this.player2);

    this.$formFight.addEventListener("submit", (e) => {
      e.preventDefault();
      const enemy = this.enemyAttack();
      const player = this.playerAttack();

      if (player.defence !== enemy.hit) {
        this.player1.changeHP(enemy.value);
        this.player1.renderHP();
        this.generateLogs("hit", this.player1, this.player2);
      } else {
        this.generateLogs("defence", this.player1, this.player2);
      }
      if (enemy.defence !== player.hit) {
        this.player2.changeHP(player.value);
        this.player2.renderHP();
        this.generateLogs("hit", this.player2, this.player1);
      } else {
        this.generateLogs("defence", this.player2, this.player1);
      }

      this.showResult();
    });
  };
}
export default Game;
