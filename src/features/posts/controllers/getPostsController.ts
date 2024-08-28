import {Request, Response} from "express";
import {PostViewModel} from "../../../IOtypes/postsTypes";
import {postsRep} from "../postsRep";


export async function getPostsController(req: Request, res: Response<PostViewModel[]>) {
    res.json(await postsRep.getAll()); // Получение записей
} // Контролёр, отвечающий за выдачу записей
