import {Response, NextFunction} from "express";
import {ReqBody} from "../../../IOtypes/reqTypes";
import {PostInputModel} from "../../../IOtypes/postsTypes";


export async function addBlogId(req: ReqBody<PostInputModel>, res: Response, next: NextFunction) {
    if(res.locals.findBlog) {
        req.body.blogId = "" + res.locals.findBlog.id; // Добавление найденного идентификатора
        next(); // Передача управления дальше
    }
    else res.sendStatus(404); // Если не найдено, то возрат 404 статуса
} // Добавление идентификатора текущего сетевого журнала при создании записи
