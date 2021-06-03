const player = {
  name: "Subzero",
  hp: 100,
  img: "",
  weapron: ["Iceblade", "Snowballs"],
  attack: function () {
    console.log(player1.name + " Fight...");
  },
};

function createPlayer() {
  const $player1 = document.createElement("div");
  $player1.classList.add("player1");

  const $progressbar = document.createElement("div");
  $progressbar.classList.add("progressbar");

  const $character = document.createElement("div");
  $character.classList.add("character");

  const $life = document.createElement("div");
  $life.classList.add("life");
  $life.style.width = "100%";

  const $name = document.createElement("div");
  $name.classList.add("name");
  $name.innerText = "Subzero";

  const $img = document.createElement("img");
  $img.src = "http://reactmarathon-api.herokuapp.com/assets/subzero.gif";

  const $root = document.querySelector(".root");
  $root.appendChild($player1);
  $player1.appendChild($progressbar);
  $progressbar.appendChild($life);
  $progressbar.appendChild($name);
  $player1.appendChild($character);
  $character.appendChild($img);
}
