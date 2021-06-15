const $arenas = document.querySelector(".arenas");
const $randomButton = document.querySelector(".button");
const $formFight = document.querySelector(".control");
const $chat = document.querySelector(".chat");
const HIT = {
  head: 30,
  body: 25,
  foot: 20,
};
const ATTACK = ["head", "body", "foot"];

export { $arenas, $randomButton, $formFight, $chat, HIT, ATTACK };
