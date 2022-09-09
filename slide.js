var thread;
startSlider();
async function startSlider() {

    let slider = document.querySelector('slider');
    let itens = slider.querySelectorAll('slide');
    slider.outerHTML = '<slider-frame>'+slider.outerHTML+'</slider-frame>';
    slider = document.querySelector('slider')
    //slider.outerHTML += "<slider-frame></slider-frame>";
    let frame = document.querySelector('slider-frame');
    var index = 1;
    var max = itens.length //slider.style.getPropertyValue('--total-items');

    console.log(slider)

    slider.style = "position: relative;left: 0%;display: grid;grid-auto-flow: column;grid-auto-columns: 1fr;--total-items:"+(itens.length)+";width: calc(var(--total-items) * 100%);--index: 0;left: calc(var(--index)*-100%);transition: left 1s;"
    var millisecondsToWait = 2000;

    thread = setInterval(function() {
        ;
        slider.style.setProperty('--index', index);
        index++;

        if (index > max - 1) {
            index = 0;
        }
    }, millisecondsToWait);


}
async function stopSlider() {
    clearInterval(thread);
}