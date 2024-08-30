import {Request, Response} from "express";
import {BlogViewModel} from "../../../IOtypes/blogsTypes";
import {blogsRep} from "../blogsRep";


export async function getBlogsController(req: Request, res: Response<BlogViewModel[]>) {
    //console.log(JSON.stringify(req.query));
    res.json(await blogsRep.getAll()); // Получение сетевых журналов
} // Контролёр, отвечающий за выдачу сетевых журналов
