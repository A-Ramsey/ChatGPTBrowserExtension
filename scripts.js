let apiKey = "";
let webEngine = browser;

function lockUnlockInput(lock = true) {
    document.getElementById('main-inp').disabled = lock;
    document.getElementById('main-inp-btn').disabled = lock;
    document.getElementById('main-inp').focus();
}

function onError(error) {
    console.log(error);

    let errMsg = {'role': 'error', 'content': error}

    lockUnlockInput()
    displayMessage(errMsg);
}

function onGotApiKey(item) {
    apiKey = item.apiKey;
}

function onGotWidth(item) {
    console.log(item.width + "rem")
    document.body.style.width = item.width + "rem";
}

function onGotHeight(item) {
    document.getElementById('responses').style.height = item.height + "rem";
}

const gettingApiKey = webEngine.storage.sync.get("apiKey");
gettingApiKey.then(onGotApiKey, onError);

let messages = [
    {'role': 'system', 'content': 'You are a useful assistant'}
];

function displayMessage(message) {
    console.log(message);
    let p = document.createElement("p");
    p.classList.add(message.role);
    p.classList.add("response");
    p.addEventListener('click', (evt) => {
        navigator.clipboard.writeText(message.content).then(
            () => {
                webEngine.notifications.create({
                    type: "basic",
                    title: "Message Copied!",
                    message: message.content
                })
            },
            () => {
                webEngine.notifications.create({
                    type: "basic",
                    title: "Failed",
                    message: " failed to copy message to your clipboard"
                })
            }
        )
    })
    let inp = document.createTextNode(message.content);
    p.appendChild(inp);
    document.getElementById("responses").appendChild(p);
}

async function makeRequest() {
    lockUnlockInput();
    let bearer = "Bearer " + apiKey;
    console.log(bearer);
    fetch(
        "https://api.openai.com/v1/chat/completions", {
            method: 'POST',
            body: JSON.stringify(
                {
                    "model": "gpt-3.5-turbo",
                    "messages": messages,
                    "temperature": 0.7,
                }
            ),
            headers: {
                'Content-Type': 'application/json',
                'Authorization': bearer
            }
        }
    ).then(response => {
        return response.json();
    }).then(json => {
        let modelReply = json.choices[0].message;
        messages.push(modelReply);
        console.log(modelReply);
        displayMessage(modelReply);
        let elem = document.getElementById('responses');
        elem.scrollTop = elem.scrollHeight;
        lockUnlockInput(false);
    })
}

async function openAIrequest() {
    let requestText = document.getElementById("main-inp").value;
    console.log(requestText);
    document.getElementById("main-inp").value = "";
    let userMessage = {'role': 'user', 'content': requestText}
    
    displayMessage(userMessage)

    messages.push(userMessage)

    let reply = await makeRequest();
}

window.addEventListener('load', async () => {
    document.getElementById("main-inp-btn").addEventListener('click', openAIrequest);
    document.getElementById('main-inp').addEventListener('keypress', (evt) => {
        if (evt.key === "Enter") {
            evt.preventDefault();
            document.getElementById('main-inp-btn').click();
        }
    })

    const gettingWidth = webEngine.storage.sync.get("width");
    gettingWidth.then(onGotWidth, onError);
    
    const gettingHeight = webEngine.storage.sync.get("height");
    gettingHeight.then(onGotHeight, onError);

    document.getElementById('main-inp').focus();
})