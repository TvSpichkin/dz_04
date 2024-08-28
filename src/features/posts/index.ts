import express from "express";
import {getPostsController} from "./controllers/getPostsController";
import {findPostValidator, postValidators} from "./middlewares/postValidators";
import {findPostController} from "./controllers/findPostController";
import {createPostController} from "./controllers/createPostController";
import {adminMiddleware} from "../../globalMiddlewares/adminMiddleware";
import {delPostController} from "./controllers/delPostController";
import {putPostController} from "./controllers/putPostController";


export const postsRout = express.Router(); // Объявление маршрутизатора записей

postsRout.get("/", getPostsController); // Возврат всех записей
postsRout.get("/:id", findPostValidator, findPostController); // Возврат записи по идентификатору
postsRout.post('/', ...postValidators, createPostController); // Создание записи
postsRout.delete('/:id', findPostValidator, adminMiddleware,  delPostController); // Удаление записи
postsRout.put('/:id', findPostValidator, ...postValidators, putPostController); // Изменение записи
