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
    else
    {
        console.warn('[banana-slider] No sliders here!\nIf you need help try check banana.kruceo.com\nCase you don\'t like this message, add banana.mess = false');
    }
}

async function startSlider(yourSlider) {

    let slider = yourSlider;
    if (slider.getAttribute('cooldown')) {
        cooldown = slider.getAttribute('cooldown')
    }
    if (slider.getAttribute('speed')) {
        animationSpeed = slider.getAttribute('speed')
    }
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
    slider.style.setProperty("display", "block");
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
    array.forEach(element => {
        clearInterval(element);
    });

}