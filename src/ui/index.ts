const CONTAINER = document.querySelector("#app") as HTMLDivElement;
const INSTRUCTIONS = document.createElement("p");

const LISTENING = document.createElement("h1");
LISTENING.textContent = "Listening...";

const WAITING = document.createElement("h1");
WAITING.textContent = "Waiting...";

const THINKING = document.createElement("h1");
THINKING.textContent = "Thinking...";

const SPEAKING = document.createElement("h1");
SPEAKING.textContent = "Speaking...";

let HEADERS = [LISTENING, WAITING, THINKING, SPEAKING];

export function showListening() {
    removeAllElements();
    INSTRUCTIONS.textContent = "press space to stop"
    addElement(LISTENING);
}

export function showWaiting() {
    removeAllElements();
    INSTRUCTIONS.textContent = "press space to ask me a question"
    addElement(WAITING);
}

export function showThinking() {
    removeAllElements();
    INSTRUCTIONS.textContent = "one moment ..."
    addElement(THINKING);
}

export function showSpeaking() {
    removeAllElements();
    INSTRUCTIONS.textContent = ""
    addElement(SPEAKING);
}

function removeAllElements() {
    for (let el of HEADERS) {
        if (CONTAINER.contains(el))
            CONTAINER.removeChild(el);
    }
}

function addElement(el: HTMLHeadingElement) {
    CONTAINER.appendChild(el);
    CONTAINER.appendChild(INSTRUCTIONS);
}