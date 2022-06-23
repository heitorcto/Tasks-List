import mongoose from "mongoose";

async function connect() {
    try {
        await mongoose.connect('mongodb://localhost/ts-app-tarefas');
        console.log(' >> Banco conectado')
    } catch {
        console.log("Erro");
    }
}

export default connect;