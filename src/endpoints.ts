

export async function listChats( payload: any ): Promise<any> {
  console.log(JSON.stringify(payload));
  const response = await fetch('https://api-t4two-develop.wiedii.co/conversations/api/v1/get_list_chat', {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ id : payload.id, email: payload.email })
  });

  if (!response.ok) {
    throw new Error('Failed to listChats');
  }

  const data = await response.json();

  const chats: { SINGLE: any[]; GROUP: any[]; BROADCAST: any[] } = {
    SINGLE: [],
    GROUP: [],
    BROADCAST: []
  };

  data.data.chats.forEach((chat: any) => {
    const chatType = chat.type as 'SINGLE' | 'GROUP' | 'BROADCAST';
    if (chats[chatType]) {
      chats[chatType].push(chat);
    }
  });

  return chats;
}

export async function listMessages( payload: any ): Promise<any> {
  console.log(JSON.stringify(payload));
  const response = await fetch('https://api-t4two-develop.wiedii.co/conversations/api/v1/get_conversations', {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ id_chat : payload.id })
  });

  if (!response.ok) {
    throw new Error('Failed to list Messages');
  }

  const data = await response.json();
  const messages = data.data;

  return messages;
}

