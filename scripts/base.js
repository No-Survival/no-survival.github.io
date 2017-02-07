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
