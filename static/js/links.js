const toggleVisible = ele => ele.style.display = ele.style.display === 'none' ? 'block' : 'none'
const toggleClass = (ele, class1, class2) => ele.className = ele.className === class1 ? class2 : class1

const guildIdField = document.getElementById('guildId')
const userIdField = document.getElementById('userId')
const generateButton = document.getElementById('generateButton')
const generateInfo = document.getElementById('generateInfo')

const userIdFeedback = document.getElementById('userIdFeedback')


async function loadExperiment(){
    var urlParams = new URLSearchParams(window.location.search);

    if(urlParams.get('id')){
        current_guild_id = urlParams.get('id')

        for (let option of guildIdField.options){
            if (option.value == current_guild_id){
                option.defaultSelected = true
            }
        }
    }
}

// check enter key issue
async function searchUserId(){

    // reinit feedback div and form
    // userIdFeedback.innerText = ''
    userIdField.className = 'form-control'
    generateButton.disabled = true

    // get form value
    let guildId = guildIdField.value
    let userId = userIdField.value

    if (!userId.length){
        return
    }

    const csrfToken = document.querySelector('[name=csrfmiddlewaretoken]').value

    let data = {'guildId': guildId, 'userId': userId}
    
    fetch(`/${BASE}/check`, {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
            'Content-type': 'application/json; charset=utf-8',
            'X-CSRFToken': csrfToken
        }
    })
    .then((resp) => 
        resp.json()
    )
    .then(res => {
        // update status field and enable link generation if valid
        userIdFeedback.innerText = res.message
        
        if (res.status){
            userIdField.className = 'form-control is-valid'
            userIdFeedback.className = 'valid-feedback'
            generateButton.disabled = false
        }else{
            userIdField.className = 'form-control is-invalid'
            userIdFeedback.className = 'invalid-feedback'
            generateButton.disabled = true
        }
    })
}

async function guildIdChanged(){
    // reinit field if guild value changed
    userIdField.className = 'form-control'
    userIdFeedback.className = ''
    userIdFeedback.innerText = ''
    userIdField.value = ''
    generateButton.disabled = true
}

async function generateLink(){

    // reinit field if guild value changed
    let guildId = guildIdField.value
    let userId = userIdField.value

    const csrfToken = document.querySelector('[name=csrfmiddlewaretoken]').value

    let data = {'guildId': guildId, 'userId': userId}
    
    fetch(`/${BASE}/generate`, {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
            'Content-type': 'application/json; charset=utf-8',
            'X-CSRFToken': csrfToken
        }
    })
    .then((resp) => 
        resp.json()
    )
    .then(res => {
        // update status field and enable link generation if valid
        console.log(res)
        user_config = res.config
        user_link = res.link

        if (res.status){
             // Add link to local storage
            var localStorage = window.localStorage

            // link composed of {'experimentId', 'link'}
            expes_link = {}
            
            // retrieve expe links if exists
            if (localStorage.getItem('p3d-user-links')){
                expes_link = JSON.parse(localStorage.getItem('p3d-user-links'))
            }

            if (!expes_link[user_config.experimentName]){
                // create for this experiment
                expes_link[user_config.experimentName] = {}
            }

            if (!expes_link[user_config.experimentName][user_config.experimentId]){
                // create for this experiment and experiment id
                expes_link[user_config.experimentName][user_config.experimentId] = {}
            }

            if (!expes_link[user_config.experimentName][user_config.experimentId][user_config.userId]){
                // create for this experiment, experiment id and user id
                expes_link[user_config.experimentName][user_config.experimentId][user_config.userId] = {'config': user_config, 'link': user_link}
            }

            localStorage.setItem('p3d-user-links', JSON.stringify(expes_link))
            
            generateInfo.className = 'alert alert-dismissible alert-success'
            generateInfo.style.display = 'block'

            generateInfo.innerHTML = '<button id="generateInfoClose" type="button" class="close" data-dismiss="alert">&times;</button> \
            Well done! You successfully generate <a href="' + user_link + '" class="alert-link">your experiment link</a>. \
            <strong>This link is unique and associated with your browser</strong>..'

        }else{
            generateInfo.className = 'alert alert-dismissible alert-danger'
            generateInfo.style.display = 'block'

            generateInfo.innerHTML = '<button id="generateInfoClose" type="button" class="close" data-dismiss="alert">&times;</button> \
            <strong>An error occured!</strong> ' + res.message + '.'
        }

        let generateInfoClose = document.getElementById('generateInfoClose')

        // link function
        generateInfoClose.addEventListener('click', (e) => {
            toggleVisible(generateInfo)
        })

        // reset form
        loadLinks()
        guildIdChanged()
       
    })
}

// check by default
searchUserId()

document.addEventListener('DOMContentLoaded', loadExperiment)
userIdField.addEventListener('keyup', searchUserId)
guildIdField.addEventListener('change', guildIdChanged)
generateButton.addEventListener('click', generateLink)
 
 // implement `key` events
 // document.addEventListener('keydown', checkKey)