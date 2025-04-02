let gomb=document.getElementById("send")
const message= document.getElementById("message")
const messages = document.getElementById("messages")

const api="https://chatworld-42a91-default-rtdb.europe-west1.firebasedatabase.app/messages.json"


console.log("Gomb:", gomb)

gomb.addEventListener(
  'click', sendMessage
)

async function sendMessage(){
  console.log("Value",message.value)
  const body={
    user:"Attila",
    message: message.value,
    date: Date.now()
  }

  const response = await fetch(api, {
    method:"POST",
    body: JSON.stringify(body)
  })
  message.value=""
  // console.log("Startus:",response.status)

}

async function getAll(){
  const response = await fetch(api)
  const json= await response.json()
  // console.log(json)
  messages.innerHTML=""
  for (const key in json) {
   
      const element = json[key]
      // console.log(element)
      const div= document.createElement("div")
      const date = new Date(element.date).toLocaleTimeString()
      div.innerHTML=`${date} ${element.user}: ${element.message}`

      messages.appendChild(div)
    
  }
}

getAll()
setInterval(getAll,1500)