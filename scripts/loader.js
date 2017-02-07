(function(list) {
var loader = function(){
  var header=document.getElementsByTagName('head')[0];
  for(var count=0;count<this.length;count++) {
    var sc=document.createElement('script');
    sc.setAttribute('src','/scripts/'+this[count]+'.js');
    sc.setAttribute('async','async');
    header.appendChild(sc);
    var st=document.createElement('link');
    st.setAttribute('href','/styles/'+this[count]+'.css');
    st.setAttribute('rel','stylesheet');
    header.appendChild(st);
  }
};
loader.bind(list);
document.onload = loader;
window.onload = loader;
window.onload.bind(list);
document.onload.bind(list);
if(document.readyState === 'complete') {
 window.setTimeout(loader,10); 
}
}([
'base'
]))
