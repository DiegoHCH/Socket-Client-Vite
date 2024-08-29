import { Socket } from 'socket.io-client';
import { connectToServer, } from './socket-client';
import './style.css'

document.querySelector<HTMLDivElement>('#app')!.innerHTML = `
  <div class="chat_wrapper">

    <h2>Web-Socket - Client</h2>

    <div>
      <div class="auth">
        <h3>Authentication</h3>
        <section>
          <fieldset>
            <input id="token-input" placeholder="Email"/>
            <button id="btn-connect">Authenticate</button>
          </fieldset>
          <span id="token-response"></span>
          <fieldset>
            <input id="token-input" placeholder="Json Web Token"/>
            <button id="btn-connect">Connect</button>
          </fieldset>
        <h3>Client Status</h3>
        <span id="server-status">Offline</span>
        </section>

        <h3>Connected</h3>
        <section>
          <ul id="clients-ul"></ul>
        </section>

      </div>

      <div class="chat"> 
        <h3>Messages</h3>
        <div class="messages-container">
          <ul id="messages-ul">
            <!-- <li class="message sent">This is my message</li> -->
            <!-- <li class="message received">This is a message from another user</li> -->
          </ul>
        </div>
        <form id="message-form">
          <fieldset>
            <input placeholder="message" id="message-input"/>
            <button class='send'>Send</button>
          </fieldset>
        </form>
      </div>

    </div>
  </div>
`

const inputToken = document.querySelector<HTMLInputElement>('#token-input')!;
const btnConnect = document.querySelector<HTMLButtonElement>('#btn-connect')!;
var socket : Socket;


btnConnect.addEventListener('click', () => {

  if( inputToken.value.trim().length <= 0 ) return alert('Enter a valid Token');

  socket = connectToServer(inputToken.value.trim());
})
