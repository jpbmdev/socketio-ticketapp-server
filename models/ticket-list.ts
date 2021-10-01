import Ticket from "./ticket";

class TicketList {
  ultimoNumero: number;
  pendientes: Ticket[];
  asignados: Ticket[];
  constructor() {
    this.ultimoNumero = 0;
    this.pendientes = []; //Esto se usa como una cola v:
    this.asignados = [];
  }
  get siguienteNumero() {
    this.ultimoNumero++;
    return this.ultimoNumero;
  }

  get ultimos13() {
    return this.asignados.slice(0, 13);
  }

  crearTicket() {
    const nuevoTicket = new Ticket(this.siguienteNumero);
    this.pendientes.push(nuevoTicket);
    return nuevoTicket;
  }

  asignarTicket(agente: string, escritorio: string) {
    if (this.pendientes.length === 0) {
      return null;
    }

    const siguienteTicket = this.pendientes.shift();

    if (!siguienteTicket) {
      return null;
    }

    siguienteTicket.agente = agente;
    siguienteTicket.escritorio = escritorio;

    this.asignados.unshift(siguienteTicket);

    return siguienteTicket;
  }
}

export default TicketList;
