import {Request, Response, NextFunction} from "express";
import {SET} from "../settings";
import {query} from "express-validator";


const searchNameTermVal = query("searchNameTerm").optional().isString().withMessage('Имя не является строкой'),
;

export function queryGetValidator1(req: Request, res: Response, next: NextFunction) {
    const auth = req.headers["authorization"]; // Получение заголовка авторизации из запроса

    function unauth() {
        res.sendStatus(401);
    } // Отправка статуса ошибки о попытке несанкционированного доступа

    if(!auth || (auth.slice(0, 6) !== "Basic ")) unauth(); // Проверка на базовую авторизацию
    else {
        const codedAuth = (SET.ADMIN); // Получение base64 строки авторизации

        if(auth.slice(6) !== codedAuth) unauth(); // Сравнение строк base64
        else next(); // Передача управления дальше
    }
}
