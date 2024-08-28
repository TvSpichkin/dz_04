import express, {Response} from "express";
import {setDB} from "../../db/repository/repDB";


export const testRout = express.Router(); // Объявление маршрутизатора тестирования

testRout.delete('/all-data', async (req, res: Response) => {
    await setDB(); // Очистка базы данных для начала тестирования

    res.sendStatus(204); // Отправка успешного состояния «нет содержимого»
}); // Удаление всего содержимого БД
