import {Request, Response, NextFunction} from "express";
import {SET} from "../settings";
import {EntDbType} from "../db/types/typesRepDB";
import {sortByFields} from "../IOtypes/queryTypes";


function checkSNT(snt: string) {
    snt = snt.trim();
    if(!snt || snt.length > SET.MaxLen.BLOG.NAME) snt = undefined!;
} // Проверка правильности входящего поискового термина для имени

function checkSB(sb: string) {
    if(!sortByFields.hasOwnProperty(sb)) sb = "createdAt"; // Задание исходного значения для поля сортировки
} // Проверка правильности входящего поля сортировки

export function queryGetMiddleware(req: Request, res: Response, next: NextFunction) {
    if(typeof req.query.searchNameTerm === "string") checkSNT(req.query.searchNameTerm); // Проверка правильности входящего поискового термина для имени
    
    if(typeof req.query.sortBy === "string") checkSB(req.query.sortBy); // Проверка правильности входящего поля сортировки
    else req.query.sortBy = "createdAt"; // Задание исходного значения для поля сортировки

    next(); // Передача управления дальше
}
