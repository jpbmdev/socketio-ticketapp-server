import { Server } from "socket.io";
import TicketList from "./ticket-list";
import Ticket from "./ticket";

class Sockets {
  io: Server;
  ticketList: TicketList;

  constructor(io: Server) {
    this.io = io;

    this.ticketList = new TicketList();

    this.socketEvents();
  }

  socketEvents() {
    // On connection
    this.io.on("connection", (socket) => {
      console.log("cliente conectado");

      socket.on(
        "solicitar-ticket",
        //El segunto paramaetro de esta funcion es una funcion del front y se ejecuta en el front :v
        (_: any, callback: (ticket: Ticket) => void) => {
          const nuevoTicket = this.ticketList.crearTicket();
          callback(nuevoTicket);
        }
      );
      socket.on(
        "siguiente-ticket-trabajar",
        (
          usuario: { agente: string; escritorio: string },
          callback: (ticket: Ticket | null) => void
        ) => {
          const { agente, escritorio } = usuario;
          const suTicket = this.ticketList.asignarTicket(agente, escritorio);
          callback(suTicket);
          this.io.emit("ticket-asignado", this.ticketList.ultimos13);
        }
      );
    });
  }
}

export default Sockets;
