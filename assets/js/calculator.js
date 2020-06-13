document.querySelectorAll('.block > .menu-list > .menu-list-item').forEach(element => {
    element.addEventListener('click', function(){
        this.parentElement.parentElement.querySelector('.active-list-item-block').setAttribute('data', this.getAttribute('data'))
    })
})

document.querySelectorAll('.weight > .menu-list > .menu-list-item').forEach(element => {
    element.addEventListener('click', function(){
        this.parentElement.parentElement.querySelector('.active-list-item-weight').setAttribute('data', this.getAttribute('data'))
    })
})

document.querySelectorAll('.type > .menu-list > .menu-list-item').forEach(element => {
    element.addEventListener('click', function(){
        this.parentElement.parentElement.querySelector('.active-list-item-type').setAttribute('data', this.getAttribute('data'))
    })
})

document.querySelector('.calculate-btn').addEventListener('click', function(){
    let p = +document.querySelector('input[name="perimetr"]').value;
    let h = +document.querySelector('input[name="heigth"]').value;
    let l = +document.querySelector('.active-list-item-block').getAttribute('data')
    let r = +document.querySelector('.active-list-item-weight').getAttribute('data')
    let priceBlock = +document.querySelector('.active-list-item-type').getAttribute('data').replace(/,/g, '.').replace(/грн/g, '').replace(/ /g, '');
    let blocks = Math.ceil((p * h) / ((l + r) * (0.188 + r)))
    document.querySelector('.count-blocks').textContent = blocks;
    document.querySelector('.input-header-price').textContent = `Цена за ${blocks} блоков`;
    if(priceBlock == 0){
        document.querySelector('.count-price').textContent = '';
    }
    else{
        document.querySelector('.count-price').textContent = Math.ceil(priceBlock * blocks) + ' грн';
    }
})
