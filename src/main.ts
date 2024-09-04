import { Socket } from 'socket.io-client';
import { changeRoom, connectToServer, userConnect, } from './socket-client';
import './style.css'
import { authenticate } from './auth';
import { listChats, listMessages } from './endpoints';

document.querySelector<HTMLDivElement>('#app')!.innerHTML = `
  <div class="chat_wrapper">

    <h2>Web-Socket - Client</h2>

    <div>
      <div class="auth">
        <h3>Authentication</h3>
        <section>
          <fieldset>
            <input id="email-input" placeholder="Email"/>
            <button id="btn-authenticate">Authenticate</button>
          </fieldset>
          <fieldset>
            <input id="token-input" placeholder="Json Web Token"/>
            <button id="btn-connect">Connect</button>
          </fieldset>
        <h3>Client Status</h3>
        <span id="server-status">Offline</span>
        </section>

        <div class="rooms">
          <section>
            <h3>Private</h3>
            <ul id="private-ul"></ul>
          </section>
          <section>
            <h3>Groups</h3>
            <ul id="group-ul"></ul>
          </section>
          <section>
            <h3>Broadcast</h3>
            <ul id="broadcast-ul"></ul>
          </section>
        </div>

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
const inputEmail = document.querySelector<HTMLInputElement>('#email-input')!;
const btnAuthenticate = document.querySelector<HTMLButtonElement>('#btn-authenticate')!;

const privateUl = document.querySelector<HTMLUListElement>('#private-ul')!;
const groupUl = document.querySelector<HTMLUListElement>('#group-ul')!;
const broadcastUl = document.querySelector<HTMLUListElement>('#broadcast-ul')!;

var socket : Socket;
var id_t4two: string;
var email: string;

function renderChats(organizedChats: { SINGLE: any[], GROUP: any[], BROADCAST: any[] }) {
  privateUl.innerHTML = '';  // Limpiar las listas antes de añadir nuevos elementos
  groupUl.innerHTML = '';
  broadcastUl.innerHTML = '';

  const createChatItem = (chat: any, ulElement: HTMLUListElement) => {
    const li = document.createElement('li');
    li.textContent = chat.name || 'No name';
    li.setAttribute('data-id', chat.id); // Agregar el id de la sala como un atributo data-id

    li.addEventListener('click', async () => {
      const roomId = li.getAttribute('data-id');
      console.log(`Clicked room ID: ${roomId}`);
      changeRoom(roomId!);

      try {
        const messages = await listMessages({ id: roomId });
        renderMessages(messages);
      } catch (error) {
        console.error('Failed to load messages:', error);
      }
      // Aquí puedes realizar alguna acción con el roomId, como unirte a la sala o mostrar mensajes
    });

    ulElement.appendChild(li);
  };

  organizedChats.SINGLE.forEach(chat => createChatItem(chat, privateUl));
  organizedChats.GROUP.forEach(chat => createChatItem(chat, groupUl));
  organizedChats.BROADCAST.forEach(chat => createChatItem(chat, broadcastUl));
}

function renderMessages(messages: any[]) {
  const messagesUl = document.querySelector<HTMLUListElement>('#messages-ul')!;
  messagesUl.innerHTML = '';

  messages.forEach(message => {
    const li = document.createElement('li');
    li.textContent = message.message || 'Empty message'; 
    li.className = message.id_sender === id_t4two ? 'message sent' : 'message received';
    messagesUl.appendChild(li);
  });
}


btnAuthenticate.addEventListener('click', async () => {
  try {
    email = inputEmail.value.trim()
    const data = await authenticate(email);
    inputToken.value = data.data.token;
    id_t4two = data.data.id_user_t4two;
  } catch (error) {
    alert('Authentication failed: ' + error);
  }
});

btnConnect.addEventListener('click', async () => {

  if( inputToken.value.trim().length <= 0 ) return alert('Enter a valid Token');
  const chats = await listChats({ id: id_t4two,  email: email})
  renderChats(chats); 
  socket = connectToServer(inputToken.value.trim());
  userConnect(id_t4two);
  inputToken.value = '';
})
