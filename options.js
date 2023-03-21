let webEngine = browser;

function saveOptions(e) {
    e.preventDefault();
    let successElem = document.getElementById('optionsSavedWrapper');
    
    webEngine.storage.sync.set({
        apiKey: document.querySelector("#apiKey").value,
        width: document.querySelector("#width").value,
        height: document.querySelector("#height").value,
    });
    successElem.style.display = "inline-block";
    setTimeout(() => {
        successElem.style.display = "none";
    }, 3000)
}

function restoreOptions() {
    function setCurrentChoiceApiKey(result) {
        document.querySelector("#apiKey").value = result.apiKey || "";
    }
    function setCurrentChoiceWidth(result) {
        document.querySelector("#width").value = result.width || "25";
    }
    function setCurrentChoiceHeight(result) {
        document.querySelector("#height").value = result.apiKey || "25";
    }

    function onError(error) {
        console.log(`Error: ${error}`);
    }

    let gettingApiKey = webEngine.storage.sync.get("apiKey");
    gettingApiKey.then(setCurrentChoiceApiKey, onError);

    let gettingWidth = webEngine.storage.sync.get("width");
    gettingWidth.then(setCurrentChoiceWidth, onError);

    let gettingHeight = webEngine.storage.sync.get("height");
    gettingHeight.then(setCurrentChoiceHeight, onError);
}
  
document.addEventListener("DOMContentLoaded", restoreOptions);
document.querySelector("form").addEventListener("submit", saveOptions);