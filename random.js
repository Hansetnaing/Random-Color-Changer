let isRGB = false;

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
    document.body.style.transition = "all .5s";

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

// CopyColor 

document.getElementById('colorCode').addEventListener('click',function(){
    let color = document.getElementById('colorCode').textContent;
    navigator.clipboard.writeText(color).then(() => alert('Copied :'+ color));
});

// History 
let history = [];
const maxHistorySize = 5;

const historyContainer = document.getElementById("history"); 

function addToHistory(newColor) {
  history.unshift(newColor);

  if (history.length > maxHistorySize) {
    history.pop();
  }

  historyContainer.innerHTML = "History:";
  historyContainer.style.fontWeight = 'bold';
  history.forEach(colorInList => {

    const btn = document.createElement("button");
    btn.textContent = colorInList;

    btn.style.backgroundColor = colorInList;
    btn.style.color = "black";
    btn.style.cursor ="pointer";
    btn.style.margin = "5px";
    btn.style.padding = "5px";
    btn.classList.add("updateColor");
    
    btn.addEventListener("click", () => {
      updateColorCode(colorInList);
      // addToHistory(colorInList);
    });

    historyContainer.appendChild(btn);
  });
}