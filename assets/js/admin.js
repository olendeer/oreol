document.querySelectorAll('.admin-main').forEach(element => {
    element.addEventListener('click', function(){
        this.classList.toggle('admin-main-active')
    })
})
document.querySelectorAll('.admin-list').forEach(element => {
    element.addEventListener('mouseleave', function(){
        this.parentElement.classList.remove('admin-main-active')
    })
})
document.querySelectorAll('.admin-list-item').forEach(element => {
    element.addEventListener('click', function(){
        this.parentElement.previousElementSibling.textContent = this.textContent;
        this.parentElement.previousElementSibling.setAttribute('type', this.getAttribute('type'))
    })
})
let saveMain = document.querySelector('.edit-navigation > .save-main');
if(saveMain){
    saveMain.addEventListener('click', function(){
        let data = {
            id : document.querySelector('.editing-element').getAttribute('id'),
            name : [
                document.querySelector('#name-ru').value,
                document.querySelector('#name-ua').value,
            ],
            url : document.querySelector('#url').value,
            sublink: document.querySelector('#sublink').value
        }
        fetch('/saveLink', {
            method: 'post',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data)
        })
        window.location.href = '/admin/main';
    })
}

let saveCharts = document.querySelector('.edit-navigation > .save-charts');
if(saveCharts){
    saveCharts.addEventListener('click', function(){
        let data = {
            id: document.querySelector('.edit-block').getAttribute('id'),
            phone1: document.querySelector('#phone1').value,
            phone2: document.querySelector('#phone2').value,
            phone3: document.querySelector('#phone3').value,
            chart:  document.querySelector('#chart').value,
            email:  document.querySelector('#email').value,
            address1:{
                name   : document.querySelector('#address1').textContent,
                street : document.querySelector('#street1').value,
                city   : document.querySelector('#city1').value,
                region : document.querySelector('#region1').value,
            },
            address2:{
                name   : document.querySelector('#address2').textContent,
                street : document.querySelector('#street2').value,
                city   : document.querySelector('#city2').value,
                region : document.querySelector('#region2').value,
            }
        }
        fetch('/saveCharts', {
            method: 'post',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data)
        })
        window.location.href = '/admin/charts';
    })
}
document.querySelectorAll('.edit-navigation > .save-mark').forEach(element => {
    element.addEventListener('click', function(){
        let data = {
            id: this.parentElement.parentElement.getAttribute('id'),
            type: this.parentElement.parentElement.getAttribute('type'),
            title : this.parentElement.parentElement.querySelector('.title').value,
            name : this.parentElement.parentElement.querySelector('#name') ? this.parentElement.parentElement.querySelector('#name').value : '',
            price : this.parentElement.parentElement.querySelector('.price') ? this.parentElement.parentElement.querySelector('.price').value : '',
            categorie: this.parentElement.parentElement.querySelector('.categorie') ? this.parentElement.parentElement.querySelector('.categorie').textContent : ''
        }
        fetch('/saveMark', {
            method: 'post',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data)
        })
        window.location.href = '/admin/marks';
    });
});

let createMark = document.querySelector('.edit-navigation > .create-mark');
if(createMark){
    createMark.addEventListener('click', function(){
        let uploadFile = this.parentElement.parentElement.querySelector('#image').files[0];
        let data = new FormData();
        data.append('image', uploadFile);
        data.append('type', this.parentElement.parentElement.querySelector('.mark-list-item-active').getAttribute('type'));
        data.append('typeName', this.parentElement.parentElement.querySelector('.mark-list-item-active').textContent);
        data.append('title', this.parentElement.parentElement.querySelector('.title').value);
        data.append('name', this.parentElement.parentElement.querySelector('#name').value || '');
        data.append('price', this.parentElement.parentElement.querySelector('#price').value || '');
        data.append('categorie', this.parentElement.parentElement.querySelector('.categorie') ? this.parentElement.parentElement.querySelector('.categorie').textContent : '');

        fetch('/createMark', {
            method: 'post',
            body: data
        })
        window.location.href = '/admin/marks';
    })
}

document.querySelectorAll('.edit-navigation > .save-slide').forEach(element => {
    element.addEventListener('click', function(){
        let data = {
            id: this.parentElement.parentElement.getAttribute('id'),
            name : this.parentElement.parentElement.querySelector('#name') ? this.parentElement.parentElement.querySelector('#name').value : '',
            price : this.parentElement.parentElement.querySelector('.price') ? this.parentElement.parentElement.querySelector('.price').value : '',
            url: this.parentElement.parentElement.querySelector('.url') ? this.parentElement.parentElement.querySelector('.url').value : ''
        }
        fetch('/saveSlide', {
            method: 'post',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data)
        })
        window.location.href = '/admin/slider';
    });
});

let createSlide = document.querySelector('.edit-navigation > .create-slide');
if(createSlide){
    createSlide.addEventListener('click', function(){
        let uploadFile = this.parentElement.parentElement.querySelector('#image').files[0];
        let data = new FormData();
        data.append('image', uploadFile);
        data.append('name', this.parentElement.parentElement.querySelector('#name').value || '');
        data.append('price', this.parentElement.parentElement.querySelector('.price').value || '');
        data.append('url', this.parentElement.parentElement.querySelector('.url') ? this.parentElement.parentElement.querySelector('.url').value : '');

        fetch('/createSlide', {
            method: 'post',
            body: data
        })
        window.location.href = '/admin/slider';
    })
}

document.querySelectorAll('.product-categorie').forEach(element => {
    element.addEventListener('click', function(){
        document.querySelectorAll('.product-data').forEach(element => {
            element.style.display = 'none';
        })
        if(this.getAttribute('type') == 'evroruberoid'){
            document.querySelector('.product-data-evroruberoid').style.display = 'block';
        } else if (this.getAttribute('type') == 'mastika'){
            document.querySelector('.product-data-mastika').style.display = 'block';
        }
    })
})

document.querySelectorAll('.edit-navigation > .delete-mark').forEach(element => {
    element.addEventListener('click', function(){
        fetch('/deleteMark', {
            method: 'post',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({id : this.parentElement.parentElement.getAttribute('id')})
        })
        window.location.href = '/admin/marks';
    })
});

document.querySelectorAll('.edit-navigation > .delete-slide').forEach(element => {
    element.addEventListener('click', function(){
        fetch('/deleteSlide', {
            method: 'post',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({id : this.parentElement.parentElement.getAttribute('id')})
        })
        window.location.href = '/admin/slider';
    })
});

let createChar = document.querySelector('.add-new-char');
if(createChar){
    createChar.addEventListener('click', function(){
        let newChar = this.nextElementSibling.cloneNode(true);
        newChar.querySelectorAll('input').forEach(input => {
            input.value = '';
        })
        this.parentElement.append(newChar)
    })
}

document.querySelectorAll('.edit-navigation > .save-product').forEach(element => {
    element.addEventListener('click', function(){
        let data = {
            id: this.parentElement.parentElement.getAttribute('id'),
            name : this.parentElement.parentElement.querySelector('.name').value,
            description : this.parentElement.parentElement.querySelector('.description').value,
            price: this.parentElement.parentElement.querySelector('.price').value,
            typePrice: this.parentElement.parentElement.querySelector('.product-price').textContent,
            label: this.parentElement.parentElement.querySelector('.product-label').textContent,
            rating: this.parentElement.parentElement.querySelector('.rating').value,
            classEvroruberoid: this.parentElement.parentElement.querySelector('.evroruberoid-class') ? this.parentElement.parentElement.querySelector('.evroruberoid-class').textContent : '',
            typeEvroruberoid : this.parentElement.parentElement.querySelector('.evroruberoid-type') ?  this.parentElement.parentElement.querySelector('.evroruberoid-type').textContent : '',
            brendEvroruberoid: this.parentElement.parentElement.querySelector('.evroruberoid-brend') ? this.parentElement.parentElement.querySelector('.evroruberoid-brend').textContent: '',
            weightEvroruberoid: this.parentElement.parentElement.querySelector('.evroruberoid-weight') ? this.parentElement.parentElement.querySelector('.evroruberoid-weight').textContent: '',
            baseEvroruberoid : this.parentElement.parentElement.querySelector('.evroruberoid-base') ? this.parentElement.parentElement.querySelector('.evroruberoid-base').textContent : '',
            widthEvroruberoid: this.parentElement.parentElement.querySelector('.evroruberoid-width') ? this.parentElement.parentElement.querySelector('.evroruberoid-width').textContent : '',
            marksEvroruberoid: this.parentElement.parentElement.querySelector('.evroruberoid-marks') ? this.parentElement.parentElement.querySelector('.evroruberoid-marks').textContent : '',
            typeMastika : this.parentElement.parentElement.querySelector('.mastika-product') ? this.parentElement.parentElement.querySelector('.mastika-product').textContent : '',
            areaMastika : this.parentElement.parentElement.querySelector('.mastika-area') ? this.parentElement.parentElement.querySelector('.mastika-area').textContent : '',
            solventMastika : this.parentElement.parentElement.querySelector('.mastika-solvent') ? this.parentElement.parentElement.querySelector('.mastika-solvent').textContent : '',
            characteristics : JSON.stringify(Array.from(document.querySelectorAll('.product-chars-item')).map(element => {
                return {
                    name : element.querySelector('.char-name').value,
                    value: element.querySelector('.char-value').value
                }
            }))
        }
        fetch('/saveProduct', {
            method: 'post',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data)
        })
        window.location.href = '/admin/products';
    });
});

let createProduct = document.querySelector('.create-product');
if(createProduct){
    createProduct.addEventListener('click', async function(){
        let uploadFile = this.parentElement.parentElement.querySelector('#image').files[0];
        let data = new FormData();
        data.append('image', uploadFile);
        data.append('categorie', this.parentElement.parentElement.querySelector('.product-categorie-active').getAttribute('type'))
        data.append('categorieName', this.parentElement.parentElement.querySelector('.product-categorie-active').textContent)
        data.append('name', this.parentElement.parentElement.querySelector('.name').value);
        data.append('description', this.parentElement.parentElement.querySelector('.description').value);
        data.append('price', this.parentElement.parentElement.querySelector('.price').value);
        data.append('typePrice', this.parentElement.parentElement.querySelector('.product-price').textContent);
        data.append('label', this.parentElement.parentElement.querySelector('.product-label').textContent);
        data.append('rating', this.parentElement.parentElement.querySelector('.rating').value);

        data.append('classEvroruberoid', this.parentElement.parentElement.querySelector('.evroruberoid-class').textContent)
        data.append('typeEvroruberoid', this.parentElement.parentElement.querySelector('.evroruberoid-type').textContent)
        data.append('brendEvroruberoid', this.parentElement.parentElement.querySelector('.evroruberoid-brend').textContent)
        data.append('weightEvroruberoid', this.parentElement.parentElement.querySelector('.evroruberoid-weight').textContent)
        data.append('baseEvroruberoid', this.parentElement.parentElement.querySelector('.evroruberoid-base').textContent)
        data.append('widthEvroruberoid', this.parentElement.parentElement.querySelector('.evroruberoid-width').textContent)
        data.append('marksEvroruberoid', this.parentElement.parentElement.querySelector('.evroruberoid-marks').textContent)

        data.append('typeMastika', this.parentElement.parentElement.querySelector('.mastika-product').textContent)
        data.append('areaMastika', this.parentElement.parentElement.querySelector('.mastika-area').textContent)
        data.append('solventMastika', this.parentElement.parentElement.querySelector('.mastika-solvent').textContent)

        data.append('characteristics', JSON.stringify(Array.from(document.querySelectorAll('.product-chars-item')).map(element => {
            return {
                name : element.querySelector('.char-name').value,
                value: element.querySelector('.char-value').value
            }
        })))

        fetch('/createProduct', {
            method: 'post',
            body: data
        })
        .then(() => {
            window.location.href = '/admin/products';
        })
    })
}

document.querySelectorAll('.edit-navigation > .delete-product').forEach(element => {
    element.addEventListener('click', function(){
        fetch('/deleteProduct', {
            method: 'post',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({id : this.parentElement.parentElement.getAttribute('id')})
        })
        window.location.href = '/admin/products';
    })
});


function uploadPhoto(input){
    let upload_file;
    upload_file = input.files[0];
    let dataPhoto = new FormData();
    dataPhoto.append('image', upload_file);
    dataPhoto.append('id', input.parentElement.parentElement.parentElement.getAttribute('id'));
    fetch('/uploadPhoto', {
        method: 'post',
        body: dataPhoto
    })
    .then(response => {
        return response.text()
    })
    .then(response => {
        input.parentElement.querySelector('img').setAttribute('src', JSON.parse(response).url)
    })
}

function uploadPhotoSlide(input){
    let upload_file = input.files[0];
    let dataPhoto = new FormData();
    dataPhoto.append('image', upload_file);
    dataPhoto.append('id', input.parentElement.parentElement.parentElement.getAttribute('id'));
    fetch('/uploadPhotoSlide', {
        method: 'post',
        body: dataPhoto
    })
    .then(response => {
        return response.text()
    })
    .then(response => {
        input.parentElement.querySelector('img').setAttribute('src', JSON.parse(response).url)
    })
}

function uploadPhotoProduct(input){
    let upload_file = input.files[0];
    let dataPhoto = new FormData();
    dataPhoto.append('image', upload_file);
    dataPhoto.append('id', input.parentElement.parentElement.parentElement.getAttribute('id'));
    fetch('/uploadPhotoProduct', {
        method: 'post',
        body: dataPhoto
    })
    .then(response => {
        return response.text()
    })
    .then(response => {
        input.parentElement.querySelector('img').setAttribute('src', JSON.parse(response).url)
    })
}