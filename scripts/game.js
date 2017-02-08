var game= {
  resources: {},
  tick: function() {
  for(var res in game.resources) {
    game.resources[res].update();
  }
}
};
game.tick.bind(game);
game.interval = window.setInterval(game.tick,100);
game.buttons = document.getElementById('buttons');
game.labels = document.getElementById('stats'); 

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
  if(onClick){
  this.button = document.createElement('button');
  this.button.innerHTML = label?label:name+"-action";
  this.button.onclick = onClick;
  game.buttons.appendChild(this.button);
  }
  this.label = document.createElement('div');
  this.label.setAttribute('class','resource');
  this.label.appendChild(document.createElement('div'));
  this.label.lastChild.innerHTML=this.name;
  this.label.appendChild(document.createElement('div'));
  this.label.lastChild.innerHTML=this.format(this.value);
  game.labels.appendChild(this.label);
  game.resources[this.name] = this;
}
game.resources.gold = new game.resource('gold',50,
              function(){ game.resources["gold"].value+=0.1*game.resources.house.value+0.01*game.resources.human.value+0.0001;}, 
              function(){ game.resources["gold"].value++;},
              'Mine gold')
game.resources.house = new game.resource('house',0,null, function(event) {
 event = event || window.event;
 if(game.resources.gold.value > 100*Math.pow(1.1,game.resources.house.value)) {
    game.resources.gold.decrease(100*Math.pow(1.1,game.resources.house.value));
    game.resources.house.increase();
    event.target.innerHTML = "Buy House: " + game.resources.house.format(100*Math.pow(1.1,game.resources.house.value));
 }
},'Buy House')
game.resources.human = new game.resource('human',1,function(){game.resources.human+=Math.round(Math.random(0,game.resources.house));}, null,null)
