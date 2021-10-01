// Server Model: Contiene todo el servidor de express + socket.io configurado
import Server from "./models/server";

// Paquete para leer y establecer las variables de entorno
require("dotenv").config();

// Inicializar la instancia del server
const server = new Server();

// Ejecutar el server
server.execute();
