import { OnGatewayConnection,  WebSocketGateway, WebSocketServer } from "@nestjs/websockets";
import { Server, Socket } from "socket.io";

@WebSocketGateway()
export class EventsGateway implements OnGatewayConnection {
  @WebSocketServer() server: Server;

  async handleConnection(client: Socket) {
    client.join(client.handshake.query.authorization);
    this.server.emit("content", ["guest", "user", "supervisor", "admin"]);
  }
}