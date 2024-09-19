export type PostDbType = {
    id: number, // Идентификатор
    title: string, // Название; максимальная длина: 30
    shortDescription: string, // Краткое описание; максимальная длина: 100
    content: string, // Содержание; максимальная длина: 1000
    blogId: number, // Идентификатор существующего сетевого журнала
    createdAt: number // Дата создания
}; // Тип записи в БД

export type PostDbPutType = {
    title: string, // Название; максимальная длина: 30
    shortDescription: string, // Краткое описание; максимальная длина: 100
    content: string, // Содержание; максимальная длина: 1000
    blogId: number // Идентификатор существующего сетевого журнала
}; // Тип изменения записи в БД

export enum postFields {
    id = "id", // Идентификатор
    title = "title", // Название; максимальная длина: 30
    shortDescription = "shortDescription", // Краткое описание; максимальная длина: 100
    content = "content", // Содержание; максимальная длина: 1000
    blogId = "blogId", // Идентификатор существующего сетевого журнала
    createdAt = "createdAt" // Дата создания
}; // Возможные поля записи
