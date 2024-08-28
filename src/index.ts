import {app} from "./app";
import {runDB} from "./db/db";
import {SET} from "./settings";


async function startApp() {
    await runDB(); // Подключение к БД
    app.listen(SET.PORT, () => {
        console.log("Сервер доступен по адресу " + "МП" + " и случшает порт " + SET.PORT);
    }); // Запуск сервера на указанном порту
} // Инициализация запуска серверной программы

startApp(); // Запуск данной серверной программы
