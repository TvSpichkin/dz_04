import {Response} from "express";
import {PostIdModel, PostViewModel} from "../../../IOtypes/postsTypes";
import {ReqParam} from "../../../IOtypes/reqTypes";
import {postsServ} from "../../../domain/postsServ";


export async function findPostController(req: ReqParam<PostIdModel>, res: Response<PostViewModel>) {
    res.json(await postsServ.maper(res.locals.findPost)); // Получение искомого записи
} // Контролёр, отвечающий за выдачу искомого записи
