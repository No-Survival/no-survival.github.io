function increase() {
 if(gold > 100*Math.pow(1.1,house-1) {
    gold-=100*Math.pow(1.1,house-1);
    house++;
    document.getElementById("gold").firstChild.innerHTML=gold;
    document.getElementById("house").firstChild.innerHTML=house;
 }
}
window.setInterval(function() {
  gold+=0.1*(1+house);
  document.getElementById("gold").firstChild.innerHTML=gold;
},100);
