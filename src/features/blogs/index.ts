import express from "express";
import {getBlogsController} from "./controllers/getBlogsController";
import {findBlogValidator, blogValidators} from "./middlewares/blogValidators";
import {findBlogController} from "./controllers/findBlogController";
import {createBlogController} from "./controllers/createBlogController";
import {adminMiddleware} from "../../globalMiddlewares/adminMiddleware";
import {delBlogController} from "./controllers/delBlogController";
import {putBlogController} from "./controllers/putBlogController";


export const blogsRout = express.Router(); // Объявление маршрутизатора сетевых журналов

blogsRout.get("/", getBlogsController); // Возврат всех сетевых журналов
blogsRout.get("/:id", findBlogValidator, findBlogController); // Возврат сетевого журнала по идентификатору
blogsRout.post('/', ...blogValidators, createBlogController); // Создание сетевого журнала
blogsRout.delete('/:id', findBlogValidator, adminMiddleware,  delBlogController); // Удаление сетевого журнала
blogsRout.put('/:id', findBlogValidator, ...blogValidators, putBlogController); // Изменение сетевого журнала
