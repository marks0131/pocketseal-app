export interface Thread {
  id: string;
  title: string;
}

export interface MessagePart {
  word: string;
  entity_group: string;
  start: number;
  end: number;
}

export interface Message {
  sender: 'user' | 'ai';
  text: string;
  response?: MessagePart[];
}