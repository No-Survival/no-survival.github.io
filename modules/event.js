module.exports = function(wrapper,title,text,duration,modifiers,chance) {
  this.active = false;
  this.remaining = 0;
  this.duration = duration;
  this.modifiers = modifiers;
  this.element = document.createElement('div');
  this.element.setAttribute('class','event');
  // TIMER
  this.element.appendChild(document.createElement('p'));
  this.leftover = document.createElement('span');
  this.element.lastChild.appendChild(this.leftover);
  this.element.lastChild.appendChild(document.createElement('span'));
  this.element.lastChild.lastChild.appendChild(document.createTextElement('/'+this.duration));
  // TITLE
  this.element.appendChild(document.createElement('h3'));
  this.element.lastChild.appendChild(document.createTextNode(title));
  // TEXT
  this.element.appendChild(document.createElement('p'));
  this.element.lastChild.appendChild(document.createTextNode(title));
  wrapper.appendChild(this.element);
  this.onTick = function(){
    if(this.active) {
      for(var c=0;c<this.modifiers.length;c++) {
        game.modifiers.add(this.modifiers[c]);
      }
      this.remaining--;
      this.active=this.remaining>0;
    } else if(Math.random()<this.chance/1000) {
      this.active=true;
      this.remaining = this.duration;
    }
    this.leftover.innerHTML = this.remaining;
    this.element.setAttribute('style','display:'+(this.active?'block':'none')+';');
  }
}
