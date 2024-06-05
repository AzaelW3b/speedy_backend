import Cliente from "../models/Cliente"
import mongoose from "mongoose"

const migrateData = async () => {
    try {
        const clientes = await Cliente.find();

        // Actualiza cada documento
        for (let cliente of clientes) {
            // Añade valores por defecto si los campos no existen
            if (!cliente.numeroCuenta) {
                cliente.numeroCuenta = ''
            }
            if (!cliente.banco) {
                cliente.banco = ''
            }

         
            await cliente.save();
        }

        console.log('Migración completada');
    } catch (err) {
        console.error('Error durante la migración:', err);
    } finally {
        // Cierra la conexión a la base de datos
        mongoose.connection.close();
    }
}

migrateData()