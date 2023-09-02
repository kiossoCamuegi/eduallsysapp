

export default function ClearInputs() {
  let inputs = document.querySelectorAll("input");
  inputs.forEach(input => {
      input.value = null;
  });
  let textarea = document.querySelectorAll("textarea");
  textarea.forEach(text => {
      text.value = null;
  });
  let RichText = document.querySelectorAll(".public-DraftEditor-content");
  RichText.forEach(rich => {
       rich.innerHTML = "";
  }); 
}
 