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
document.querySelectorAll('.call-input').forEach(element => {
    element.addEventListener('blur', function(){
        if(this.value.length == 0){
            this.nextElementSibling.classList.remove('active-input');
        }
    })
    element.addEventListener('focusin', function(){
        this.nextElementSibling.classList.add('active-input')
    })
})