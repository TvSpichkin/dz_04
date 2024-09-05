export type BlogDbType = {
    id: number, // Идентификатор
    name: string, // Имя; максимальная длина: 15
    description: string, // Описание; максимальная длина: 500
    websiteUrl: string, // ЕУМР сетевого узла; максимальная длина: 100, шаблон: ^https://([a-zA-Z0-9_-]+\.)+[a-zA-Z0-9_-]+(\/[a-zA-Z0-9_-]+)*\/?$
    createdAt: number, // Дата создания
    isMembership: boolean // Подписка на членство в сетевом журнале
}; // Тип сетевого журнала в БД

export type BlogDbPutType = {
    name: string, // Имя; максимальная длина: 15
    description: string, // Описание; максимальная длина: 500
    websiteUrl: string // ЕУМР сетевого узла; максимальная длина: 100, шаблон: ^https://([a-zA-Z0-9_-]+\.)+[a-zA-Z0-9_-]+(\/[a-zA-Z0-9_-]+)*\/?$
}; // Тип изменения сетевого журнала в БД
