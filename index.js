const buttonElem = document.getElementById("button")
const audioElement = document.getElementById("audio")

const apiURL = "https://sv443.net/jokeapi/v2/joke/Any?blacklistFlags=nsfw,religious,racist,sexist"
// Toggling button 

function toggleButton() {
    buttonElem.disabled =!buttonElem.disabled
}
// Passing Joke to VoiceRSS API
function tellMe(joke) {
    VoiceRSS.speech({
    key: 'a567e5731ca44059a5e935a77e2abd70',
    src: joke,
    hl: 'en-us',
    v: 'Linda',
    r: 0, 
    c: 'mp3',
    f: '44khz_16bit_stereo',
    ssml: false
  });
}


async function getJoke() {
    let joke = "";
    try {
        const response = await fetch(apiURL)
        const data = await response.json()
        // If the joke is two-part
        if (data.setup) {
            joke = `${data.setup} .. ${data.delivery}`
        } else {
            // If the joke is single part
            joke = data.joke
        }
    } catch(error) {
        console.log("Whoops" , error)
    }
    // Passs the jokeData to VoiceRSS
    tellMe(joke)
    // Toggle the button
    toggleButton()
}

// Button
buttonElem.addEventListener("click", getJoke)
// Disabling th button
audioElement.addEventListener("ended" , toggleButton)