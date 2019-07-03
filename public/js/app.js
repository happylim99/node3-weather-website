
/*
fetch('http://puzzle.mead.io/puzzle').then((response) => {
    response.json().then((data) => {
        console.log(data)
    })
})
*/
const weather = (address) => {
    fetch(`/weather?address=${address}`).then((response) => {
        response.json().then((data) => {
            if(data.error) {
                return msgOne.textContent = data.error
            }
            msgOne.textContent = data.address
            msgTwo.textContent = data.data
            msgThree.textContent = data.location
        })
    })
}

const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const msgOne = document.querySelector('#message-1')
const msgTwo = document.querySelector('#message-2')
const msgThree = document.querySelector('#message-3')

msgOne.textContent = 'from javascript'

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault()
    const location = search.value
    msgOne.textContent = ''
    msgTwo.textContent = ''
    msgThree.textContent = ''
    weather(location)
})