var threads = [];
var animationSpeed = 250;
var cooldown = 100;
var hover = 'stop'
var animation = 'left'
window.onload = function () {
    const sliderList = document.querySelectorAll("slider")
    if (sliderList.length > 0) {
        for (var slider of sliderList) {
            startSlider(slider)
        }
    }
    else {
        console.warn('[banana-slider] No sliders here!\nIf you need help try check banana.kruceo.com\nCase you don\'t like this message, add banana.mess = false');
    }
}

async function startSlider(yourSlider) {

    let slider = yourSlider;
    if (slider.getAttribute('cooldown')) {
        cooldown = slider.getAttribute('cooldown')
    }
    else
    {
        cooldown = 2000
    }
    if (slider.getAttribute('speed')) {
        animationSpeed = slider.getAttribute('speed')
    }
    else
    {
        animationSpeed = 500
    }
    if (slider.getAttribute('hover')) {
        hover = slider.getAttribute('hover')
    }
    else
    {
        hover = 'stop'
    }
    slider.innerHTML = '<slider-frame>' + slider.innerHTML + '</slider-frame>';
    let frame = slider.querySelector('slider-frame');
    let itens = frame.querySelectorAll('slide');
    var index = 0;
    var max = itens.length //slider.style.getPropertyValue('--total-items');

    console.log(slider);

    slider.style.setProperty("overflow", "hidden");
    slider.style.setProperty("display", "block");
    switch (animation) {
        case 'left':
            frame.style = "position: relative;left: 0%;display: grid;grid-auto-flow: column;grid-auto-columns: 1fr;--total-items:" + (itens.length) + ";width: calc(var(--total-items) * 100%);--index: 0;--speed: " + animationSpeed + "ms;left: calc(var(--index)*-100%);transition: left var(--speed)";
            break;
        case 'right':
            frame.style = "position: relative;left: 0%;display: grid;grid-auto-flow: column;grid-auto-columns: 1fr;--total-items:" + (itens.length) + ";width: calc(var(--total-items) * 100%);--index: 0;--speed: " + animationSpeed + "ms;left: calc(var(--index)*100%);transition: left var(--speed)";
            break;
        case 'up':
            frame.style = "position: relative;top: 0%;--total-items:" + (itens.length) + ";height: calc(var(--total-items) * 100%);--index: 0;--speed: " + animationSpeed + "ms;top: calc(var(--index)*-100%);transition: top var(--speed)";
            break;

        default:
            break;
    }
    if (cooldown > 0) {
        threads[threads.length] = setInterval(function () {
            frame.style.setProperty('--index', index);
            index++;
            if (index > max - 1) {
                index = 0;
            }
        }, cooldown);
    }
    var atualIndex = 0;
    switch (hover) {
        case 'stop':
            
            slider.addEventListener('mouseover', function (event) {
                atualIndex = frame.style.getPropertyValue('--index')
                console.log(atualIndex);
                frame.style.setProperty('--speed', '100000s');
            }, true)
            slider.addEventListener('mouseout', function (event) {
                index = Number.parseInt(atualIndex);
                atualIndex = 0;
                frame.style.setProperty('--speed', animationSpeed + 'ms');
            }, true)
            break;
        case 'add':
            atualIndex = frame.style.getPropertyValue('--index')

            slider.addEventListener('mouseover', function (event) {
                frame.style.setProperty('--index', atualIndex + 1);
            }, true)
            slider.addEventListener('mouseout', function (event) {
                frame.style.setProperty('--index', atualIndex);
            }, true)
            break;

        default:
            break;
    }
}

async function stopAllSlider() {
    array.forEach(element => {
        clearInterval(element);
    });

}