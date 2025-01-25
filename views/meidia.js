export default async function voiceStream() {
    let speech = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
    console.log(speech, 'speech');
}