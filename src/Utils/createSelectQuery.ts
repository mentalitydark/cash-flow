export function createSelectQuery<Type>(
    columns: Array<keyof Omit<Type, "created_at" | "updated_at">>, table: string
): string
{
    return `
        SELECT
            ${columns.join(", ")},
            DATETIME(created_at, 'localtime') AS created_at,
            DATETIME(updated_at, 'localtime') AS updated_at
        FROM ${table}
    `
}