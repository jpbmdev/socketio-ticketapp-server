// Servidor de Express
import express from "express";
import { Express, Request, Response } from "express";
import http from "http";
import { Server as socketio } from "socket.io";
import path from "path";
import cors from "cors";

import Sockets from "./sockets";

class Server {
  app: Express;
  port: string | undefined;
  server: http.Server;
  io: socketio;
  sockets: Sockets;

  constructor() {
    this.app = express();
    this.port = process.env.PORT;

    // Http server
    this.server = http.createServer(this.app);

    // Configuraciones de sockets
    this.io = new socketio(this.server, {
      /* configuraciones */
    });

    this.sockets = new Sockets(this.io);
  }

  middlewares() {
    // CORS
    this.app.use(cors());
    
    // Desplegar el directorio público
    this.app.use(express.static(path.resolve(__dirname, "../public")));

    //Get de los ultimos tickets
    this.app.get("/ultimos", (req: Request, res: Response) => {
      res.json({
        ok: true,
        ultimos: this.sockets.ticketList.ultimos13,
      });
    });
  }

  execute() {
    // Inicializar Middlewares
    this.middlewares();

    // Inicializar Server
    this.server.listen(this.port, () => {
      console.log("Server corriendo en puerto:", this.port);
    });
  }
}

export default Server;
