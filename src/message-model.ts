// src/utils/messageUtils.ts

import { v4 as uuidv4 } from 'uuid';
import { getDateNowMessageChat } from './utils';
import { IMessage } from './interfaces';


export function createMessageObject(
  roomID: string,
  message: string,
  messageType: string,
  userID: string,
  roomType: string,
): IMessage {
  const myUUID: string = uuidv4().toUpperCase();

  return {
    message_id: myUUID.toUpperCase(),
    id_chat: roomID,
    message: message ,
    type: messageType,
    id_sender: userID,
    media: {},
    status: 'SEND',
    favorite: false,
    date: getDateNowMessageChat(),
    reaction: [],
    type_chat: roomType,
    date_enqueue: getDateNowMessageChat(),
  };
}