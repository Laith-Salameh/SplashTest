// src/chat/chat.gateway.ts
import { WebSocketGateway, SubscribeMessage, MessageBody, WebSocketServer, OnGatewayConnection, OnGatewayDisconnect } from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { ChatService } from './Services/chat/chat.service';
import { Inject } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { GameService, UserService } from './Services';
import { createUserDto } from './Services/user/userDtos';
import { v4 as uuidv4 } from 'uuid';


const connectedUsers: { [guid: string]: string } = {}; 
const clients: {[guid: string]: Socket}= {}
const rooms: { [roomId: string]: string[] } = {};


@WebSocketGateway({  cors: { origin: '*' , methods:["GET","POST"] }, transport:"websocket"})
export class GameEngineGateway implements OnGatewayConnection,OnGatewayDisconnect{
  @WebSocketServer()
  server: Server;


  constructor(
    @Inject(ChatService) private readonly chatService: ChatService,
    @Inject(UserService) private readonly userService: UserService,
    @Inject(GameService) private readonly gameService: GameService,

    private readonly configService: ConfigService
  ) {}
  
  handleConnection(client: Socket) {
    console.info('Client connected:', client.id);
    clients[client.id] = client;
  }


  handleDisconnect(client: Socket) {
    const roomId = connectedUsers[client.id];
    rooms[roomId] = rooms[roomId]?.filter(x => x !== client.id) ?? [];
    delete clients[client.id];
    delete connectedUsers[client.id];
  }


  @SubscribeMessage('chat-message')
  async handleMessage(@MessageBody() data: { message: string, userId: string }) {
    const client = clients[data.userId];
    const user = await this.userService.getUser(data.userId);
    if(!user) client.emit('chat-message-error', "User not found");
    const roomId = connectedUsers[data.userId];

    const chat = await this.chatService.create({
      gameId: roomId,
      message: data.message,
      senderUserId: data.userId,
    });

    this.server.to(roomId).emit('chat-message', { ...chat }); 
    return chat;
  }



  @SubscribeMessage('joinRoom')
  async handleJoinRoom(@MessageBody() data: { userName: string, userId: string }) {
    const user: createUserDto = {
      userId: data.userId,
      userName: data.userName,
      score: 1000
    };
    console.info(`User ${user.userName} registered with session ID ${data.userId}`);
    const client = clients[data.userId];

    try {
      const userGuid = user.userId
      await this.userService.createUser(user); 
      
      const MaxRoomSize = this.configService.get<number>("Max_Room_Size") || 5;
      const existingRoomId = Object.keys(rooms).find((roomId) => rooms[roomId].length < MaxRoomSize);

      if (existingRoomId) {
        rooms[existingRoomId].push(userGuid); // Join existing room
        client.join(existingRoomId);
        this.server.to(existingRoomId).emit('user-joined', { userName: user.userName }); // Notify other users in the room
        connectedUsers[client.id] = existingRoomId;
        client.emit('join-room-success', { ...user, gameId: existingRoomId });
      } else {
        const roomId = uuidv4(); // Generate new room ID if no existing room
        rooms[roomId] = [userGuid];
        const newGame = this.gameService.createGame(roomId, userGuid);
        connectedUsers[client.id] = roomId;
        client.join(roomId);
        client.emit('join-room-success', { ...user, gameId: roomId });
      }
    } catch (error) {
      console.error(error)
      client.emit('join-room-error', "error joining room, try again");
    }
  }



}
