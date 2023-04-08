const synth = window.speechSynthesis;
const synthVoice = getVoice();

const PITCH_SYNTH = 1;
const RATE_SYNTH = 1;

function getVoice() {
    let voices = synth.getVoices();
    if (navigator.userAgent.toLowerCase().includes("safari"))
        return 
    return voices.find(v => v.lang == "en-GB") as SpeechSynthesisVoice;
}

export function speak(text:string) {
    synth.cancel();
    return new Promise((res, rej) => {
        console.log(`Speaking: ${text}`);
        // create the utterance
        let utterance = new SpeechSynthesisUtterance(text);
        if (synthVoice)
            utterance.voice = synthVoice;
        utterance.pitch = PITCH_SYNTH;
        utterance.rate = RATE_SYNTH;
        // speak it
        synth.speak(utterance);
        // resolve the promise
        utterance.onend = () => res(true);
    })
}