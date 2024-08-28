import {MongoClient} from "mongodb";
import {FLAG} from "../globalVars";
import {SET} from "../settings";


const client = new MongoClient(SET.MongoURI); // Инициализация монгоБД
export const db = client.db("guilds"); // Обращение к БД гильдий

export async function runDB() {
    try {
        await client.connect(); // Подключение данного сервера к базе данных
        console.log("Успешно подключено к монгоБД");
        FLAG.ConnectMongo = true; // Переключение флага подключения к БД
    } catch(e) {
        console.log("Не удалось подключиться к монгоБД: " + e);
        await client.close(); // Завершение подключения к БД
    }
} // Запуск базы данных
