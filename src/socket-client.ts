import { Manager, Socket } from "socket.io-client";

let socket: Socket;

export const connectToServer = ( token : string) => {

  const manager = new Manager('wss://api-heylinx-develop.mdcloudps.com', {
    extraHeaders: {
      authentication: token
    }
  });

  socket?.removeAllListeners();
  socket = manager.socket('/');

  addListeners( socket );

  return socket;

}

const addListeners = ( socket : Socket) => {

  const serverStatusLabel = document.querySelector<HTMLSpanElement>('#server-status')!;
  const clientsUL = document.querySelector<HTMLUListElement>('#clients-ul')!;
  const messageForm = document.querySelector<HTMLFormElement>('#message-form')!;
  const messageInput = document.querySelector<HTMLInputElement>('#message-input')!;
  const messagesUl = document.querySelector<HTMLUListElement>('#messages-ul')!;



  socket.on('connect', () => {
    serverStatusLabel.innerHTML = 'connected';
  });
   
  socket.on('disconnect', () => {
    serverStatusLabel.innerHTML = 'disconnected';
  });

  socket.on('on-connected', ( clients : string[] ) => {
    console.log(clients)
    let clientsHTML = '';
    clients.forEach( clientId => {
      clientsHTML += `
        <li>${ clientId }</>
      `
    });

    clientsUL.innerHTML = clientsHTML;
  });

  messageForm.addEventListener( 'submit', ( event ) => {
    event.preventDefault();
    if( messageInput.value.trim().length <= 0 ) return;

    socket.emit('sendMessage', {
      message: messageInput.value
     });

     messageInput.value = ''
  });

  socket.on('receiveMessage', ( payload : { name: string, message : string } ) => {
    const newMessage = `
            <li>
                <strong>${ payload.name }</strong>
                <span>${ payload.message }</span>
            </li>
        `;
    const li = document.createElement('li');

    li.innerHTML = newMessage;
    messagesUl.append( li );

  })

}

export const disconnectSocket = ( socket : Socket ) => {
  socket.disconnect()
}