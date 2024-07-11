import {
  ConnectedSocket,
  MessageBody,
  OnGatewayConnection,
  OnGatewayDisconnect,
  OnGatewayInit,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,

} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { Constant } from '../constants/constant';

@WebSocketGateway(Constant.SOCKET_PORT, { cors: true })
export class ChatService implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {
  afterInit(server: Server): any {
    console.log('Websocket server initialized');
  }

  handleConnection(client: Socket, ...args): any {
    console.log(`Client connected: ${client.id}`);
  }

  handleDisconnect(client: Socket): any {
    console.log(`Client disconnected: ${client.id}`);
  }

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