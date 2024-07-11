import {
  ConnectedSocket,
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { Constant } from '../constants/constant';

@WebSocketGateway(Constant.SOCKET_PORT, { cors: true })
export class ChatService {
  @WebSocketServer()
  server: Server;
  
  @SubscribeMessage(Constant.SOCHIP_CHAT)
  handleMessage(
    @MessageBody() message: any,
    @ConnectedSocket() socket: Socket,
  ): void {
    this.server.emit(Constant.SOCHIP_CHAT, message);
  }
}