const $arenas = document.querySelector(".arenas");
const $randomButton = document.querySelector(".button");

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

function playerLose(name) {
  const $loseTitle = createElement("div", "loseTitle");
  $loseTitle.innerText = name + " " + "lose";
  return $loseTitle;
}

function changeHP(player) {
  const $playerLife = document.querySelector(
    ".player" + player.player + " " + ".life"
  );
  player.hp -= Math.ceil(Math.random() * 20);
  $playerLife.style.width = player.hp + "%";

  if (player.hp <= 0) {
    player.hp = 0;
    $playerLife.style.width = player.hp + "%";
    $arenas.appendChild(playerLose(player.name));
    $randomButton.disabled = true;
  }
}

$randomButton.addEventListener("click", function () {
  changeHP(player1);
  changeHP(player2);
});

$arenas.appendChild(createPlayer(player1));
$arenas.appendChild(createPlayer(player2));
