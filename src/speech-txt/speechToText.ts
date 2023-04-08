const SPEECH_REC = webkitSpeechRecognition  //  chrome and safari
let SPEECH_REC_EVENT
if (!('webkitSpeechRecognitionEvent' in window)) {
    SPEECH_REC_EVENT = SpeechRecognitionEvent;
} else {
    SPEECH_REC_EVENT = webkitSpeechRecognitionEvent; // chrome
}

/** ---------------- WHEN GENERATING SPEECH -------------------- */

const FINISHED_SPEAKING_HANDLERS: Function[] = [];
function respondToHandlers(text: string) {
    for (let f of FINISHED_SPEAKING_HANDLERS)  {
        f(text);
    }
}
function handleSpeechResults(event: SpeechRecognitionEvent) {
    let res = getSpeechResResults(event);
    respondToHandlers(res);
}

function getSpeechResResults(event: SpeechRecognitionEvent) {
    return event.results[0][0].transcript;
}

/** ---------------------- EVENTS -------------------- */


let recognition: SpeechRecognition | null = null;
export function initListener() {
    // initialize listener
    recognition = new SPEECH_REC();
    recognition.continuous = true;
    recognition.lang = "en-US";
    recognition.interimResults = false;
    recognition.maxAlternatives = 2;   
    // ATTACH THE LISTENERS
    recognition.onresult = handleSpeechResults;
}
initListener();

export function startListening() {
    if (!recognition) return;
    console.log("starting listener");
    recognition.start();
}

export function stopListening() {
    if (!recognition) return;
    console.log("stopping listener");
    recognition.stop();
}

export function onUserFinishedSpeaking(handler: Function) {
    FINISHED_SPEAKING_HANDLERS.push(handler);
}