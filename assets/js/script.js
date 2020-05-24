let anchor = document.querySelector('.description').getBoundingClientRect().top + pageYOffset;
let filter = document.querySelector('.filter');
if(filter != null){
    filter.style.height = (+anchor - 160) + 'px';
}
document.querySelector('body').addEventListener('resize', function(){
    let anchor = document.querySelector('.description').getBoundingClientRect().top + pageYOffset;
    document.querySelector('.filter').style.height = (+anchor - 160) + 'px'
})


document.querySelectorAll('.checkbox-item > *').forEach(element => {
    element.addEventListener('click', function(event){
        this.parentElement.classList.toggle('checkbox-item-active')
        if(this.parentElement.classList.contains('checkbox-item-active')){
            let newFilter = document.createElement('div');
            newFilter.classList.add('active-filter-item')
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
        }
        else{
            document.querySelectorAll('.active-filter-item').forEach(element => {
                if(element.textContent == this.parentElement.querySelector('.label').textContent){
                    element.remove();
                }
            })
        }
        document.querySelectorAll('.active-filter-item > .close1, .active-filter-item > .close2').forEach(element => {
            element.addEventListener('click', function(){
                this.parentElement.remove();
                document.querySelectorAll('.checkbox-item-active > .label').forEach(checkbox => {
                    if(checkbox.textContent == this.parentElement.querySelector('span').textContent){
                        checkbox.parentElement.classList.remove('checkbox-item-active')
                    }
                })
            })
        });
    })
})

