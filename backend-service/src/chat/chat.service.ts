import {
  ConnectedSocket,
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { Constant } from '../constants/constant';

@WebSocketGateway({ cors: true })
export class ChatService {
  @WebSocketServer()
  server: Server;
  
  @SubscribeMessage(Constant.SOCHIP_CHAT)
  handleMessage(
    @MessageBody() message: { sender: string, message: string },
    @ConnectedSocket() socket: Socket,
  ) {
    socket.emit(Constant.SOCHIP_CHAT, message);
  }
}