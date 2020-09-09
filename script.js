const button = document.getElementById('button');
const audioElement = document.getElementById('audio')



// Disable/Enable button
function toggleButton() {
    button.disabled = !button.disabled;
}
// Passing Joke to VoiceRSS API
function tellMe(joke) {
    VoiceRSS.speech({
        key: '5c517e0f1351426c8f4e1a2f7a322cca',
        src: joke,
        hl: 'en-us',
        r: 0,
        c: 'mp3',
        f: '44khz_16bit_stereo',
        ssml: false
    })
}
// Get Jokes from Jokes API
async function getJokes() {
    let joke = '';
    const apiURL = 'https://sv443.net/jokeapi/v2/joke/Programming';
    try {
        const response = await fetch(apiURL);
        const data = await response.json();
        if (data.setup) {
            joke = `${data.setup} ... ${data.delivery}`;
        } else {
            joke = data.joke;
        }
        //Text-to-Speech
        tellMe(joke);
        // Disable button
        toggleButton();
    } catch (error) {
        // Catch Errors here
        console.log('whops', error)
    }
}

// Event Listeners
button.addEventListener('click', getJokes);
audioElement.addEventListener('ended', toggleButton);