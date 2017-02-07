var game=game?game:{};

game.resource = function(name,startingValue,onTick) {
  this.name = name;
  this.onTick = onTick?onTick:function(){};
  this.value = startingValue?startingValue:0;
  this.increase = function(amount) {
    this.value += amount?amount:1;
  }
  this.decrease = function(amount) {
    if(amount>this.value) {
      throw "Not enough "+this.name;
    }
    this.value -= amount;
  }
}
