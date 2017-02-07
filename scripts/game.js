var game=game||{};
game.resources = new Array();
game.tick = function() {
  for(var count=0;count<this.resources;count++) {
    this.resources[count].update();
  }
};
game.tick.bind(game);
game.interval = window.setInterval(game.tick,100);
house=0;
gold=50;
function increase(event) {
 event = event || window.event;
 if(gold > 100*Math.pow(1.1,house)) {
    gold-=100*Math.pow(1.1,house);
    house++;
    event.target.innerHTML =100*Math.pow(1.1,house);
    document.getElementById("gold").firstChild.innerHTML=gold;
    document.getElementById("house").firstChild.innerHTML=house;
 }
}
window.setInterval(function() {
  gold+=0.1*house+0.0001;
  document.getElementById("gold").firstChild.innerHTML=gold;
},100);
var game=game?game:{};

game.resource = function(name,startingValue,onTick,onClick,label) {
  this.name = name;
  this.onTick = onTick?onTick:function(){};
  this.onTick.bind(this);
  this.update = function() {
    this.onTick();
    this.label.lastChild.innerHTML=this.value;
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
  this.label.lastChild.innerHTML=this.value;
}
