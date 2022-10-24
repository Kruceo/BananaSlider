let banana = [];

const evt = new Event("show");
function initAllSliders() {
  stopAllSliders();
  banana = [];
  const sliderList = document.querySelectorAll("slider");
  if (sliderList.length > 0) {
    for (var slider of sliderList) {
      startSlider(slider);
     
    }
  } else {
    console.warn(
      "[banana-slider] No sliders here!\nMay you need help try check banana.kruceo.com\nCase you don't like this message, add banana.mess = false"
    );
  }
}

function startSlider(yourSlider) {
  let animationSpeed = 500;
  let cooldown = 200;
  let hover = "stop";
  let movement = "left";
  let initial = 0;
  
  let animationCurve = "";
  let direction = "forward";
  
  let slider = yourSlider;
  cooldown = slider.getAttribute("cooldown") ?? 2000;
  animationSpeed = slider.getAttribute("speed") ?? 500;
  hover = slider.getAttribute("hover") ?? "stop";
  movement = slider.getAttribute("movement") ?? "horizontal";
  initial = slider.getAttribute("initial") ?? 0;
  animationCurve = slider.getAttribute("curve")??'cubic-bezier(.49,.07,.57,.94)';
  direction = slider.getAttribute("direction")??"forward";
  if (!slider.querySelector("slider-frame")) {
    slider.innerHTML = "<slider-frame>" + slider.innerHTML + "</slider-frame>";
  }
  let frame = slider.querySelector("slider-frame");
  let itens = [...frame.querySelectorAll("slide")];
  itens.forEach((item) => {
    if (item.getAttribute("onShow") != null) {
      item.addEventListener("show", (e) => {
        try {
          let onSHowFunction = new Function(item.getAttribute("onShow"));
          onSHowFunction();
        } catch (error) {
          console.error(
            "[banana-slider] " +
              e.target.localName +
              " - " +
              e.target.id +
              " Slider onShow attribute error \n" +
              error
          );
        }
      });
    }
  });
  let index = initial;
  let max = itens.length;

  slider.style.setProperty("overflow", "hidden");
  slider.style.setProperty("display", "block");

  switch (movement) {
    case "horizontal":
      frame.style =
        "position: relative;left: 0%;display: grid;grid-auto-flow: column;grid-auto-columns: 1fr;--total-items:" +
        itens.length +
        ";width: calc(var(--total-items) * 100%);--index: " +
        initial +
        ";--speed: " +
        animationSpeed +
        "ms;left: calc(var(--index)*-100%);transition: left var(--speed) "+animationCurve;
      break;
    case "vertical":
      slider.style.setProperty("height", itens.sort((a,b)=>a.offsetHeight - b.offsetHeight)[itens.length - 1].offsetHeight *1.5 + 'px' );
      itens.forEach((item)=>item.style.setProperty("height", itens.sort((a,b)=>a.offsetHeight - b.offsetHeight)[itens.length - 1].offsetHeight*1.5 + 'px' ));
      frame.style =
        "position: relative;top: 0%;display: flex;flex-direction: column;grid-auto-row: 1fr;--total-items:" +
        itens.length +
        ";--coef: 0"+
        ";height: calc(var(--total-items) * 100%)"+
        ";--index: " + initial +
        ";--speed: " + animationSpeed +
        ";ms;top: calc(var(--index)*-100%)"+
        ";transition: top var(--speed) "+animationCurve;
      break;
  }
  let loop = {};
  if (cooldown > 0) {
      loop = setLoop(() => {
      loop.delay = itens[index].getAttribute("cooldown") ?? cooldown;
      itens[index].dispatchEvent(evt);
      frame.style.setProperty("--index", index);
      if(direction == 'backward')index--;
      else {index++;}
      if (index > max - 1) {
        index = 0;
      }if (index > max - 1) {
        index = 0;
      }
      if(index < 0)
      {
        index = max - 1;
      }
    }, itens[index].getAttribute("cooldown")??cooldown);
  }
  let currentIndex = 0;
  switch (hover) {
    case "stop":
      slider.addEventListener("mouseover",()=>loop.stop());
      slider.addEventListener("mouseout" ,()=>loop.start());
      break;
    case "add":
      currentIndex = frame.style.getPropertyValue("--index");
      slider.addEventListener(
        "mouseover",
        function (event) {
          frame.style.setProperty("--index", currentIndex + 1);
        },
        true
      );
      slider.addEventListener(
        "mouseout",
        function (event) {
          frame.style.setProperty("--index", currentIndex);
        },
        true
      );
      break;
  }
  registerSlider(slider, loop);
}

function registerSlider(element, thread) {
  let name =
    element.getAttribute("id") || "slider" + Object.keys(banana).length;
  banana[name] = {
    el: element,
    thread: thread,
    name: name,
    tp: (newIndex) => {
      goToSlide(element, newIndex);
    },
    move: (value) => {
      moveSlider(element, value);
    },
    getIndex: () => {
      return parseInt(
        element.querySelector("slider-frame").style.getPropertyValue("--index")
      );
    },
  };
}

function stopAllSliders() {
  //console.log("stop all")
  const keys = Object.keys(banana);
  keys.forEach((each)=>
  {
    banana[each].thread.stop();
    //console.log(banana[each].name +" stopped" )
  });

}
function restartAllSliders() {
 // console.log("restart all")
  const keys = Object.keys(banana);
  keys.forEach((each)=>
  {
    banana[each].thread.start();
    //console.log(banana[each].name +" restarted" )
  });

}
async function moveSlider(yourSliderId, value) {
  const slider = yourSliderId.getElementsByTagName("slider-frame")[0];
  const max = Number.parseInt(slider.style.getPropertyValue("--total-items"));
  const index = Number.parseInt(slider.style.getPropertyValue("--index"));
  var addValue = value;
  if (!value) {
    addValue = 1;
  }
  if (index == 0 && value < 0) {
    addValue = 0;
  }
  if (index >= max - 1 && value > 0) {
    addValue = -(max - 1);
  }

  slider.style.setProperty("--index", index + addValue);
}
async function goToSlide(yourSliderId, value) {
  const slider = yourSliderId.getElementsByTagName("slider-frame")[0];
  const max = Number.parseInt(slider.style.getPropertyValue("--total-items"));
  var addValue = value;
  if (!value) {
    addValue = 0;
  }
  if (addValue < 0) {
    addValue = 0;
  }
  if (addValue > max - 1) {
    addValue = max - 1;
  }

  slider.style.setProperty("--index", addValue);
}
function setLoop(func, initialDelay) {
  let thisLoop = {
    delay: initialDelay,
    start: () => {
      thisLoop.stopped = false;
      setTimeout(() => {
        if (!thisLoop.stopped) {
          func();
          thisLoop.start(thisLoop.delay);
          return;
        }
      }, thisLoop.delay);
    },
    stopped: false,
    stop: () => {
      thisLoop.stopped = true;
    },
  };
  thisLoop.start();
  return thisLoop;
}

