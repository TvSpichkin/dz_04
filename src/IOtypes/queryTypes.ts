import {blogFields} from "../db/types/blogsDbTypes";
import {postFields} from "../db/types/postsDbTypes";

export const sortByFields = {
    ...blogFields, // Возможные поля сортировки для сетевого журнала
    ...postFields // Возможные поля сортировки для записи
}; // Возможные поля сортировки

export enum SortDirections {
    asc = "asc", // По возрастанию
    desc = "desc" // По убыванию
}; // Направление сортировки

export type TypeSortBy = keyof typeof sortByFields;
export type TypeSortDir = keyof typeof SortDirections;
export type TypeSNT = string | undefined;

export type QueryInputModel = {
    searchNameTerm: TypeSNT, // Входящий поисковый термин для имени; максимальная длина: 15
    sortBy: TypeSortBy, // Входящее поле сортировки
    sortDirection: TypeSortDir, // Входящее направление сортировки
    pageNumber: number, // Количество частей, которые должны быть возвращены
    pageSize: number, // Размер порции, который должен быть возвращен
}; // Входная модель для запроса с вопросом
