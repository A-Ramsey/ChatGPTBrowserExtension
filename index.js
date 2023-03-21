// const titleToMarkdown = async () => {
//     let tabs = await browser.tabs.query({
//       active: true,
//       currentWindow: true,
//     });
  
//     let result = `[${tabs[0].title}](${tabs[0].url})`;
  
//   navigator.clipboard.writeText(result).then(
//     function () {
//       console.log("successfully copied to clipboard!");
//     },
//     function () {
//       console.log("failed copied to clipboard!");
//     }
//   );
  
//   - console.log({ result });
//   };
  
//   browser.browserAction.onClicked.addListener(titleToMarkdown);