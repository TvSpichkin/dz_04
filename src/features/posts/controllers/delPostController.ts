import {Response} from "express";
import {PostIdModel} from "../../../IOtypes/postsTypes";
import {ReqParam} from "../../../IOtypes/reqTypes";
import {postsRep} from "../postsRep";


export async function delPostController(req: ReqParam<PostIdModel>, res: Response) {
    await postsRep.del(req.params.id); // Удаление выбранной записи
    res.sendStatus(204); // Отправка успешного состояния «нет содержимого»
} // Контролёр, отвечающий за удаление выбранной записи
