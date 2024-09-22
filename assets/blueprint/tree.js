// This is just a blueprint function for creating nested list

// create nested list function
const createNestedList = (data = []) => {
    // create ul as wrapper
    const ul = document.createElement('ul')

    // iterate the list to create dir-content
    data.forEach(item => {
        // create li as wrapper
        const li = document.createElement('li')

        // base case: if data type is string, add as innerHTML to li (for files)
        if (typeof item === 'string') {
            li.textContent = item
        }
        // recursive case: if data is object, create nested list
        else if (typeof item === 'object') {
            // iterate the list in the object
            for (const key in item) {
                // add as innerHTML to li (for folder name)
                li.textContent = key
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