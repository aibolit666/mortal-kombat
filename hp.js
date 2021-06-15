export function elHP() {
  return document.querySelector(".player" + this.playerNumber + " .life");
}

export function renderHP() {
  this.elHP().style.width = this.hp + "%";
}

export function changeHP(num) {
  this.hp -= num;
  if (this.hp <= 0) {
    this.hp = 0;
  }
  this.damage = num;
}
