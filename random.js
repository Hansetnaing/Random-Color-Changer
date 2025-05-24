let isRGB = false;
let history = [];

// Start Change Color

function changeColor(){
    let color;

    if(isRGB){
        let r = Math.floor(Math.random() * 256); //random value
        let g = Math.floor(Math.random() * 256);
        let b = Math.floor(Math.random() * 256);

        color = `rgb(${r}, ${g}, ${b})`;
    }

    else{
        color = "#" + Math.floor(Math.random() * 16777215).toString(16).padStart(6,'0');
    }

    document.body.style.backgroundColor = color;
    // document.getElementById('colorCode').style.color = color;
    document.getElementById('colorCode').textContent = color;
    document.body.style.transition = "all ease-in-out .5s";

    addToHistory(color);
    updateColorCode(color);
}

// End Change Color

// Toggle Color Mode 

function toggleMode(){
    isRGB = !isRGB; // true
    let button = document.querySelectorAll('button')[1];
    button.textContent = isRGB ? "Switch to HEX" : "Switch to RGB";
}

// End Toggle Color Mode 

// Start History Function


function addToHistory(color) {
  

  if (history.length >= 5) {
    history.pop(color);
  }

  history.unshift(color);

  let historyDiv = document.getElementById("history"); 
  historyDiv.innerHTML = '<strong>History:</strong>';
  history.forEach(x => {

    let span = document.createElement("span");
    
    span.textContent = x;
    span.style.backgroundColor = x;
    span.classList.add("updateColor");
    span.onclick = () => applyColor(x);

    historyDiv.appendChild(span);
  });
}

// End History Function

// Start Apply Color 

function applyColor(color){
  document.body.style.backgroundColor = color;
  document.getElementById('colorCode').textContent = color;
}

// End Apply Color

// Start Copy Color

function copyColor(){
    let color = document.getElementById('colorCode').textContent;
    navigator.clipboard.writeText(color).then(() => alert('Copied :'+ color));
}

// End Copy Color