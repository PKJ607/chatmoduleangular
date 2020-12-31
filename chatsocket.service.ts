import { Injectable, Optional } from '@angular/core';
import { Socket } from 'ngx-socket-io';
export class ChatSetting {
  send_chat_channel = '';
  receive_chat_channel = '';
}
export class ChatConfig {
  authName: any = {};
  send_chat_channel: any = ''
  receive_chat_channel: any = ''
  constructor(@Optional() config?: ChatSetting) {
    if (config) {
      this.send_chat_channel = config.send_chat_channel;
      this.receive_chat_channel = config.receive_chat_channel;
    }

  }
}
@Injectable({
  providedIn: 'root'
})
export class ChatSocketService {
  config: any = {}
  constructor(private socket: Socket) { }
  sendMessage(event = 'message', msg: any) {
    this.socket.emit(event, msg);
  }
  getMessage(event = 'notification') {
    return this.socket
      .fromEvent(event);
  }
}
