const searchForm = document.querySelector("#search-form");
const searchFormInput = document.querySelector("#search-form input");
const Back = document.querySelector("#Back");
const Title = document.querySelector("#Title");
const Remove = document.querySelector("#Remove");
const Done = document.querySelector("#Done");
const Textarea = document.querySelector("#Textarea");
const createNote = document.querySelector("#create");
const MemoList=document.getElementById("memolist");
const Select=document.getElementById("sort-select");
const MemoInput=Title.querySelector("input");
const TextInput=Textarea.querySelector("textarea");

const HIDDEN_CLASSNAME = "hidden";


let MEMOMODICAN;

function newNote(event){
    TextInput.value="";
    MemoInput.value="";
    searchForm.classList.add(HIDDEN_CLASSNAME);
    Select.classList.add(HIDDEN_CLASSNAME);
    createNote.classList.add(HIDDEN_CLASSNAME);
    Back.classList.remove(HIDDEN_CLASSNAME);
    Title.classList.remove(HIDDEN_CLASSNAME);
    Remove.classList.remove(HIDDEN_CLASSNAME);
    Done.classList.remove(HIDDEN_CLASSNAME);
    Textarea.classList.remove(HIDDEN_CLASSNAME);
    MemoList.classList.add(HIDDEN_CLASSNAME);
    console.log(MemoInput.value);
    MEMOMODICAN=MemoInput.value;
}
function modiNote(event){
    searchForm.classList.add(HIDDEN_CLASSNAME);
    Select.classList.add(HIDDEN_CLASSNAME);
    createNote.classList.add(HIDDEN_CLASSNAME);
    Back.classList.remove(HIDDEN_CLASSNAME);
    Title.classList.remove(HIDDEN_CLASSNAME);
    Remove.classList.remove(HIDDEN_CLASSNAME);
    Done.classList.remove(HIDDEN_CLASSNAME);
    Textarea.classList.remove(HIDDEN_CLASSNAME);
    MemoList.classList.add(HIDDEN_CLASSNAME);
    MEMOMODICAN=MemoInput.value;
}

function main(event){
    event.preventDefault();
    searchForm.classList.remove(HIDDEN_CLASSNAME);
    createNote.classList.remove(HIDDEN_CLASSNAME);
    Back.classList.add(HIDDEN_CLASSNAME);
    Title.classList.add(HIDDEN_CLASSNAME);
    Remove.classList.add(HIDDEN_CLASSNAME);
    Done.classList.add(HIDDEN_CLASSNAME);
    Textarea.classList.add(HIDDEN_CLASSNAME);
    MemoList.classList.remove(HIDDEN_CLASSNAME);
    location.reload();
}





TextInput.value="";
const Memos_Key="Memos";

let clock=0;
function getClock() {
    const date = new Date();
    const 시간 = date.getHours()
    const 분 = date.getMinutes()
    const 초 = date.getSeconds()
    clock = 시간*60*60+분*60+초;
}


let submitCount = 0;
function handleMemoSumit(event){
    event.preventDefault();
    if(MEMOMODICAN=="")
   {console.log("a"); 
    if (submitCount >= 3) return;
    getClock();
    const time=clock;
    const 새메모=MemoInput.value;
    const 새메모내용=TextInput.value;
    const 수정시간=time;
    TextInput.value="";
    MemoInput.value="";
    const 새메모obj={
        제목:새메모,
        내용:새메모내용,
        시간: 수정시간,
        id:Date.now()
    }
    Memos.push(새메모obj);
    memoShow(새메모obj,새메모obj);
    메모저장();
    submitCount++;}
    else{console.log("b"); 
        메모수정();
    }
   
}


let memoShowCallCount = 0;
function memoShow(새메모,수정시간){
    
    if (memoShowCallCount >= 3) return;
    const 메모=document.createElement("div");
    const span1=document.createElement("h3");
    
    const span2=document.createElement("p");
    span1.classList.add("a");
    메모.classList.add("호호");
    span1.id=새메모.id;
    span2.id=새메모.id;
    메모.appendChild(span1);
    메모.appendChild(span2);
    span1.innerText=새메모.제목;
    span2.innerText = 새메모.시간;
    getClock();
    const 생성된시간 = 새메모.시간;
    if (clock <= 생성된시간 + 60) {
        span2.innerText = "last edited a few seconds ago";
    } else {
        span2.innerText = "last edited a few minutes ago";
    }
    MemoList.appendChild(메모);
    메모.addEventListener("click", 메모찾기);
    메모.addEventListener("click", modiNote);
    memoShowCallCount++;
}


function 메모저장(){
    localStorage.setItem(Memos_Key,JSON.stringify(Memos));
}


function removeMemo(){
    Memos=Memos.filter((memo)=>memo.id!==parseInt(ldiv.id));
    ldiv.remove();
    메모저장();
}


let ldiv;
const M=localStorage.getItem(Memos_Key);
let memos = JSON.parse(M);
function 메모찾기(event){
    const cdiv=event.target;
    ldiv=cdiv;
    console.log(cdiv.id);
    const divid=cdiv.id;
    memos=Memos.filter((memo)=>memo.id===parseInt(cdiv.id));
    console.log(memos);
    console.log(memos[0].제목);
    TextInput.value=memos[0].내용;
    MemoInput.value=memos[0].제목;
}


let Memos=[];
function 메모수정(){
    memos[0].내용=TextInput.value;
    memos[0].제목=MemoInput.value;
    let Memospan=document.getElementById(memos[0].id);
    Memospan.innerText=MemoInput.value;
    console.log(Memospan.innerText);
    getClock();
    const time=clock;
    memos[0].시간=time;
    메모저장();
}

Title.addEventListener("submit",handleMemoSumit);
Back.addEventListener("click",main);
Remove.addEventListener("click",removeMemo);
createNote.addEventListener("click",newNote);

const 새메모=localStorage.getItem(Memos_Key);

if(새메모 !==null){
    const parsedMemos=JSON.parse(새메모);
    Memos=parsedMemos;
    parsedMemos.forEach(memoShow);

}