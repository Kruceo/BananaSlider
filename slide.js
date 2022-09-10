var threads = [];
var animationSpeed = 1000;
var cooldown = 5000;

window.onload = function () {

    const sliderList = document.querySelectorAll("slider")
    if (sliderList.length > 0) {
        for (var slider of sliderList) {
            startSlider(slider)
        }
    }

}

async function startSlider(yourSlider) {
    let slider = yourSlider;

    slider.innerHTML = '<slider-frame>' + slider.innerHTML + '</slider-frame>';
    //slider = slider.querySelector('slider');
    //document.querySelector('slider');
    //slider.outerHTML += "<div></div>";
    let frame = slider.querySelector('slider-frame');
    let itens = frame.querySelectorAll('slide');
    var index = 0;
    var max = itens.length //slider.style.getPropertyValue('--total-items');

    console.log(slider);

    slider.style.setProperty("overflow", "hidden");
    slider.style.setProperty("display","block");
    frame.style = "position: relative;left: 0%;display: grid;grid-auto-flow: column;grid-auto-columns: 1fr;--total-items:" + (itens.length) + ";width: calc(var(--total-items) * 100%);--index: 0;left: calc(var(--index)*-100%);transition: left " + animationSpeed + "ms;"


    threads[threads.length] = setInterval(function () {
        ;
        frame.style.setProperty('--index', index);
        index++;

        if (index > max - 1) {
            index = 0;
        }
    }, cooldown);

}

async function stopSlider() {
    clearInterval(threads);
}