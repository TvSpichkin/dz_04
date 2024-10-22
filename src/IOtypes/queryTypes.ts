import {EntFields, TypeEntFields} from "../db/types/typesRepDB";


export enum SortDirections {
    asc = "asc", // По возрастанию
    desc = "desc" // По убыванию
}; // Направление сортировки

export type TypeSortDir = keyof typeof SortDirections;
export type TypeSNT = string | undefined;

export type QueryInputModel = {
    searchNameTerm: TypeSNT, // Входящий поисковый термин для имени; максимальная длина: 15
    sortBy: TypeEntFields, // Входящее поле сортировки
    sortDirection: TypeSortDir, // Входящее направление сортировки
    pageNumber: number, // Количество частей, которые должны быть возвращены
    pageSize: number // Размер порции, который должен быть возвращен
}; // Входная модель для запроса с вопросом
