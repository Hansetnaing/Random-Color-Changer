let isRGB = false;
const MAX_HISTORY = 5;
let history = [];

// Utility ------------------------------------------------
function clamp(n, a=0, b=255){ return Math.max(a, Math.min(b, Math.round(n))); }

function hexToRgb(hex){
  if (hex.startsWith('rgb')) {
    const m = hex.match(/(\d+),\s*(\d+),\s*(\d+)/);
    if (!m) return [255,255,255];
    return [Number(m[1]), Number(m[2]), Number(m[3])];
  }
  hex = hex.replace('#','');
  if (hex.length === 3) hex = hex.split('').map(c=>c+c).join('');
  const num = parseInt(hex,16);
  return [(num>>16)&255, (num>>8)&255, num&255];
}

function getContrastColor(color){
  const [r,g,b] = hexToRgb(color);
  // relative luminance
  const L = 0.2126*(r/255) + 0.7152*(g/255) + 0.0722*(b/255);
  return L > 0.55 ? '#000000' : '#ffffff';
}

// Persistence -------------------------------------------
function loadState(){
  try {
    isRGB = localStorage.getItem('isRGB') === 'true';
    history = JSON.parse(localStorage.getItem('colorHistory') || '[]');
    const last = localStorage.getItem('currentColor');
    return last || (isRGB ? 'rgb(255,255,255)' : '#ffffff');
  } catch (e) {
    history = [];
    return '#ffffff';
  }
}

function saveState(current){
  localStorage.setItem('isRGB', String(isRGB));
  localStorage.setItem('colorHistory', JSON.stringify(history));
  localStorage.setItem('currentColor', current);
}

// DOM Helpers ------------------------------------------
function $(id){ return document.getElementById(id); }

function renderHistory(){
  const container = $('history');
  if (!container) {
    console.warn('renderHistory: #history not found');
    return;
  }
  container.innerHTML = '';
  history.forEach(color => {
    const btn = document.createElement('button');
    btn.type = 'button';
    btn.className = 'item';
    btn.title = `Apply ${color}`;
    btn.style.backgroundColor = color;
    btn.style.color = getContrastColor(color);
    btn.textContent = color;
    btn.onclick = () => applyColor(color);
    container.appendChild(btn);
  });
}

// Core functions ---------------------------------------
function updateColorCode(color){
  const code = $('colorCode');
  code.textContent = color;
  const contrast = getContrastColor(color);
  code.style.color = contrast;
  code.style.backgroundColor = (contrast === '#000000') ? 'rgba(255,255,255,0.85)' : 'rgba(0,0,0,0.24)';
  document.title = `${color} — Random Color Changer`;
  $('swatch').style.backgroundColor = color;
}

function addToHistory(color){
  if (!color) return;
  if (history[0] === color) return;
  history.unshift(color);
  history = history.slice(0, MAX_HISTORY);
  saveState(color);
  renderHistory();
}

function changeColor(){
  let color;
  if (isRGB){
    const r = Math.floor(Math.random()*256);
    const g = Math.floor(Math.random()*256);
    const b = Math.floor(Math.random()*256);
    color = `rgb(${r}, ${g}, ${b})`;
  } else {
    color = '#' + Math.floor(Math.random()*16777215).toString(16).padStart(6, '0');
  }

  document.body.style.backgroundColor = color;
  updateColorCode(color);
  addToHistory(color);
}

function toggleMode(){
  isRGB = !isRGB;
  $('toggleBtn').textContent = isRGB ? 'Switch to HEX' : 'Switch to RGB';
  localStorage.setItem('isRGB', String(isRGB));
}

function applyColor(color){
  document.body.style.backgroundColor = color;
  updateColorCode(color);
  addToHistory(color);
}

async function copyColor(){
  const color = $('colorCode').textContent;
  try {
    await navigator.clipboard.writeText(color);
    // small visual feedback
    const b = $('copyBtn');
    const old = b.textContent;
    b.textContent = 'Copied!';
    setTimeout(()=> b.textContent = old, 1000);
  } catch (e) {
    // fallback
    const ta = document.createElement('textarea');
    ta.value = color;
    document.body.appendChild(ta);
    ta.select();
    try{ document.execCommand('copy'); }catch{}
    ta.remove();
    alert('Copied: ' + color);
  }
}

// Initialization ----------------------------------------
document.addEventListener('DOMContentLoaded', () => {
  const initial = loadState();
  renderHistory();

  // wire buttons
  $('changeBtn').onclick = changeColor;
  $('toggleBtn').onclick = toggleMode;
  $('copyBtn').onclick = copyColor;

  // keyboard shortcuts
  document.addEventListener('keydown', (e) => {
    if (e.code === 'Space') { e.preventDefault(); changeColor(); }
    if (e.key.toLowerCase() === 'c') { copyColor(); }
  });

  // initial UI
  $('toggleBtn').textContent = isRGB ? 'Switch to HEX' : 'Switch to RGB';
  document.body.style.transition = 'background-color 400ms ease';
  updateColorCode(initial);
});