module.exports = function() {
  this.modifiers = {};
  this.add = function(modifier) {
    this.modifiers[modifier.resource] = this.modifiers[modifier.resource]?this.modifiers[modifier.resource]:{};
    this.modifiers[modifier.resource].early = this.modifiers[modifier.resource].early?this.modifiers[modifier.resource].early:[];
    this.modifiers[modifier.resource].late = this.modifiers[modifier.resource].late?this.modifiers[modifier.resource].late:[];
    this.modifiers[modifier.resource][modifier.early?'early':'late'].push(modifier);
    this.modifiers[modifier.resource][modifier.early?'early':'late'].sort(function(a,b){return a.priority-b.priority;});
  };
  this.get = function (resource, base) {
    var applyList = function(value,list) {
      for(var e=list.length-1;e>-1;e--) {
        value = list[e].modify(value*list[e].value);
      }
      return value;
    }
    if(!this.modifiers[resource]) {
      return value;
    }
    return applyList(applyList(value,this.modifiers[resource].early),this.modifiers[resource].late);
  };
  this.clear = function() {
    this.modifiers = {};
  };
};
