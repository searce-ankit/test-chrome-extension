
const popupEvent = new Event('popup-event',{bubbles:true});
const keyDownEvent = () =>{
    document.querySelector(":root").addEventListener('keydown',keyDownHandler, {capture:true});
}

const keyDownHandler = event =>{
    if( event.key !== ";" ) return;

    event.target.dispatchEvent(popupEvent);
}

let currentTarget=null;

const popupEventHandler = event =>{
    const target = event.target;

  const isValidTarget =
    target.selectionEnd ||
    target.selectionEnd === 0 ||
    target.getAttribute('contenteditable');

    if(!isValidTarget) return;
    
    var elem = document.getElementById('popup-container');
    var rect = target.getBoundingClientRect();
    elem.style.top = (rect.top+20) +'px';
    elem.style.left= rect.left+'px';
    elem.classList.add("show");
    currentTarget=target;
}

const initPopupTemplate = () => {
    const template = document.createElement('div');
    template.id = 'popup-template';
    template.innerHTML = `
      <div class="popup" id="popup-container">
        <ul class="data">
        <li data-id="1">Hellooo!</li>
        <li data-id="2">Hii!</li>
        <li data-id="3">Good Morning!</li>
        <li data-id="4">Good Night!</li>
        </ul>
      </div>
    `;
  
    // Add the template into the DOM


    document.querySelector('body').appendChild(template);
  }

  const selectorHandler = event =>{
    var target=event.target;

    console.log(currentTarget.innerHTML);
    
    var text=target.textContent;
    
    currentTarget.textContent= currentTarget.textContent.substring(0, currentTarget.textContent.length-1) +" "+text;

    var elem = document.getElementById('popup-container');
    elem.style.top = '-100px';
    elem.style.left= '-100px';
    elem.classList.remove("show");
    currentTarget=null;
  }

const init = () =>{
    keyDownEvent();
    initPopupTemplate();

    var listLi= document.querySelectorAll('#popup-container > .data > li');
    
    listLi.forEach(element => {
        element.addEventListener('click',selectorHandler);
    });
    

    document.querySelector(':root').addEventListener('popup-event',popupEventHandler);
} 


export const main = () => {
    init();
}