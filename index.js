let btntype = document.getElementById('typing')
let inputtype = document.getElementById('inputtype')
inputtype.style.transitionDuration = '.2'
let kett = document.getElementById('kett')
let naro = document.getElementById('type')
let timerText = document.getElementById('timer')
let timer = 60
let totalWords = 0
let count = 0
let generatedwords
let intervalTimer

//request random word from API
async function requestWords() {
    naro.classList.add('fa-circle-notch')
    naro.classList.add('fa-spin')
    naro.innerText = ''
    try {
        let result = await fetch("https://random-word-api.herokuapp.com/word?number=5")
        let json = await result.json()
        if (!json) {
            alert("Yah gagal :( coba pencet lagi ya?")
        }
        else {
            naro.classList.remove('fa-circle-notch')
            naro.classList.remove('fa-spin')
            inputtype.focus()
            naro.innerText = json.join(", ")
            generatedwords = json
        }
    } catch (error) {
        alert("Yah gagal :( coba pencet lagi ya?")
    }
    //give interval for countdown timer
    intervalTimer = setInterval(() => {
        timer -= 1
        timerText.innerText = timer
        if (timer < 1) {
            clearInterval(intervalTimer)
            inputtype.disabled = true
            naro.innerText = "Your typing speed is " + totalWords / 1 + " WPM"
            btntype.disabled = false
            btntype.innerText = "Start over"
        }
    }, 1000);
}

//do some anticipation and call request function
btntype.addEventListener('click', function () {
    timer = 60
    btntype.disabled = true
    inputtype.disabled = false
    inputtype.value = ''
    inputtype.focus()
    count = 0
    totalWords = 0
    requestWords()
})

inputtype.addEventListener('keyup', function (e) {
    //     //check the current type word to change background
    if (inputtype.value == generatedwords[count]) {
        inputtype.style.backgroundColor = 'rgb(42, 157, 143, .5)'
    } else {
        inputtype.style.backgroundColor = 'rgb(231, 111, 81, .5)'
    }
})

inputtype.addEventListener('keydown', function (res) {

    //check the value if its the same or not, if space(32) is clicked
    if (res.keyCode == 32) {
        res.preventDefault()
        if (inputtype.value == generatedwords[count]) {
            inputtype.value = ''
            count += 1
            totalWords += 1
            inputtype.style.backgroundColor = '#F4A261'
            if (count > 4) {
                count = 0
                naro.innerText = ''
                clearInterval(intervalTimer)
                requestWords()
            }
        }
        else {
            inputtype.style.backgroundColor = 'rgb(252, 81, 48)'
        }
    }
})