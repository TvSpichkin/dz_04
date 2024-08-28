import {agent} from "supertest";
import {app} from "../../src/app";
import {SET} from "../../src/settings";


export const req = agent(app), // Определение запроса для тестирования программы
    getBlog = req.get(SET.PATH.BLOGS), // Запрос на получение всех сетевых журналов
    getPost = req.get(SET.PATH.POSTS); // Запрос на получение всех записей
