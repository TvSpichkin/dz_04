import {Response} from "express";
import {BlogIdModel, BlogInputModel} from "../../../IOtypes/blogsTypes";
import {ReqParamBody} from "../../../IOtypes/reqTypes";
import {blogsRep} from "../../../domain/blogsServ";


export async function putBlogController(req: ReqParamBody<BlogIdModel, BlogInputModel>, res: Response) {
    await blogsRep.put(req.body, req.params.id); // Изменение выбранного сетевого журнала
    res.sendStatus(204); // Отправка успешного состояния «нет содержимого»
} // Контролёр, отвечающий за изменение выбранного сетевого журнала
