import { Socket } from 'socket.io-client';
import { connectToServer, } from './socket-client';
import './style.css'

document.querySelector<HTMLDivElement>('#app')!.innerHTML = `
  <div>

    <h2>WebSocket - Client</h2>

    <input id="token-input" placeholder="Json Web Token"/>
    <button id="btn-connect">Connect</button>
    <!-- <button id="btn-disconnect">Disconnect</button> -->

    <br/>
    <br/>

    <span id="server-status">Offline</span>

    <ul id="clients-ul"></ul>

    <form id="message-form">
      <input placeholder="message" id="message-input"/>
    </form>

    <h3>Messages</h3>
    <ul id="messages-ul"></ul>

  </div>
`

//setupCounter(document.querySelector<HTMLButtonElement>('#counter')!)

const inputToken = document.querySelector<HTMLInputElement>('#token-input')!;
const btnConnect = document.querySelector<HTMLButtonElement>('#btn-connect')!;
//const btnDisconnet = document.querySelector<HTMLButtonElement>('#btn-disconnect')!;
var socket : Socket;


btnConnect.addEventListener('click', () => {

  if( inputToken.value.trim().length <= 0 ) return alert('Enter a valid Token');

  socket = connectToServer(inputToken.value.trim());
  setTimeout(() => {
    if( socket.connected == true ) {
      btnConnect.disabled = true;
      //btnDisconnet.disabled = false;
    }
  }, 500);
})

/*btnDisconnet.addEventListener('click', () => {

  disconnectSocket( socket );
  setTimeout(() => {
    if( socket.connected == false ) {
      btnConnect.disabled = false;
      btnDisconnet.disabled = true;
    }
  }, 500);
})*/
