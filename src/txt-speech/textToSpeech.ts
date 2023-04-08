


const PITCH_SYNTH = 1;
const RATE_SYNTH = 1;


function getVoice() {
    let synth = window.speechSynthesis;
    let voices = synth.getVoices();
    let ua = navigator.userAgent.toLowerCase()
    if (ua.includes("safari") && !ua.includes("chrome"))
        return
    return voices.find(v => v.lang == "en-GB") as SpeechSynthesisVoice;
}

export function speak(text:string) {
    let synth = window.speechSynthesis;
    let synthVoice = getVoice();    
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