var game=game||{};
game.resources = new Array();
game.tick = function() {
  for(var count=0;count<this.resources;count++) {
    this.resources[count].onTick();
  }
};
game.tick.bind(game);
game.interval = window.setInterval(game.tick,100);
