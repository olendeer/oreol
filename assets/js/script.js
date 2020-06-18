if(window.innerWidth > 600){
    let anchor = document.querySelector('.description').getBoundingClientRect().top + pageYOffset;
    let filter = document.querySelector('.filter');
    if(filter != null){
        filter.style.minHeight = (+anchor - 160) + 'px';
    }
    document.querySelector('body').addEventListener('resize', function(){
        let anchor = document.querySelector('.description').getBoundingClientRect().top + pageYOffset;
        document.querySelector('.filter').style.minHeight = (+anchor - 160) + 'px'
    })
}

document.querySelector('.mobile-filter-btn').addEventListener('touchend', function(){
    document.querySelector('.filter').classList.toggle('filter-active')
})

document.querySelectorAll('.checkbox-item > *').forEach(element => {
    element.addEventListener('click', function(event){
        this.parentElement.classList.toggle('checkbox-item-active')
        if(this.parentElement.classList.contains('checkbox-item-active')){
            let newFilter = document.createElement('div');
            newFilter.classList.add('active-filter-item')
            newFilter.setAttribute('filter', this.parentElement.parentElement.getAttribute('filter'))
            let newFilterText = document.createElement('span');
            newFilterText.textContent = this.parentElement.querySelector('.label').textContent
            newFilter.append(newFilterText)
            let removeFilter1 = document.createElement('div');
            removeFilter1.classList.add('close1');
            newFilter.append(removeFilter1)
            let removeFilter2 = document.createElement('div');
            removeFilter2.classList.add('close2');
            newFilter.append(removeFilter2)
            document.querySelector('.active-filters').append(newFilter);
            makeQuery('add', this)
        }
        else{
            document.querySelectorAll('.active-filter-item').forEach(element => {
                if(element.textContent == this.parentElement.querySelector('.label').textContent){
                    element.remove();
                    makeQuery('remove', element)
                }
            })
        }
        document.querySelectorAll('.active-filter-item > .close1, .active-filter-item > .close2').forEach(element => {
            element.addEventListener('click', function(event){
                event.stopPropagation()
                event.stopImmediatePropagation()
                this.parentElement.remove();
                makeQuery('remove', this.parentElement)
                document.querySelectorAll('.checkbox-item-active > .label').forEach(checkbox => {
                    if(checkbox.textContent == this.parentElement.querySelector('span').textContent){
                        checkbox.parentElement.classList.remove('checkbox-item-active')
                    }
                })
            })
        });
    })
})

document.querySelectorAll('.sort-list-item').forEach(item => {
    item.addEventListener('click', function(){
        if(item.textContent == 'По популярности'){
            sort = {
                rating : -1
            }
        }
        else if(item.textContent == 'По цене'){
            sort = {
                price : 1
            }
        }
        execQuery(query, sort)
    })
})

window.addEventListener('scroll', function(){
    if((document.querySelector('.filter').clientHeight - (document.querySelector('.mobile-filter-btn').getBoundingClientRect().top + this.pageYOffset + 32)) < 0){
        document.querySelector('.mobile-filter-btn').style.visibility = 'hidden'
    }
    else{
        document.querySelector('.mobile-filter-btn').style.visibility = 'visible'
    }

})
let query = {};
let sort = {};
let templateProduct = document.querySelector('.preview-item').cloneNode(true)
function makeQuery(operation, element){
    query.categorie = document.querySelector('.filter').getAttribute('categorie')
    if(operation == 'add'){
        let filterName = element.parentElement.parentElement.getAttribute('filter');
        if(query[filterName] == undefined){
            query[filterName] = {$in: [element.parentElement.querySelector('.label').textContent]}
        }else{
            query[filterName].$in.push(element.parentElement.querySelector('.label').textContent)
        }
    }
    else if(operation == 'remove'){
        let filterName = element.getAttribute('filter');
        query[filterName].$in.splice(query[filterName].$in.indexOf(element.querySelector('span').textContent), 1)
        if(query[filterName].$in.length == 0){
            delete query[filterName]
        }
    }

    execQuery(query, sort)
}
function renderProducts(products){
    console.log(products)
    let productsContainer = document.querySelector('.filter-items');
    productsContainer.innerHTML = '';
    if(products.length <= 12){
        if(document.querySelector('.filter-items-navigation')){
            document.querySelector('.filter-items-navigation').style.display = 'none'
        }
    }
    else{
        products = products.slice(0, 12)
        document.querySelector('.filter-items-navigation').style.display = 'flex'
    }
    products.forEach(product => {
        let newProduct = templateProduct.cloneNode(true);
        newProduct.querySelectorAll('.sale, .new').forEach(label => {
            label.remove()
        })
        if(product.label == 'Акция'){
            let label = document.createElement('div')
            label.classList.add('sale')
            label.textContent = 'Акция'
            newProduct.querySelector('.wrap-photo').append(label)
        }
        else if(product.label == 'Новинка'){
            let label = document.createElement('div')
            label.classList.add('new')
            label.textContent = 'Новинка'
            newProduct.querySelector('.wrap-photo').append(label)
        }
        newProduct.querySelector('.wrap-photo > img').setAttribute('src', product.img)
        newProduct.querySelector('.product-name').textContent = product.name;
        newProduct.querySelector('.item-price').textContent = product.price;
        newProduct.querySelector('.item-count').textContent = product.typePrice;
        newProduct.querySelector('.rating-count').textContent = product.rating;
        newProduct.querySelector('.about-product').setAttribute('href', '/' + product.categorie + '/' + product._id)
        productsContainer.append(newProduct)
    })
    if(window.innerWidth > 600){
        let anchor = document.querySelector('.description').getBoundingClientRect().top + pageYOffset;
        document.querySelector('.filter').style.minHeight = (+anchor - 160) + 'px'
    }
}

function execQuery(query, sort){
    fetch('/getProducts', {
        method: 'post',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({find: query, sort: sort})
    })
    .then(products => products.text())
    .then(products => {
        renderProducts(JSON.parse(products))
    })
}
