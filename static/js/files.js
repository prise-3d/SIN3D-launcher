const toggleVisible = ele => ele.style.display = ele.style.display === 'none' ? 'block' : 'none'
const toggleClass = (ele, class1, class2) => ele.className = ele.className === class1 ? class2 : class1
const baseUrl    = location.protocol + '//' + window.location.host + '/'
window.addEventListener('DOMContentLoaded', () => {
    // Display list of files from day folder
    // need to parse as `Array`
    Array.from(document.getElementsByClassName('files-list')).forEach(item => {
        item.addEventListener('click', event => {
            event.preventDefault()
            currentElem = event.currentTarget

            // get list element
            let filePath = currentElem.getAttribute('data-redirect-path')

            window.location = baseUrl + 'links?filename=' + filePath
        })
    })
})
