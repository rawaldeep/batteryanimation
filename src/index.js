(function() {
  'use strict';

  var battery;

  function toTime(sec) {
    sec = parseInt(sec, 10);

    var hours = Math.floor(sec / 3600),
        minutes = Math.floor((sec - (hours * 3600)) / 60),
        seconds = sec - (hours * 3600) - (minutes * 60);

    if (hours < 10) { hours   = '0' + hours; }
    if (minutes < 10) { minutes = '0' + minutes; }
    if (seconds < 10) { seconds = '0' + seconds; }

    return hours + ':' + minutes;
  }

  function readBattery(b) {
    battery = b || battery;

    var percentage = parseFloat((battery.level * 100).toFixed(2)) + '%';
        // fully,
        // remaining;
    
    let chargingbubbles = document.querySelector('.g-bubbles');
   

    if (battery.charging) {
      console.log('charging');
      chargingbubbles.style.animation = 'none';
      chargingbubbles.style.opacity = '1';
      let bubbles = chargingbubbles.querySelectorAll('li');
      for(let i=0; i<bubbles.length; i++){
        (function (i) {
          setTimeout(function () {
            bubbles[i].style.animation= 'moveToTop 6s ease-in-out -1.092s infinite';
          }, 1000*i);
        })(i);
      
        document.querySelector('.g-contrast').removeAttribute("style");
      }
    } 

    if (!battery.charging ) {
      let bubbles = chargingbubbles.querySelectorAll('li');
      let stopbubbles = new Promise((resolve, reject)=>{
        for(let i=0; i<bubbles.length; i++){
            (function (i) {
              setTimeout(function () {
                bubbles[i].style.animation= 'none';
              }, 500*i);
            })(i);
      
        }
      })

      stopbubbles.then(

          setTimeout(function(){
            chargingbubbles.style.animation = 'hideCharger 6s ease-in-out -1.092s 1';
          },6000),
          setTimeout(function(){
            chargingbubbles.style.opacity = '0';
            let chargeleft = parseInt(percentage);
            if(chargeleft > 50){
              document.querySelector('.g-contrast').style.animation = 'none'
              document.querySelector('.g-contrast').style.filter = 'contrast(15) hue-rotate(0)'

            }else if(chargeleft <=50 && chargeleft > 25){
              document.querySelector('.g-contrast').style.animation = 'none'
              document.querySelector('.g-contrast').style.filter = 'contrast(15) hue-rotate(-75deg)'
            }else if(chargeleft < 25){
              document.querySelector('.g-contrast').style.animation = 'none'
              document.querySelector('.g-contrast').style.filter = 'contrast(15) hue-rotate(-120deg)'
            }else{
              console.log('cannot get charge')
            }
          },10000)
          
        
        
       )}

    // document.styleSheets[0].insertRule('.battery:before{width:' + percentage + '}', 0);
    document.querySelector('.battery-percentage').innerHTML = percentage;
    // document.querySelector('.battery-status').innerHTML = battery.charging ? 'Adapter' : 'Battery';
    // document.querySelector('.battery-level').innerHTML = percentage;
    // document.querySelector('.battery-fully').innerHTML = fully;
    // document.querySelector('.battery-remaining').innerHTML = remaining;
    

  }

  if (navigator.battery) {
    readBattery(navigator.battery);

  } else if (navigator.getBattery) {
    navigator.getBattery().then(readBattery);

  } else {
    document.querySelector('.not-support').removeAttribute('hidden');
  }

  window.onload = function () {
    battery.addEventListener('chargingchange', function() {
      readBattery();
    });
    if (!battery.charging ) {
      let percentage = parseFloat((battery.level * 100).toFixed(2));
      console.log('not charging');
      let chargingbubbles = document.querySelector('.g-bubbles');
      let bubbles = chargingbubbles.querySelectorAll('li');
      for(let i=0; i<bubbles.length; i++){
        bubbles[i].style.animation= 'none';
        };
    chargingbubbles.style.opacity = '0';
    let chargeleft = parseInt(percentage);
    if(chargeleft > 50){
      document.querySelector('.g-contrast').style.animation = 'none'
      document.querySelector('.g-contrast').style.filter = 'contrast(15) hue-rotate(0)'

    }else if(chargeleft <=50 && chargeleft > 25){
      document.querySelector('.g-contrast').style.animation = 'none'
      document.querySelector('.g-contrast').style.filter = 'contrast(15) hue-rotate(-75deg)'
    }else if(chargeleft < 25){
      document.querySelector('.g-contrast').style.animation = 'none'
      document.querySelector('.g-contrast').style.filter = 'contrast(15) hue-rotate(-120deg)'
    }else{
      console.log('cannot get charge')
    }
      }

    battery.addEventListener("levelchange", function() {
      readBattery();
    });
  };
}());
