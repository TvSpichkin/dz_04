import {Response, NextFunction} from "express";
import {ReqParam} from "../../../IOtypes/reqTypes";
import {body} from "express-validator";
import {postsServ} from "../../../domain/postsServ";
import {blogsServ} from "../../../domain/blogsServ";
import {adminMiddleware} from "../../../globalMiddlewares/adminMiddleware";
import {inputCheckErrorsMiddleware} from "../../../globalMiddlewares/inputCheckErrorsMiddleware";
import {SET} from "../../../settings";
import {addBlogId} from "./addBlogId";


async function checkExistBlog(blogId: string) {
    const findBlog = await blogsServ.find(blogId); // Поиск сетевого журнала
    
    if(!findBlog) return Promise.reject(); // Возврат обещания
} // Проверка существования заданного сетевого журнала

const titleValidator = body("title").isString().withMessage("Название не является строкой")
        .trim().isLength({min: 1, max: SET.MaxLen.POST.TITLE})
        .withMessage("Название содержит больше " + SET.MaxLen.POST.TITLE + " символов или является пустым"), // Проверка правильности входящего названия
    shortDescriptionValidator = body("shortDescription").isString().withMessage("Краткое описание не является строкой")
        .trim().isLength({min: 1, max: SET.MaxLen.POST.ShortDescription})
        .withMessage("Краткое описание содержит больше " + SET.MaxLen.POST.ShortDescription + " символов или является пустым"), // Проверка правильности входящего краткого описания
    contentValidator = body("content").isString().withMessage("Содержание не является строкой")
        .trim().isLength({min: 1, max: SET.MaxLen.POST.CONTENT})
        .withMessage("Содержание содержит больше " + SET.MaxLen.POST.CONTENT + " символов или является пустым"), // Проверка правильности входящего содержания
    blogIdValidator = body("blogId").isString().withMessage("Идентификатор сетевого журнала не является строкой")
        .trim().custom(checkExistBlog).withMessage("Сетевого журнала, с введённым идентификатором, не существует"); // Проверка правильности входящего идентификатора сетевого журнала

export async function findPostValidator(req: ReqParam<{id: string}>, res: Response, next: NextFunction) {
    if(+req.params.id > 0 && Number.isInteger(+req.params.id)) {
        const findPost = await postsServ.find(req.params.id); // Поиск записи
        if(findPost) {
            res.locals.findPost = findPost; // Сохранение найденной записи
            next(); // Передача управления дальше
        }
        else res.sendStatus(404); // Если не найдено, то возрат 404 статуса
    }
    else res.sendStatus(404); // Если идентификатор не натуральный, то возрат 404 статуса
} // Проверка существования искомой записи

export const postValidators = [
    adminMiddleware,
    
    titleValidator,
    shortDescriptionValidator,
    contentValidator,
    blogIdValidator,

    inputCheckErrorsMiddleware
]; // Набор проверок для создания и изменения записей

export const postValWithoutBID = [
    adminMiddleware,

    titleValidator,
    shortDescriptionValidator,
    contentValidator,
    addBlogId,

    inputCheckErrorsMiddleware
]; // Набор проверок для создания и изменения записей без идентификатора текущего сетевого журнала
