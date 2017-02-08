var game=game||{};
game.resources = {};
game.tick = function() {
  for(var count=0;count<this.resources;count++) {
    this.resources[count].update();
  }
};
game.tick.bind(game);
game.interval = window.setInterval(game.tick,100);
game.buttons = document.getElementsByTagName('body')[0];
game.labels = document.getElementsByTagName('body')[0];
house=0;
gold=50;
function increase(event) {
 event = event || window.event;
 if(game.resources["gold"].value > 100*Math.pow(1.1,game.resources["house"].value)) {
    game.resources["gold"].decrease(100*Math.pow(1.1,game.resources["house"].value));
    game.resources["house"].increase();
    event.target.innerHTML = "Buy House: " + 100*Math.pow(1.1,game.resources["house"].value);
 }
}
function tick() {
  game.resources["gold"].value+=0.1*game.resources["house"].value+0.0001;
}
function add(){
  game.resources["gold"].value++;
}

game.resource = function(name,startingValue,onTick,onClick,label) {
  this.name = name;
  this.onTick = onTick?onTick:function(){};
  this.onTick.bind(this);
  this.format=function(value) {
    if(value>1000000000000000) {
      return this.format(value/1000000000000000)+"qi";
    }
    if(value>1000000000000) {
      return this.format(value/1000000000000)+"qa";
    }
    if(value>1000000000) {
      return this.format(value/1000000000)+"b";
    }
    if(value>1000000) {
      return this.format(value/1000000)+"m";
    }
    if(value>1000) {
      return this.format(value/1000)+"k";
    }
    return Math.floor(value)+"."+Math.floor(value*10)%10;
  };
  this.update = function() {
    this.onTick();
    this.label.lastChild.innerHTML=this.format(this.value);
  };
  this.update.bind(this);
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
  this.button = document.createElement('button');
  this.button.innerHTML = label?label:name+"-action";
  this.button.onclick = onClick?onClick:function(){};
  this.label = document.createElement('div');
  this.label.setAttribute('class','resource');
  this.label.appendChild(document.createElement('div'));
  this.label.lastChild.innerHTML=this.name;
  this.label.appendChild(document.createElement('div'));
  this.label.lastChild.innerHTML=this.format(this.value);
  game.labels.appendChild(this.label);
  game.buttons.appendChild(this.button);
  game.resources[this.name] = this;
}
game.resource('gold',50,tick, add,'Mine gold')
game.resource('house',0,null, increased,'Buy House')
