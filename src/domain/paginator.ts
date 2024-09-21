import {BlogViewModel} from "../IOtypes/blogsTypes";
import {PostViewModel} from "../IOtypes/postsTypes";


export type EntViewModel = BlogViewModel | PostViewModel; // Тип сущности выходной модели

export type Paginator<T> = {
    pagesCount: number, // Количество страниц
    page: number, // Номер текущей страницы
    pageSize: number, // Размер страницы - количество элементов на одной странице
    totalCount: number, // Количество элементов
    items: T[], // Нужная порция сущностей
}; // Выходная модель нумератора страниц

export function paginator(p: number, ps: number, tc: number, i: EntViewModel[]): Paginator<EntViewModel> {
    return {
        pagesCount: Math.ceil(tc/ps), // Количество страниц
        page: p, // Номер текущей страницы
        pageSize: ps, // Размер страницы - количество элементов на одной странице
        totalCount: tc, // Количество элементов
        items: i, // Нужная порция сущностей
    };
} // Нумератор страниц
