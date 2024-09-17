import {Request, Response, NextFunction} from "express";
import {SET} from "../settings";
import {EntDbType} from "../db/types/typesRepDB";
import {QueryInputModel, sortByFields, SortDirections} from "../IOtypes/queryTypes";
import { ReqQuery } from "../IOtypes/reqTypes";


function checkSB(sb: QueryInputModel["sortBy"]) {
    if(typeof sb === "string" && sortByFields.hasOwnProperty(sb)) return true;
    return false;
} // Проверка правильности входящего поля сортировки

function checkSD(sd: QueryInputModel["sortDirection"]) {
    if(typeof sd === "string" && SortDirections.hasOwnProperty(sd)) return true;
    return false;
} // Проверка правильности входящего направления сортировки

function checkPN(pn: QueryInputModel["pageNumber"]) {
    if(typeof pn === "string" && Number.isInteger(+pn)) return true;
    return false;
} // Проверка правильности входящего номера страницы

export function queryGetMiddleware(req: ReqQuery<QueryInputModel>, res: Response, next: NextFunction) {
    var q = req.query;
    
    if(typeof q.searchNameTerm === "string") {
        let snt = q.searchNameTerm.trim();
        if(!snt || snt.length > SET.MaxLen.BLOG.NAME) q.searchNameTerm = undefined; // Задание исходного значения поискового термина
    } // Проверка правильности входящего поискового термина для имени
    
    if(!checkSB(q.sortBy)) q.sortBy = sortByFields.createdAt; // Задание исходного значения для поля сортировки
    if(!checkSD(q.sortDirection)) q.sortDirection = SortDirections.desc; // Задание исходного значения для направления сортировки
    
    if(checkPN(q.pageNumber)) q.pageNumber = +q.pageNumber;
    else q.pageNumber = 1; // Задание исходного значения для номера страницы
    
    next(); // Передача управления дальше
}
