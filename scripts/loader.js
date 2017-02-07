(function(list) {
var loader = function(){
  var header=document.getElementsByTagName('head')[0];
  for(var count=0;count<this.length;count++) {
    var sc=document.createElement('script');
    sc.setAttribute('src','/scripts/'+this[count]+'.js');
    header.appendChild(sc);
  }
};
loader.bind(list);
document.onload = loader;
window.onload = loader;
}([
'base'
]))
