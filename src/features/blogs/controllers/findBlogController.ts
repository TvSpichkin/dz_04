import {Response} from "express";
import {BlogIdModel, BlogViewModel} from "../../../IOtypes/blogsTypes";
import {ReqParam} from "../../../IOtypes/reqTypes";
import {blogsServ} from "../../../domain/blogsServ";


export async function findBlogController(req: ReqParam<BlogIdModel>, res: Response<BlogViewModel>) {
    res.json(await blogsServ.maper(res.locals.findBlog)); // Получение искомого сетевого журнала
} // Контролёр, отвечающий за выдачу искомого сетевого журнала
