
const popupEvent = new Event('popup-event',{bubbles:true});
let shouldKeyPressWork=false;
const keyDownEvent = () =>{

    document.querySelector(":root").addEventListener('keydown',keyDownHandler, {capture:true});
    // document.querySelector(":root").addEventListener('keyup',(event)=>{
    //   if(!shouldKeyPressWork) return;

    //   shouldKeyPressWork=false;
    //   console.log(event.target.innerHTML);
    // }, {capture:true});
}

function getCookie(name) {
  var nameEQ = name + "=";
  var ca = document.cookie.split(';');
  for(var i=0;i < ca.length;i++) {
      var c = ca[i];
      while (c.charAt(0)==' ') c = c.substring(1,c.length);
      if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
  }
  return null;
}

const keyDownHandler = event =>{
    if( event.key !== ";" ) return;


    var cookiedata=getCookie("test-data");
  console.log(cookiedata);

    //console.log(event);
    //shouldKeyPressWork=true;
    //console.log(event.target.innerHTML);
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

    console.log(window.getSelection().getRangeAt(0).startOffset);
    
    var elem = document.getElementById('popup-container');
    var rect = target.getBoundingClientRect();
    elem.style.top = (rect.top+20) +'px';
    elem.style.left= rect.left+'px';
    elem.classList.add("show");
    currentTarget=target;
}


const getCaretPosition = (editableDiv)=> {
  var caretPos = 0,
    sel, range;
  if (window.getSelection) {
    sel = window.getSelection();
    if (sel.rangeCount) {
      range = sel.getRangeAt(0);
      if (range.commonAncestorContainer.parentNode == editableDiv) {
        caretPos = range.endOffset;
      }
    }
  } else if (document.selection && document.selection.createRange) {
    range = document.selection.createRange();
    if (range.parentElement() == editableDiv) {
      var tempEl = document.createElement("span");
      editableDiv.insertBefore(tempEl, editableDiv.firstChild);
      var tempRange = range.duplicate();
      tempRange.moveToElementText(tempEl);
      tempRange.setEndPoint("EndToEnd", range);
      caretPos = tempRange.text.length;
    }
  }
  return caretPos;
}

const pasteHtmlAtCaret = (html) => {
  var sel, range;
  if (window.getSelection) {
      // IE9 and non-IE
      sel = window.getSelection();
      if (sel.getRangeAt && sel.rangeCount) {
          range = sel.getRangeAt(0);
          range.deleteContents();

          // Range.createContextualFragment() would be useful here but is
          // only relatively recently standardized and is not supported in
          // some browsers (IE9, for one)
          var el = document.createElement("div");
          //el.innerHTML = html;
          el.appendChild(html);
          var frag = document.createDocumentFragment(), node, lastNode;
          while ( (node = el.firstChild) ) {
              lastNode = frag.appendChild(node);
          }
          range.insertNode(frag);

          // Preserve the selection
          if (lastNode) {
              range = range.cloneRange();
              range.setStartAfter(lastNode);
              range.collapse(true);
              sel.removeAllRanges();
              sel.addRange(range);
          }
      }
  } else if (document.selection && document.selection.type != "Control") {
      // IE < 9
      document.selection.createRange().appendChild(html); //.pasteHTML(html);
  }
}


const initSuperStyle = () =>{
  var superMenuItem=document.createElement("div");
  superMenuItem.textContent="sup";
  superMenuItem.addEventListener('click',function(){
    var sup = document.createElement("sup");
    
    if (window.getSelection) {
        var sel = window.getSelection();
        if (sel.rangeCount) {
            var range = sel.getRangeAt(0).cloneRange();
            range.surroundContents(sup);
            sel.removeAllRanges();
            sel.addRange(range);
        }
    }
  });
  return superMenuItem;
}



const initSubStyle = () =>{
  var subMenuItem=document.createElement("div");
  subMenuItem.textContent="sub";
  subMenuItem.addEventListener('click',function(){

    var sub = document.createElement("sub");
    
    if (window.getSelection) {
        var sel = window.getSelection();
        if (sel.rangeCount) {
            var range = sel.getRangeAt(0).cloneRange();
            range.surroundContents(sub);
            sel.removeAllRanges();
            sel.addRange(range);
        }
    }
  });
  return subMenuItem;
}

const initTableStyle = () =>{
  var tableMenuItem=document.createElement("div");
  tableMenuItem.textContent="table";
  
  tableMenuItem.addEventListener('click',function(){

    var table =document.createElement("table");
    table.classList.add("compose-table");
    var tr = document.createElement("tr");
    tr.style.border="solid 1px #333";
    tr.innerHTML="<td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td>";

    var tr1 = document.createElement("tr");
    tr1.style.border="solid 1px #333";
    tr1.innerHTML="<td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td>";
    table.appendChild(tr);
    table.appendChild(tr1);

    pasteHtmlAtCaret(table);
  });
  return tableMenuItem;
}

const initExtraStyling = (elem) =>{
  var dvelem=document.createElement("div");
dvelem.classList.add('J-Z-I');
dvelem.classList.add('J-J5-Ji');
  dvelem.appendChild(initSuperStyle());
  
  elem.appendChild(dvelem);

  var dvelem1=document.createElement("div");
  dvelem1.classList.add('J-Z-I');
dvelem1.classList.add('J-J5-Ji');
  dvelem1.appendChild(initSubStyle());
  elem.appendChild(dvelem1); 

  var dvelem2=document.createElement("div");
  dvelem2.classList.add('J-Z-I');
dvelem2.classList.add('J-J5-Ji');
  dvelem2.appendChild(initTableStyle());
  elem.appendChild(dvelem2); 
}

const initPopupTemplate = () => {

  var interval = setInterval(function(){
    var elem=document.querySelector('.J-Z');
    if(elem){
      clearInterval(interval);
      initExtraStyling(elem);
    }
    
  },100);

  


    // const template = document.createElement('div');
    // template.id = 'popup-template';
    // template.innerHTML = `
    //   <div class="popup" id="popup-container">
    //     <div class="data">
    //     <span>ankit.bhatnagar@searce.com</span>
    //     <span>Hii!</span>
    //     <span>Good Morning!</span>
    //     <span>Good Night!</span>
    //     </div>
    //   </div>
    // `;
  
    // // Add the template into the DOM


    // document.querySelector('body').appendChild(template);
  }

  const selectorHandler = event =>{
    var target=event.target;

    //console.log(currentTarget.innerHTML);
    
    var text=target.textContent;
    console.log(text);
    
    currentTarget.textContent= text; //currentTarget.innerHTML.substring(0, currentTarget.innerHTML.length-1) +" "+text;

    var elem = document.getElementById('popup-container');
    elem.style.top = '-100px';
    elem.style.left= '-100px';
    elem.classList.remove("show");
    currentTarget=null;
  }

const init = async () =>{

  //fetch("https://mail.google.com/mail/u/0/?ui=2&ik=850f2583c1&jsver=ZlJf2WrtqS0.en..es5&cbl=gmail.pinto-server_20221019.06_p1&rid=ab17..&view=up&act=oepca&_reqid=784159&at=AF6bupOM-DHcOQq0YT40yuSxK_bdTkz2pA&nsc=1&mb=0&rt=j",
  // const response =await fetch("https://cloudsearch.googleapis.com/",    //"https://www.dnd5eapi.co/api/spells",
  // {
  //   method: 'GET', // *GET, POST, PUT, DELETE, etc.
  //   mode: 'cors', // no-cors, *cors, same-origin
  //   cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
  //   //credentials: 'same-origin', // include, *same-origin, omit
  //   //headers: {
  //   //  'Content-Type': 'application/json'
  //     // 'Content-Type': 'application/x-www-form-urlencoded',
  //   //},
  //   //redirect: 'follow', // manual, *follow, error
  //   referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
  //   //body: JSON.stringify(data) // body data type must match "Content-Type" header 
  // });

  // const data = await response.json();
  // console.log(data);

  //.then((response) => response.json())
  //.then((data) => console.log(data));

    keyDownEvent();
    initPopupTemplate();

    var listLi= document.querySelectorAll('#popup-container > .data > span');
    
    listLi.forEach(element => {
        element.addEventListener('click',selectorHandler);
    });
    

    document.querySelector(':root').addEventListener('popup-event',popupEventHandler);
} 


export const main = async () => {
    await init();
}