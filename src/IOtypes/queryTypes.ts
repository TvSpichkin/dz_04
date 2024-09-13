export enum SortDirections {
    asc = "asc", // По возрастанию
    desc = "desc" // По убыванию
}; // Направление сортировки

export enum sortByFields {
    id = "id", // Идентификатор
    name = "name", // Имя; максимальная длина: 15
    description = "description", // Описание; максимальная длина: 500
    websiteUrl = "websiteUrl", // ЕУМР сетевого узла; максимальная длина: 100, шаблон: ^https://([a-zA-Z0-9_-]+\.)+[a-zA-Z0-9_-]+(\/[a-zA-Z0-9_-]+)*\/?$
    createdAt = "createdAt", // Дата создания
    isMembership = "isMembership", // Подписка на членство в сетевом журнале
    title = "title", // Название; максимальная длина: 30
    shortDescription = "shortDescription", // Краткое описание; максимальная длина: 100
    content = "content", // Содержание; максимальная длина: 1000
    blogId = "blogId", // Идентификатор существующего сетевого журнала
}; // Возможные поля сортировки

export type TypeSortDir = keyof typeof SortDirections;
export type TypeSNT = string | null;
