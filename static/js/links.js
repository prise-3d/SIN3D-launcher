const links_data = JSON.parse(links.replace(/&quot;/g, '"'))
const links_nb_elem = Object.keys(links_data).length
const KEYCODE_ENTER       = 13

const alertDiv = document.getElementsByClassName('alert-danger')[0]

function loadDataList(elem, list){
    userId = elem.value

    if (userId){

        // load and generate CalibrationMeasurement experiment link
        firstLink = links_data[userId][0].split(':::')[1]
        generateCalibrationLink(firstLink)


        // check if nomber of links can let access to userId
        if (userId > (links_nb_elem - 1) || userId < 0){
            alertDiv.setAttribute('style', 'display:block')
        }else{
            alertDiv.setAttribute('style', 'display:none')
        }

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

function generateCalibrationLink(link){

    // get and rebuild b64 link part using current info and calibration experiment
    b64Part = link.split('?q=')[1]
    jsonLinkData = JSON.parse(atob(b64Part))

    jsonLinkData['experimentName'] = 'CalibrationMeasurement'
    jsonLinkData['sceneName'] = '50_shades_of_grey'

    b64LinkData = btoa(JSON.stringify(jsonLinkData)).replace(/[=]/g, '')
    calibrationLink = jsonLinkData['hostConfig'] + '/#/?q=' + b64LinkData

    // add to calibration DOM element the new generated link
    domCalibrationLink = document.getElementById('calibration-link')
    domCalibrationLink.setAttribute('href', calibrationLink)
}

window.addEventListener('DOMContentLoaded', () => {

    const inputElement = document.getElementsByName('userId')[0]
    const linksList = document.getElementById('links-list')

    // add to calibration event listener
    domCalibrationLink = document.getElementById('calibration-link')
    liDomElement = domCalibrationLink.closest('li')
    liDomElement.addEventListener('click', elemClick)

    // first load data if userId is choosed
    loadDataList(inputElement, linksList)
    
    inputElement.addEventListener('keyup', event => {
        event.preventDefault()
        currentElem = event.currentTarget

        loadDataList(currentElem, linksList)

        for (var element of linksList.children){
            element.addEventListener('click', elemClick)
        }
    })
})

// check enter key issue
const checkKey = e => {
    
    if (e.keyCode === KEYCODE_ENTER) {
       e.preventDefault()
    }
 }
 
 // implement `key` events
 document.addEventListener('keydown', checkKey)