let webEngine = browser;

function saveOptions(e) {
    e.preventDefault();
    webEngine.storage.sync.set({
        apiKey: document.querySelector("#apiKey").value
    });
}

function restoreOptions() {
    function setCurrentChoice(result) {
        document.querySelector("#apiKey").value = result.apiKey || "";
    }

    function onError(error) {
        console.log(`Error: ${error}`);
    }

    let getting = webEngine.storage.sync.get("apiKey");
    getting.then(setCurrentChoice, onError);
}
  
document.addEventListener("DOMContentLoaded", restoreOptions);
document.querySelector("form").addEventListener("submit", saveOptions);