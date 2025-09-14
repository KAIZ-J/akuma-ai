function openNav(){
        document.querySelector("nav").style.transform="translateX(0%)";
        document.getElementById("close").classList.add("active");
    }
    function closeNav(){
          document.querySelector("nav").style.transform="translateX(-100%)";
        document.getElementById("close").classList.remove("active")
    }
    let greetings = ["What's up","What's on your mind",""]
    const addmessageBtn = document.getElementById("addmessage-btn");
    const ppd = document.getElementById("pro-plan-dialog")
    const chatsHolder= document.getElementById("chats-holder");
    const hab = document.getElementById("header-action-buttons")
        const messagesHolder = document.getElementById("messages-holder")
        const userInput=document.getElementById("user-input");
        function checkInput(elem){
        if(userInput.value===""){
        addmessageBtn.setAttribute("disabled",true)
        }
        else{
          addmessageBtn.removeAttribute("disabled")
        }
      }
        let currentChatId = "";
        let chats = [{chatId:"chat-4543459467",messages:[
            { role: "user", content: "Hello there" },
            { role: "assistant", content: "Hi Fazi,How can i help you" },
            { role: "user", content: "Who invented cellphones?" },
            { role: "assistant", content: "The first handheld mobile phone is credited to Martin Cooper of Motorola." }
        ]}];
        function chatsHolderFx(array){
          chatsHolder.innerHTML=""
          array.forEach(el => {
            if(el.messages[0].role==="user" && el.messages[1].role==="assistant"){
           chatsHolder.innerHTML+=`<button onclick="goToChat(this)" id="${el.chatId}">Chat ${array.length-array.indexOf(el)}</button>`
            }
          });
        }
        chatsHolderFx(chats);
         function goToChat(elem){
          let index = chats.findIndex(el=>el.chatId===elem.id);
          let currentChatObj = chats[index];
          currentChatId = elem.id
          messagesHolder.innerHTML="";
          currentChatObj.messages.forEach(el=>{
            messagesHolder.innerHTML+=`<div class="${el.role==="user"?"":"ai-text-message"}">${el.content}</div>`
             habFx(true);
          })
          
        }
const main = async (userPrompt) => {
  try{
     if(currentChatId===""){
      let obj = {
        chatId:`chat-${Date.now()}`,
        messages:[]
      }
      chats.unshift(obj);
      currentChatId=obj.chatId;
       messagesHolder.innerHTML=""
    }
    console.log(userInput.value)
    messagesHolder.innerHTML+=`<div>${userInput.value}</div>`;
    habFx(true);
     addmessageBtn.setAttribute("disabled",true)
     addmessageBtn.innerHTML=`<div id="loading"><span></span><span></span><span></span></div>`
     let index = chats.findIndex(el=>el.chatId===currentChatId);
          let currentChatObj = chats[index];
    currentChatObj.messages.push({ role: "user", content: userPrompt });
const response = await puter.ai.chat(
  currentChatObj.messages
, { model: "gpt-5-nano" });
currentChatObj.messages.push({ role: "assistant", content: response.message.content });
console.log(response);
let newElement = document.createElement("div");
newElement.className="ai-text-message";
newElement.textContent=response.message.content;
messagesHolder.append(newElement);
newElement.scrollIntoView({behavior:"smooth"})
chatsHolderFx(chats)
addmessageBtn.innerHTML=`<i class="fa-solid fa-arrow-up"></i>`;
  }
  catch(err){
console.log("error fetching problem",err)
  }
  
};

function addMessage(){  
    main(userInput.value);
    userInput.value=""
}
function newChat(){
  messagesHolder.innerHTML=`<h1
        style="
          text-align: center;
          color: #c4c4c4;
          align-self: center;
          justify-self: center;
          margin-top: 150px;
        "
      >
        What's on your mind?
      </h1>`;
  currentChatId="";
  habFx(false)
}
        function habFx(bool){
          bool?hab.innerHTML=`<button type="button" onclick="newChat()" class="hab-btn">
          <i class="fa-solid fa-pen-to-square"></i>
        </button>
        <button class="hab-btn"><i class="fa-solid fa-ellipsis-vertical"></i></button>`:
        hab.innerHTML=`<button type="button" id="pro-btn" onclick="openDialog()">Get Pro <i class="fa-solid fa-wand-magic-sparkles" style="scale: 1;"></i></button>`
        }
        function openDialog(){
          ppd.showModal()
        }
        function closeDialog(elem){
          elem.parentElement.close()
        }