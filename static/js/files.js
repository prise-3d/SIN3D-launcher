const toggleVisible = ele => ele.style.display = ele.style.display === 'none' ? 'block' : 'none'
const toggleClass = (ele, class1, class2) => ele.className = ele.className === class1 ? class2 : class1

window.addEventListener('DOMContentLoaded', () => {
    // Display list of files from day folder
    // need to parse as `Array`
    Array.from(document.getElementsByClassName('files-list')).forEach(item => {
        item.addEventListener('click', event => {
            event.preventDefault()
            currentElem = event.currentTarget

            // get list element
            let filePath = currentElem.getAttribute('data-redirect-path')

            // use of base url obtained from Django using `{{BASE}}`
            window.location = baseUrl + 'links?filename=' + filePath
        })
    })
})
