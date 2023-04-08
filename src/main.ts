import './style.css'
import { runQuery } from './txt-gen/openai';
import { speak } from './txt-speech/textToSpeech';
import { startListening, stopListening, onUserFinishedSpeaking } from './speech-txt/speechToText';
import { showListening, showSpeaking, showThinking, showWaiting } from './ui';

/** ------------------ INIT ---------------------- */
let IS_SPEAKING = false;
let IS_LISTENING = false;
let IS_THINKING = false;
wait();

/** ------------- status flags ------------- */

function listen() {
  console.log(import.meta.env)
  IS_SPEAKING = false;
  IS_LISTENING = true;
  IS_THINKING = false;
  showListening();
  startListening();
}

function wait() {
  IS_SPEAKING = false;
  IS_LISTENING = false;
  IS_THINKING = false;
  showWaiting()
}

function think() {
  IS_SPEAKING = false;
  IS_LISTENING = false;
  IS_THINKING = true;
  showThinking()
}


window.addEventListener("keydown", (e) => {
  let isSpace = e.key.toLowerCase() == "space" || e.code.toLowerCase() == "space";
  if (isSpace) {
    if (!IS_LISTENING && !IS_SPEAKING && !IS_THINKING) {
      listen();
      return;
    }
    if (IS_LISTENING) {
      stopListening();
      return;
    }
    if (IS_SPEAKING) {
      wait()
      return;
    }
  }
})



onUserFinishedSpeaking(async (text:string) => {
  console.log(`You said: ${text}`);
  if (!text.length) {
    wait();
    return;
  }
  // think
  think()

  let res = await runQuery(text);
  
  // speak
  IS_SPEAKING = true;
  IS_LISTENING = false;
  IS_THINKING = false;
  showSpeaking();
  await speak(res);
  wait();
})