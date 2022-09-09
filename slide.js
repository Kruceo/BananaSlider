var slide;
slider();
async function slider() {

    let doc = document.querySelector('slider');

    let itens = doc.querySelectorAll('slide')

    var index = 0;
    var max = itens.length //doc.style.getPropertyValue('--total-items');

    console.log(itens.length)

    doc.style = " position: relative;left: 0%;display: grid;grid-auto-flow: column;grid-auto-columns: 1fr;--total-items:"+(itens.length)+";width: calc(var(--total-items) * 100%);--selected-item: 2;left: calc(var(--selected-item)*-100%);transition: left 1s;"
    var millisecondsToWait = 1000;

    thread = setInterval(function () {
        ;
        doc.style.setProperty('--selected-item', index);
        index++;

        if (index > max - 1) {
            index = 0;
        }
    }, millisecondsToWait, 100);


}
async function stopSlider() {
    clearInterval(thread);
}