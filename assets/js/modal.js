document.querySelectorAll('.submenu-btn').forEach(element => {
    element.addEventListener('click', function(){
        this.classList.toggle('submenu-btn-active')
    })
})

document.querySelectorAll('.menu-list').forEach(element => {
    element.addEventListener('mouseleave', function(){
        this.parentElement.classList.remove('submenu-btn-active')
    })
})

document.querySelectorAll('.new-submenu-item').forEach(element => {
    element.addEventListener('click', function(){
        this.parentElement.parentElement.querySelector('span').textContent = this.textContent;
    })
})
document.querySelector('.close-modal').addEventListener('click', function(){
    this.parentElement.parentElement.classList.remove('modal-active')
    this.parentElement.classList.remove('sending-modal')
    document.querySelectorAll('.call-input').forEach(element => {
        element.value = '';
        element.nextElementSibling.classList.remove('active-input');
    })
})

document.querySelectorAll('.call, .certificate-btn').forEach(element => {
    element.addEventListener('click', function(){
        document.querySelector('.call-modal').classList.toggle('modal-active');
        if(this.classList.contains('certificate-btn')){
            document.querySelector('.call-header').textContent = 'Скачивание документации';
            document.querySelector('.call-title').innerHTML = 'Начнется сразу же после того как <br> Вы оставите свои данные';
        }
        else{
            document.querySelector('.call-header').textContent = 'Заполните форму';
            document.querySelector('.call-title').innerHTML = 'И мы перезвоним Вам через 5 минут*';
        }
    })
})


document.querySelectorAll('.placeholder').forEach(element => {
    element.addEventListener('click', function(){
        this.classList.add('active-input')
        this.previousElementSibling.focus();
    })
})
let send = false;
document.querySelectorAll('.call-input').forEach(element => {
    element.addEventListener('blur', function(){
        if(this.value.length == 0){
            this.nextElementSibling.classList.remove('active-input');
        }
    })
    element.addEventListener('input', function(){
        switch(this.getAttribute('name')){
            case 'name':
                if(/[^А-я ]+/.test(this.value)){
                    this.parentElement.classList.add('error-input')
                    send = false;
                }
                else{
                    if(document.querySelector('input[name="phone"]').value.length > 0 && !document.querySelector('input[name="phone"]').parentElement.classList.contains('error-input')){
                        send = true;
                    }
                    this.parentElement.classList.remove('error-input')
                }
                break;
            case 'phone':
                if(/[^\d \(\)\-\+]+/.test(this.value)){
                    this.parentElement.classList.add('error-input');
                    send = false;
                }
                else{
                    if(document.querySelector('input[name="name"]').value.length > 0 && !document.querySelector('input[name="name"]').parentElement.classList.contains('error-input')){
                        send = true;
                    }
                    this.parentElement.classList.remove('error-input')
                }
                break;
            case 'email':
                if(!/@+/.test(this.value)){
                    this.parentElement.classList.add('error-input')
                    send = false;
                    if(this.value.length == 0){
                        this.parentElement.classList.remove('error-input');
                    }
                }
                else{
                    send = true;
                    this.parentElement.classList.remove('error-input')
                }
                break;
        }
        if(send){
            document.querySelector('input[type="submit"]').classList.add('active-submit-btn')
        }
        else{
            document.querySelector('input[type="submit"]').classList.remove('active-submit-btn')
        }
    })
    element.addEventListener('focusin', function(){
        this.nextElementSibling.classList.add('active-input')
    })
})

document.querySelector('input[type="submit"]').addEventListener('click', function(event){
    event.preventDefault();
    if(send){
        this.parentElement.parentElement.classList.add('sending-modal')
        document.querySelector('.call-header').textContent = 'Спасибо';
        document.querySelector('.call-title').innerHTML = 'Данные отправлены';
        //fetch для отправки email
    }
})

document.querySelector('.footer-btn-menu').addEventListener('touchend', function(){
    document.querySelector('footer').classList.toggle('none-active-footer')
});

document.querySelector('.mobile-btn-menu').addEventListener('touchend', function(){
    document.querySelector('.nav-wrap').classList.add('nav-wrap-active')
})
document.querySelector('.mobile-nav-close').addEventListener('touchend', function(){
    document.querySelector('.nav-wrap').classList.remove('nav-wrap-active')
})
