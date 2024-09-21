import {Request, Response} from "express";
import {ReqQuery} from "../../../IOtypes/reqTypes";
import {QueryInputModel} from "../../../IOtypes/queryTypes";
import {Paginator} from "../../../domain/paginator";
import {PostViewModel} from "../../../IOtypes/postsTypes";
import {postsServ} from "../../../domain/postsServ";


export async function getPostsController(req: ReqQuery<QueryInputModel>, res: Response<Paginator<PostViewModel>>) {
    const q = req.query;
    
    res.json(await postsServ.getAll(q.sortBy, q.sortDirection, q.pageNumber, q.pageSize)); // Получение записей
} // Контролёр, отвечающий за выдачу записей
