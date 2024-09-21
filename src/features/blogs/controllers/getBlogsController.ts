import {Request, Response} from "express";
import {ReqQuery} from "../../../IOtypes/reqTypes";
import {QueryInputModel} from "../../../IOtypes/queryTypes";
import {Paginator} from "../../../domain/paginator";
import {BlogViewModel} from "../../../IOtypes/blogsTypes";
import {blogsServ} from "../../../domain/blogsServ";


export async function getBlogsController(req: ReqQuery<QueryInputModel>, res: Response<Paginator<BlogViewModel>>) {
    const q = req.query;
    
    res.json(await blogsServ.getAll(q.searchNameTerm, q.sortBy, q.sortDirection, q.pageNumber, q.pageSize)); // Получение сетевых журналов
} // Контролёр, отвечающий за выдачу сетевых журналов
