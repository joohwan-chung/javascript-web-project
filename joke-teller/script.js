const button = document.getElementById('button')
const audioElement = document.getElementById('audio')

// Disable/Enable button
function toggleButton() {
  button.disabled = !button.disabled
}

// Pass joke to VoiceRSS API
function tellMe(joke) {
  const jokeString = joke.trim().replace(/ /g, '%20')
  
  // VoiceRSS Speech Parameters
  VoiceRSS.speech({
    key: 'YOUR_API_KEY_HERE',
    src: jokeString,
    hl: 'en-us',
    v: 'Linda',
    r: 0, 
    c: 'mp3',
    f: '44khz_16bit_stereo',
    ssml: false
  })
}

// 1. Get jokes from Joke API
async function getJokes() {
  let joke = ''
  const apiUrl = 'https://v2.jokeapi.dev/joke/Programming?blacklistFlags=nsfw,religious,political,racist,sexist,explicit'
  try {
    const response = await fetch(apiUrl)
    const data = await response.json()
    if (data.setup) {
      joke = `${data.setup} ... ${data.delivery}`
    } else {
      joke = data.joke
    }

    // Text-to-speech
    tellMe(joke)

    // Disable button
    toggleButton()
  } catch (error) {
    // Catch errors
    console.log('whoops', error)
  }
}

// Event Listeners
button.addEventListener('click', getJokes)
audioElement.addEventListener('ended', toggleButton)