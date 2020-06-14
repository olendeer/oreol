let owlStart = $(".slider-roller");
owlStart.owlCarousel({
    items: 1,
    margin: 20,
    responsive: {
        0: {
            margin: 10,
        },
        600: {
            margin: 20,
        }
    },
    onTranslated: (event) => {
        document.querySelector('.slider-nav > span').textContent = '0' + (event.item.index + 1);
        console.log(event.item.index)
    }
});

document.querySelectorAll('.slider-nav > span')[2].textContent = '0' + document.querySelectorAll('.slide').length
