const firebaseConfig = {
  apiKey: "AIzaSyCkFg02rzVO_yEEjTef-ZaReM5it9HNeQI",
  authDomain: "kelas-chat.firebaseapp.com",
  databaseURL: "https://kelas-chat-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "kelas-chat",
  storageBucket: "kelas-chat.firebasestorage.app",
  messagingSenderId: "935794592212",
  appId: "1:935794592212:web:d7cbda32576e983f806e41",
};

firebase.initializeApp(firebaseConfig);

const db = firebase.database();

const typingRef = db.ref("typing");

let username = localStorage.getItem("username");

if (Notification.permission !== "granted") {
Notification.requestPermission();
}

if(!username){
username = prompt("Masukkan Jenengmu");
localStorage.setItem("username", username)
}

if(!username || username.trim() === ""){
username = "Anonymous";
}

function sendMessage(){

let msg = document.getElementById("message").value;

if(msg.trim() === "") return;

if(msg.length > 200){
alert("Pesanmu kedawan");
return;
}

db.ref("messages").push({
name: username,
text: msg,
time: new Date().toLocaleTimeString([], {hour: '2-digit', minute: '2-digit'})
});

document.getElementById("message").value = "";

}

db.ref("messages").on("child_added", function(data){

let chat = document.getElementById("chat");
let notif = document.getElementById("notifSound");

let messageClass = "other";

if(data.val().name === username){
    messageClass = "me";
}else{
notif.play().catch(()=>{});
}

if(data.val().name !== username){

if(document.hidden){

new Notification(data.val().name + " said:", {
body: data.val().text
});

}

}

chat.innerHTML += `
<div class="message ${messageClass}">
<span class="username">${data.val().name}</span>
<div class="text">${data.val().text}</div>
<div class="time">${data.val().time}</div>
</div>
`;

chat.scrollTop = chat.scrollHeight;

});

document.getElementById("message").addEventListener("keypress", function(e){
if(e.key === "Enter"){
sendMessage();
}
});

document.getElementById("message").focus();

document.getElementById("message").addEventListener("input", function(){

typingRef.set(username);

setTimeout(() => {
typingRef.set("");
}, 1000);

});

typingRef.on("value", function(snapshot){

let typing = snapshot.val();

if(typing && typing !== username){
document.getElementById("typing").innerText = typing + " isih mengetik...";
}else{
document.getElementById("typing").innerText = "";
}

});