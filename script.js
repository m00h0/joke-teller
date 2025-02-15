const button = document.getElementById('button');
const audioElement = document.getElementById('audio');

// https://www.voicerss.org/api/ API Key
const VoiceRSSAPI = 'd9b18abdd8414a8f925d60ce2ed29e6d';

// Disable/Enable Button
function toggleButton() {
  button.disabled = !button.disabled;
}

// Passing Joke VoiceRSS API
function tellMe(joke) {
  // eslint-disable-next-line no-undef
  VoiceRSS.speech({
    key: VoiceRSSAPI,
    src: joke,
    hl: 'en-us',
    v: 'Linda',
    r: 0,
    c: 'mp3',
    f: '44khz_16bit_stereo',
    ssml: false,
  });
}

// Get Jokes from joke API

async function getJoke() {
  let joke = '';
  const apiUrl = 'https://v2.jokeapi.dev/joke/Programming?blacklistFlags=nsfw,religious,political,racist,sexist,explicit';
  try {
    const response = await fetch(apiUrl);
    const data = await response.json();
    if (data.setup) {
      joke = `${data.setup} ... ${data.delivery}`;
    } else {
      joke = data.joke;
    }
    // Text-to-speach
    tellMe(joke);
    // Disbale the button
    toggleButton();
  } catch (error) {
    // If there is a Error
    // eslint-disable-next-line no-console
    console.log('Error Fetching API', error);
  }
}

// Event Listner

button.addEventListener('click', getJoke);
audioElement.addEventListener('ended', toggleButton);
