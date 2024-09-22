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
        // remove dir-content class show except contains dir-root class
        if (dirContent.classList.contains('show')) {  // add `&& !dirContent.classList.contains('dir-root')` to also hide dir-root
            dirContent.classList.remove('show')
        } 
        // toggle root-dir
        if (dirContent.classList.contains('dir-root')) {
            dirContent.classList.toggle('show')
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


// read json file
const getData = async (path) => {
    const res = await fetch(path)
    const data = await res.json()
    return data
}


// create nested list, return ul
const createNestedList = (data = []) => {
    // create ul as wrapper
    const ul = document.createElement('ul')
    ul.classList.add('dir-content')

    // iterate the list to create dir-content
    data.forEach(item => {
        // create li as wrapper
        const li = document.createElement('li')

        // base case: if data type is string, add as innerHTML to li (for files)
        if (typeof item === 'string') {
            li.innerHTML = `
                <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e8eaed"><path d="M240-80q-33 0-56.5-23.5T160-160v-640q0-33 23.5-56.5T240-880h320l240 240v480q0 33-23.5 56.5T720-80H240Zm280-520v-200H240v640h480v-440H520ZM240-800v200-200 640-640Z"/></svg>
                <span>${item}</span>
            `
        }
        // recursive case: if data is object, create nested list
        else if (typeof item === 'object') {
            // iterate the list in the object
            for (const key in item) {
                // add as innerHTML to li (for folder name)
                li.innerHTML = `
                    <div class="dir-name">
                        <button onclick="showContent(this)">
                            <svg class="icon-closed" xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e8eaed"><path d="M160-160q-33 0-56.5-23.5T80-240v-480q0-33 23.5-56.5T160-800h240l80 80h320q33 0 56.5 23.5T880-640v400q0 33-23.5 56.5T800-160H160Zm0-80h640v-400H447l-80-80H160v480Zm0 0v-480 480Z"/></svg>
                            <svg class="icon-open" xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e8eaed"><path d="M160-160q-33 0-56.5-23.5T80-240v-480q0-33 23.5-56.5T160-800h240l80 80h320q33 0 56.5 23.5T880-640H447l-80-80H160v480l96-320h684L837-217q-8 26-29.5 41.5T760-160H160Zm84-80h516l72-240H316l-72 240Zm0 0 72-240-72 240Zm-84-400v-80 80Z"/></svg>
                            <span>${key}</span>
                        </button>
                    </div>
                `
                // run createNestedList
                const childrenUl = createNestedList(item[key])
                // append the nested list to li 
                li.appendChild(childrenUl)
            }
        } 

        // append root list to ul
        ul.appendChild(li)
    });
    
    // return created nested list
    return ul
}

// display in the html
const display = async () => {
    // read file json
    const payload = await getData('./data.json')
    const items = payload["items"]

    // create nested list
    const nestedList = createNestedList(items)

    // append nested list to dir-structure
    const treeStructure = document.querySelector('.dir-structure')
    treeStructure.appendChild(nestedList)

    // prevent dir-root to hide
    treeStructure.lastChild.classList.add('show', 'dir-root')
}

// run the function when browser loads
display()