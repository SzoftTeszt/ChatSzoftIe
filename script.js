import { initializeApp } from "https://www.gstatic.com/firebasejs/11.6.0/firebase-app.js";

const firebaseConfig = {
  apiKey: "AIzaSyBGI9jrUNOimGa5rTub0NCG9uURJhX1cJE",
  authDomain: "chatworld-42a91.firebaseapp.com",
  databaseURL: "https://chatworld-42a91-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "chatworld-42a91",
  storageBucket: "chatworld-42a91.firebasestorage.app",
  messagingSenderId: "592866834390",
  appId: "1:592866834390:web:fe20ce5caf8a13b1611677",
  measurementId: "G-S12WG5QJ9T"
};

const app= initializeApp(firebaseConfig)

import { getAuth, GoogleAuthProvider, signInWithPopup, signOut, onAuthStateChanged  } 
from "https://www.gstatic.com/firebasejs/11.6.0/firebase-auth.js";

let gomb=document.getElementById("send")
const message= document.getElementById("message")
const messages = document.getElementById("messages")

const googleBtn = document.getElementById("google")
const signOutBtn = document.getElementById("signout")

const api="https://chatworld-42a91-default-rtdb.europe-west1.firebasedatabase.app/messages.json"

const auth= getAuth()
const gProvider= new GoogleAuthProvider()

let loggedUser={}

googleBtn.onclick=signInWithGoogle
signOutBtn.onclick = logOut

function signInWithGoogle(){
  signInWithPopup(auth, gProvider)
}

function logOut(){
  signOut(auth)
}

onAuthStateChanged(auth, user =>{
  // console.log("User: ", user.email)
 loggedUser = {...user}
  // console.log("User: ", loggedUser)
  if (!user){
    signOutBtn.classList.add("d-none")

    googleBtn.classList.remove("d-none")
    googleBtn.classList.add("d-block")

  }
  else{
    signOutBtn.classList.remove("d-none")
    signOutBtn.classList.add("d-block")

    googleBtn.classList.remove("d-block")
    googleBtn.classList.add("d-none")
  } 
})

console.log("Gomb:", gomb)

gomb.addEventListener(
  'click', sendMessage
)

async function sendMessage(){
  console.log("Value",message.value)
  const body={
    user:loggedUser.email,
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