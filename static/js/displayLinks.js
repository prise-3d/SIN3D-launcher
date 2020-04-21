
const linksBlock = document.getElementById('displayLinks')

var localStorage = window.localStorage

async function loadLinks(){
    linksBlock.innerHTML = ''

    let title = document.createElement('h5')
    title.innerHTML = 'Your generated SIN3D-app links'

    linksBlock.append(title)

    // retrieve expe links if exists
    if (localStorage.getItem('p3d-user-links')){

        expes_link = JSON.parse(localStorage.getItem('p3d-user-links'))

        for (expe in expes_link){

            let card = document.createElement('div')
            card.className = 'card border-light mb-12'
            card.style.border = '1px solid'
            
            let cardHeader = document.createElement('div')
            cardHeader.className = 'card-header'
            cardHeader.innerHTML = expe

            let cardBody = document.createElement('div')

            let cardBodyList = document.createElement('ul')
            cardBodyList.className = 'list-group border-light'

            for (experimentId in expes_link[expe]){
                
                for (userId in expes_link[expe][experimentId]){
                    
                    let userValue = expes_link[expe][experimentId][userId]

                    let cardBodyItem = document.createElement('li')
                    cardBodyItem.className = 'list-group-item d-flex justify-content-between align-items-center border-light'
                    cardBodyItem.style.border = '1px solid'
                    cardBodyItem.innerHTML = '<ul class="fa-ul">\
                    <li><p><i class="fa-li fas fa-flask"></i> ' + experimentId + '</p></li> \
                    <li><p><i class="fa-li fas fa-id-badge"></i> '  + userId + '</p></li>\
                    </ul>\
                    <a href="' + userValue.link + '" target="_blank"><span class="badge badge-primary badge-pill">Launch experiment <i class="fas fa-external-link-alt"></i></span></a>'
                    cardBodyList.append(cardBodyItem)
                }
            }

            cardBody.append(cardBodyList)
            card.append(cardHeader)
            card.append(cardBody)
            linksBlock.append(card)
        }
    }
    else{
        let card = document.createElement('div')
        card.className = 'card border-warning mb-12'
        card.style.border = '1px solid'
        
        let cardHeader = document.createElement('div')
        cardHeader.className = 'card-header'
        cardHeader.innerHTML = 'Generated links information'

        let cardBody = document.createElement('div')
        cardBody.className = 'card-body'
    
        let bodyTitle = document.createElement('h4')
        bodyTitle.className = 'card-title'
        bodyTitle.innerHTML = 'No experiment links available'

        let bodyText = document.createElement('p')
        bodyText.className = 'card-text'
        bodyText.innerHTML = 'If you want to generate your experiment link, please use the form on the left'

        cardBody.append(bodyTitle)
        cardBody.append(bodyText)

        card.append(cardHeader)
        card.append(cardBody)

        linksBlock.append(card)
    }
}

loadLinks()