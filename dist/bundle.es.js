let threads = [];
let animationSpeed = 500;
let cooldown = 200;
let hover = "stop";
let animation = "left";
let initial = 0;
let banana = [];
function initAllSliders() {
  banana = [];
  const sliderList = document.querySelectorAll("slider");
  if (sliderList.length > 0) {
    for (var slider of sliderList) {
      let thread = startSlider(slider);
      registerSlider(slider, thread);
    }
  } else {
    console.warn(
      "[banana-slider] No sliders here!\nIf you need help try check banana.kruceo.com\nCase you don't like this message, add banana.mess = false"
    );
  }
}

async function startSlider(yourSlider) {
  let slider = yourSlider;
  cooldown = slider.getAttribute("cooldown") ?? 2000;
  animationSpeed = slider.getAttribute("speed") ?? 500;
  hover = slider.getAttribute("hover") ?? "stop";
  console.log(slider.getAttribute("animation"));
  animation = slider.getAttribute("animation") ?? "horizontal";
  initial = slider.getAttribute("initial") ?? 0;

  if (!slider.querySelector("slider-frame")) {
    slider.innerHTML = "<slider-frame>" + slider.innerHTML + "</slider-frame>";
  }
  let frame = slider.querySelector("slider-frame");
  let itens = [...frame.querySelectorAll("slide")];
  let index = initial;
  let max = itens.length;

  slider.style.setProperty("overflow", "hidden");
  slider.style.setProperty("display", "block");

  switch (animation) {
    case "horizontal":
      frame.style =
        "position: relative;left: 0%;display: grid;grid-auto-flow: column;grid-auto-columns: 1fr;--total-items:" +
        itens.length +
        ";width: calc(var(--total-items) * 100%);--index: " +
        initial +
        ";--speed: " +
        animationSpeed +
        "ms;left: calc(var(--index)*-100%);transition: left var(--speed)";
      break;
    case "vertical":
      slider.style.setProperty("height", "20px");
      frame.style =
        "position: relative;top: 0%;display: flex;flex-direction: column;grid-auto-row: 1fr;--total-items:" +
        itens.length +
        ";height: calc(var(--total-items) * 100%);--index: " +
        initial +
        ";--speed: " +
        animationSpeed +
        "ms;top: calc(var(--index) * -100%);transition: top var(--speed)";
      break;
  }
  if (cooldown > 0) {
    threads[threads.length] = setLoop(() => {
      threads[threads.length - 1].delay =
        itens[index].getAttribute("cooldown") ?? cooldown;
      frame.style.setProperty("--index", index);
      index++;
      if (index > max - 1) {
        index = 0;
      }
    }, itens[index].getAttribute("cooldown") ?? cooldown);
  }
  let currentIndex = 0;
  switch (hover) {
    case "stop":
      slider.addEventListener(
        "mouseover",
        function (event) {
          currentIndex = frame.style.getPropertyValue("--index");
          frame.style.setProperty("--speed", "100000s");
        },
        true
      );
      slider.addEventListener(
        "mouseout",
        function (event) {
          index = Number.parseInt(currentIndex);
          currentIndex = 0;
          frame.style.setProperty("--speed", animationSpeed + "ms");
        },
        true
      );
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
  return threads[threads.length - 1];
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
  };
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

export { banana, initAllSliders, setLoop };
