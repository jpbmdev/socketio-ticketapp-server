import { v4 as uuid } from "uuid";

class Ticket {
  id: string;
  numero: number;
  escritorio: string | undefined;
  agente: string | undefined;

  constructor(numero: number) {
    this.id = uuid();
    this.numero = numero;
    this.escritorio = undefined;
    this.agente = undefined;
  }
}

export default Ticket;
