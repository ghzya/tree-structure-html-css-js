// show dir-content
const showContent = (button) => {

    // toggle dir-content
    button.parentElement.nextSibling.nextSibling.classList.toggle('show')

    // toggle icon-closed & icon-open
    button.childNodes[1].classList.toggle('hide')
    button.childNodes[3].classList.toggle('show')

}


// hide all dir-content & change the icon folder to closed 
const closeAll = document.getElementById('dir-root')
closeAll.addEventListener('click', () => {

    // hide all dir-content
    const dirContents = document.querySelectorAll('.dir-content')
    dirContents.forEach(dirContent => {
        if (dirContent.classList.contains('show')) {
            dirContent.classList.remove('show')
        }        
    })
    
    // change icon folder to closed
    const dirNameBtns = document.querySelectorAll('button')
    dirNameBtns.forEach(dirNameBtn => {
        // hide icon-closed & show icon-open
        dirNameBtn.childNodes[1].classList.remove('hide');
        dirNameBtn.childNodes[3].classList.remove('show');        
    })
    
})