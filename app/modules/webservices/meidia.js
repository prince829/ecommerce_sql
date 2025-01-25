import { launch, getStream, wss } from "puppeteer-stream";
function speech() {
    console.log("Evaluate Script");
}
export default async function voiceStream() {
    try {
        const browser = await launch({
            executablePath: "/usr/bin/google-chrome-stable",
            defaultViewport: {
                width: 1920,
                height: 1080,
            },
            allowIncognito: true
            // headless: false,
            // args: [
            //     '--no-sandbox'
            // ],
        });
        const page = await browser.newPage();
        await page.goto("https://www.youtube.com/embed/DzivgKuhNl4?autoplay=1");
        // const context = await browser.createBrowserContext();
        // await context.overridePermissions('https://www.youtube.com/embed/DzivgKuhNl4?autoplay=1', ['microphone']);
        // const context = await browser.createBrowserContext();
        // await context.overridePermissions('https://www.youtube.com/embed/DzivgKuhNl4?autoplay=1', ['microphone']);
        // let recognition;

        await page.evaluate(() => {
            return new Promise((resolve, reject) => {
                try {
                    // Accessing browser APIs directly
                    recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
                    recognition.continuous = false;
                    recognition.interimResults = true;
                    let transcript = '';
                    recognition.onresult = (event) => {
                        for (let i = event.resultIndex; i < event.results.length; i++) {
                            if (event.results[i].isFinal) {
                                transcript += event.results[i][0].transcript + ' ';
                            }
                        }
                        console.log('Transcript:', transcript);
                    };

                    recognition.onerror = (event) => {
                        console.error('SpeechRecognition error:', event.error);
                    };

                    recognition.onend = () => {
                        console.log('SpeechRecognition has stopped.');
                    };

                    recognition.start();
                    resolve('Speech recognition started');
                } catch (error) {
                    reject(error);
                }
            });
        });
        console.log("HEllo");
        const stream = await getStream(page, { audio: true, video: true, audioBitsPerSecond: 128000, videoBitsPerSecond: 2500000, frameSize: 60 });
        console.log("recording");
        stream.on('data', () => {
            const stream = navigator.mediaDevices.getUserMedia({ audio: true });
            console.log(recognition, 'recognition');
            if (recognition) {
                recognition.onresult = (event) => {
                    for (let i = event.resultIndex; i < event.results.length; i++) {
                        if (event.results[i].isFinal) {
                            transcript += event.results[i][0].transcript + ' ';
                        }
                    }
                    console.log('Transcript:', transcript);
                };

                recognition.onerror = (event) => {
                    console.error('SpeechRecognition error:', event.error);
                };

                recognition.onend = () => {
                    console.log('SpeechRecognition has stopped.');
                };

                recognition.start();
            }

        })
    } catch (err) {
        console.log(err);
    }
}
