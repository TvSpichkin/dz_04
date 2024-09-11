import {Request, Response} from "express";
import {BlogViewModel} from "../../../IOtypes/blogsTypes";
import {blogsServ} from "../../../domain/blogsServ";


export async function getBlogsController(req: Request, res: Response<BlogViewModel[]>) {
    console.log(JSON.stringify(req.query));
    //@ts-ignore
    res.json(await blogsServ.getAll()); // Получение сетевых журналов
} // Контролёр, отвечающий за выдачу сетевых журналов
