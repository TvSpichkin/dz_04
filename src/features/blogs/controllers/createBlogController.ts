import {Response} from "express";
import {BlogInputModel, BlogViewModel} from "../../../IOtypes/blogsTypes";
import {ReqBody} from "../../../IOtypes/reqTypes";
import {blogsServ} from "../../../domain/blogsServ";


export async function createBlogController(req: ReqBody<BlogInputModel>, res: Response<BlogViewModel>) {
    const newBlog = await blogsServ.create(req.body); // Создание сетевого журнала

    res.status(201).json(newBlog); // Возврат созданного сетевого журнала
} // Контролёр, отвечающий за создание и возврат сетевого журнала
