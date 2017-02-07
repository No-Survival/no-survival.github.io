(function(list) {
var loader = function(){
  var header=document.getElementsByTagName('head')[0];
  for(var count=0;count<list2Load.length;count++) {
    var sc=document.createElement('script');
    sc.setAttribute('src','/scripts/'+list2Load[count]+'.js');
    sc.setAttribute('async','async');
    header.appendChild(sc);
    var st=document.createElement('link');
    st.setAttribute('href','/styles/'+list2Load[count]+'.css');
    st.setAttribute('rel','stylesheet');
    header.appendChild(st);
  }
};
  window.list2Load = list;
document.onload = loader;
window.onload = loader;
if(document.readyState === 'complete') {
 window.setTimeout(loader,10); 
}
}([
'base','game','resource'
]))
