 
 
window.addEventListener('load', () => {
    document.querySelectorAll('.question-header').forEach(element => {
        element.addEventListener('click', function(){
            this.parentElement.classList.toggle('question-item-active')
        })
    })
})