import {Response, NextFunction} from "express";
import {SET} from "../settings";
import {QueryInputModel, SortDirections} from "../IOtypes/queryTypes";
import {EntFields} from "../db/types/typesRepDB";
import {ReqQuery} from "../IOtypes/reqTypes";


function chStr(str: any) {
    return typeof str === "string";
} // Проверка на строку

function checkSB(sb: QueryInputModel["sortBy"]) {
    return chStr(sb) && EntFields.hasOwnProperty(sb);
} // Проверка правильности входящего поля сортировки

function checkSD(sd: QueryInputModel["sortDirection"]) {
    return chStr(sd) && SortDirections.hasOwnProperty(sd);
} // Проверка правильности входящего направления сортировки

function checkPN(pn: QueryInputModel["pageNumber"]) {
    return chStr(pn) && Number.isInteger(+pn) && pn > 0;
} // Проверка правильности входящего номера страницы

function checkPS(ps: QueryInputModel["pageSize"]) {
    return checkPN(ps) && ps < SET.MaxLen.QUERY.PageSize;
} // Проверка правильности входящего размера страницы

export function queryGetMiddleware(req: ReqQuery<QueryInputModel>, res: Response, next: NextFunction) {
    const q = req.query;
    
    if(typeof q.searchNameTerm === "string") {
        const snt = q.searchNameTerm.trim();
        if(!snt || snt.length > SET.MaxLen.BLOG.NAME) q.searchNameTerm = undefined; // Задание исходного значения поискового термина
    } // Проверка правильности входящего поискового термина для имени
    
    if(!checkSB(q.sortBy)) q.sortBy = EntFields.createdAt; // Задание исходного значения поля сортировки
    if(!checkSD(q.sortDirection)) q.sortDirection = SortDirections.desc; // Задание исходного значения направления сортировки

    if(checkPN(q.pageNumber)) q.pageNumber = +q.pageNumber;
    else q.pageNumber = 1; // Задание исходного значения номера страницы

    if(checkPS(q.pageSize)) q.pageSize = +q.pageSize;
    else q.pageSize = 10; // Задание исходного значения размера страницы

    next(); // Передача управления дальше
}
