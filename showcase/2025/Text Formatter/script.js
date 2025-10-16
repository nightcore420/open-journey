const textArea = document.getElementById("inputText");

function toUpper() {
  textArea.value = textArea.value.toUpperCase();
}
function toLower() {
  textArea.value = textArea.value.toLowerCase();
}
function toTitle() {
  textArea.value = textArea.value
    .toLowerCase()
    .split(' ')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}
function toSentence() {
  textArea.value = textArea.value
    .toLowerCase()
    .replace(/(^\s*\w|[.!?]\s*\w)/g, c => c.toUpperCase());
}
function copyText() {
  navigator.clipboard.writeText(textArea.value);
  alert("Text copied to clipboard!");
}
function clearText() {
  textArea.value = "";
}
