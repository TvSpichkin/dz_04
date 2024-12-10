import {Request, Response} from "express";
import {ReqQuery} from "../../../IOtypes/reqTypes";
import {QueryInputModel} from "../../../IOtypes/queryTypes";
import {Paginator} from "../../../domain/paginator";
import {PostViewModel} from "../../../IOtypes/postsTypes";
import {postFields, TypePostFields} from "../../../db/types/postsDbTypes";
import {postsServ} from "../../../domain/postsServ";


export async function getPostsController(req: ReqQuery<QueryInputModel>, res: Response<Paginator<PostViewModel>>) {
    const q = req.query,
    blogId = res.locals.findBlog ? res.locals.findBlog.id : 0, // Идентификатор сетевого журнала
    sortBy = (postFields.hasOwnProperty(q.sortBy) ? q.sortBy : postFields.createdAt) as TypePostFields; // Задание исходного значения поля сортировки

    res.json(await postsServ.getAll(sortBy, q.sortDirection, q.pageNumber, q.pageSize, blogId)); // Получение записей
} // Контролёр, отвечающий за выдачу записей
