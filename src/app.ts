import express, {Request, Response} from "express";
import {SET} from "./settings";
import {blogsRout} from "./features/blogs";
import {postsRout} from "./features/posts";
import {testRout} from "./features/testing";

export const app = express(); // Определение экспресс приложения
app.use(express.json()); // Cоздание свойств-объектов тела и вопросов во всех запросах


app.get("/", (запр: Request, отв: Response) => {
    //console.log("pass = '" + SET.ADMIN + "'");
    отв.send("Servak rabotaet");
}); // Проверка успешного запуска сервера

app.use(SET.PATH.BLOGS, blogsRout); // Подключение маршрутизатора сетевых журналов
app.use(SET.PATH.POSTS, postsRout); // Подключение маршрутизатора записей
app.use(SET.PATH.TESTING, testRout); // Подключение маршрутизатора тестирования
