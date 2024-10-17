import {agent} from "supertest";
import {app} from "../../src/app";
import {SET} from "../../src/settings";
import {EntViewModel, Paginator} from "../../src/domain/paginator";


export const req = agent(app), // Определение запроса для тестирования программы
    getBlog = req.get(SET.PATH.BLOGS), // Запрос на получение всех сетевых журналов
    getPost = req.get(SET.PATH.POSTS); // Запрос на получение всех записей

export function pageData(i: EntViewModel[] = [], p: number = 1, ps: number = 10, tc: number = i.length): Paginator<EntViewModel> {
    return {
        pagesCount: Math.ceil(tc/ps), // Количество страниц
        page: p, // Номер текущей страницы
        pageSize: ps, // Размер страницы - количество элементов на одной странице
        totalCount: tc, // Количество элементов
        items: i, // Нужная порция сущностей
    };
} // Данные страницы
