import {Request, Response, NextFunction} from "express";
import {SET} from "../settings";


function checkSNT(snt: string) {
    if(typeof snt === "undefined") return;
} // Проверка правильности входящего поискового термина для имени

export function queryGetMiddleware(req: Request, res: Response, next: NextFunction) {
    if(typeof req.query.searchNameTerm === "string") checkSNT(req.query.searchNameTerm); // Проверка правильности входящего поискового термина для имени
    
    next(); // Передача управления дальше
}
