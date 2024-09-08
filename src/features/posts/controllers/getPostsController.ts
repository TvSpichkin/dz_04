import {Request, Response} from "express";
import {PostViewModel} from "../../../IOtypes/postsTypes";
import {postsServ} from "../../../domain/postsServ";


export async function getPostsController(req: Request, res: Response<PostViewModel[]>) {
    res.json(await postsServ.getAll()); // Получение записей
} // Контролёр, отвечающий за выдачу записей
