import { Manager, Socket } from "socket.io-client";
import { createMessageObject } from './message-model';
import { IMessage } from './interfaces';

let socket: Socket;
let currentRoomId: string | null = null;
let currentRoomType: string | null = null;
let id_user: string | null = null;

export const connectToServer = ( token : string) => {

  const manager = new Manager('wss://api-heylinx-develop.mdcloudps.com', {
    extraHeaders: {
      authentication: token
    }
  });

  socket?.removeAllListeners();
  socket = manager.socket('/');

  addListeners();

  return socket;

}

const addListeners = ( ) => {

  const serverStatusLabel = document.querySelector<HTMLSpanElement>('#server-status')!;
  const messageForm = document.querySelector<HTMLFormElement>('#message-form')!;
  const messageInput = document.querySelector<HTMLInputElement>('#message-input')!;



  socket.on('connect', () => {
    serverStatusLabel.innerHTML = 'connected';
  });
   
  socket.on('disconnect', () => {
    serverStatusLabel.innerHTML = 'disconnected';
  });

  messageForm.addEventListener( 'submit', ( event ) => {
    event.preventDefault();
    if( messageInput.value.trim().length <= 0 ) return;

    const payload = createMessageObject( currentRoomId!, messageInput.value, '100', id_user!, currentRoomType!);

    socket.emit('sendMessage',  payload );

     messageInput.value = ''
  });

  socket.on('receiveMessage', ( payload : { id_sender: string, message: string, id_chat: string } ) => {
    console.log('Message received:', payload.message);
    console.log('Sender ID:', payload.id_sender);
    appendMessage(payload);  })

}

export const disconnectSocket = ( socket : Socket ) => {
  socket.disconnect()
}

export const changeRoom = (roomId: string, roomType: string) => {
  currentRoomId = roomId;
  currentRoomType = roomType;
}

export const userConnect = (id: string) => {
  id_user = id;
}

function appendMessage(message: any) {
  const messagesUl = document.querySelector<HTMLUListElement>('#messages-ul')!;

  const li = document.createElement('li');
  li.textContent = message.message || 'Empty message';
  li.className = message.id_sender === id_user ? 'message sent' : 'message received';
  messagesUl.appendChild(li);
}