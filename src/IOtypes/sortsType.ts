export enum SortDirections {
    asc = "asc", // По возрастанию
    desc = "desc" // По убыванию
}; // Направление сортировки 

export type StringSortDir = keyof typeof SortDirections;
