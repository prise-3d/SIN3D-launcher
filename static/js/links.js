const links_data = JSON.parse(links.replace(/&quot;/g, '"'))


function loadDataList(elem, list){
    userId = elem.value

    if (userId){
        let currentLinks = links_data[userId]
        
        // remove event listener of each element by default
        if (list.children.length > 0){
            for (var element of list.children){
                element.removeEventListener('click', elemClick)
            }
        }

        list.innerHTML = ""
    
        currentLinks.forEach((element, index) => {
    
            if (element.length > 0){
    
                data = element.split(':::')

                // add of div elements
                rowDiv = document.createElement('div')
                rowDiv.setAttribute('class', 'row')

                rowDivLeft = document.createElement('div')
                rowDivLeft.setAttribute('class', 'col-md-11')

                rowDivRight = document.createElement('div')
                rowDivRight.setAttribute('class', 'col-md-1')

                // create link
                currentLink = document.createElement('a')
                currentLink.setAttribute('href', data[1])
                currentLink.innerHTML = 'Link ' + (index + 1) + ': ' + data[0]
                
                // add of elements
                rowDivLeft.appendChild(currentLink)
                rowDiv.appendChild(rowDivLeft)
                rowDiv.appendChild(rowDivRight)

                currentLi = document.createElement('li')
                currentLi.setAttribute('class', 'list-group-item')
                currentLi.appendChild(rowDiv)

                list.appendChild(currentLi)
            }
        });
    }
}

function elemClick(event){
    event.preventDefault()
    
    currentElem = event.currentTarget
    
    // Add <i class="fas fa-check"></i>
    divLeft = currentElem.getElementsByClassName('col-md-1')[0]

    if (divLeft.children.length <= 0){
        iconElem = document.createElement('li')
        iconElem.setAttribute('class', 'fas fa-check')
        divLeft.appendChild(iconElem)

        // update `li` class element
        currentElem.setAttribute('class', 'list-group-item already-used')
    }

    // retrieve and open link in new tab
    link = currentElem.getElementsByTagName('a')[0]
    url = link.getAttribute('href')
    var win = window.open(url, '_blank');
    win.focus();
}

window.addEventListener('DOMContentLoaded', () => {
    // Display list of files from day folder
    // need to parse as `Array`

    const inputElement = document.getElementsByName('userId')[0]
    const linksList = document.getElementById('links-list')

    loadDataList(inputElement, linksList)
    
    inputElement.addEventListener('change', event => {
        event.preventDefault()
        currentElem = event.currentTarget

        loadDataList(currentElem, linksList)

        for (var element of linksList.children){
            element.addEventListener('click', elemClick)
        }
    })
})
