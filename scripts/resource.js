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
