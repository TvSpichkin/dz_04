import {Request, Response} from "express";
import {PostViewModel} from "../../../IOtypes/postsTypes";
import {postsRep} from "../../../domain/postsServ";


export async function getPostsController(req: Request, res: Response<PostViewModel[]>) {
    res.json(await postsRep.getAll()); // Получение записей
} // Контролёр, отвечающий за выдачу записей
