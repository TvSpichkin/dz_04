export enum SortDirections {
    asc = "asc", // По возрастанию
    desc = "desc" // По убыванию
}; // Направление сортировки 

export type TypeSortDir = keyof typeof SortDirections;
export type TypeSNT = string | null;


