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

let username = prompt("Masukkan nama kamu");

function sendMessage(){

let msg = document.getElementById("message").value;

if(msg.trim() === "") return;

db.ref("messages").push({
name: username,
text: msg
});

document.getElementById("message").value = "";

}

db.ref("messages").on("child_added", function(data){

let chat = document.getElementById("chat");

chat.innerHTML += "<p><b>"+data.val().name+":</b> "+data.val().text+"</p>";

chat.scrollTop = chat.scrollHeight;

});

document.getElementById("message").addEventListener("keypress", function(e){
if(e.key === "Enter"){
sendMessage();
}
});