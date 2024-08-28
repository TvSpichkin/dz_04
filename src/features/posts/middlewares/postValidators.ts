import {Request, Response, NextFunction} from "express";
import {body} from "express-validator";
import {postsRep} from "../postsRep";
import {blogsRep} from "../../blogs/blogsRep";
import {adminMiddleware} from "../../../globalMiddlewares/adminMiddleware";
import {inputCheckErrorsMiddleware} from "../../../globalMiddlewares/inputCheckErrorsMiddleware";


async function checkExistBlog(blogId: string) {
    const findBlog = await blogsRep.find(blogId); // Поиск сетевого журнала

    if(!findBlog) return Promise.reject(); // Возврат обещания
} // Проверка существования заданного сетевого журнала

const titleValidator = body("title").isString().withMessage('Название не является строкой')
        .trim().isLength({min: 1, max: 30}).withMessage('Название содержит больше 30 символов или является пустым'), // Проверка правильности входящего названия
    shortDescriptionValidator = body("shortDescription").isString().withMessage('Краткое описание не является строкой')
        .trim().isLength({min: 1, max: 100}).withMessage('Краткое описание содержит больше 100 символов или является пустым'), // Проверка правильности входящего краткого описания
    contentValidator = body("content").isString().withMessage('Содержание не является строкой')
        .trim().isLength({min: 1, max: 1000}).withMessage('Содержание содержит больше 1000 символов или является пустым'), // Проверка правильности входящего содержания
    blogIdValidator = body("blogId").isString().withMessage('Идентификатор сетевого журнала не является строкой')
        .trim().custom(checkExistBlog).withMessage('Сетевого журнала, с введённым идентификатором, не существует'); // Проверка правильности входящего идентификатора сетевого журнала

export async function findPostValidator(req: Request<{id: string}>, res: Response, next: NextFunction) {
    const findPost = await postsRep.find(req.params.id); // Поиск записи
    if(!findPost) res.sendStatus(404); // Если не найдено, то возрат 404 статуса
    else {
        res.locals.findPost = findPost; // Сохранение найденной записи
        next(); // Передача управления дальше
    }
} // Проверка существования искомой записи

export const postValidators = [
    adminMiddleware,

    titleValidator,
    shortDescriptionValidator,
    contentValidator,
    blogIdValidator,

    inputCheckErrorsMiddleware
]; // Набор проверок для создания и изменения записей
