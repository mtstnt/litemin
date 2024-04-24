import { useState } from "react";

export type Database = {
    displayName: string,
    path: string,
    tables: string[],
    slug: string,
};

export function useDatabases(): [Database[], () => Promise<void>, boolean] {
    const [databases, setDatabases] = useState<Database[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    let mockDBs: any[] = [
        {
            displayName: "Project Testing",
            path: "/test/path",
            tables: [],
            slug: "database_x"
        },
    ];

    for (let i = 0; i < 5; i++) {
        mockDBs = mockDBs.concat(mockDBs);
    }
    console.log(mockDBs);

    const refreshDatabases = async () => {
        setIsLoading(true);
        await (new Promise((res, _) => setTimeout(() => res(true), 500)));
        setDatabases(mockDBs);
        setIsLoading(false);
    }

    return [databases, refreshDatabases, isLoading];
}

export type Table = {
    tableName: string;
    structure?: object;
};

export function useTableBySlug(databaseSlug: string): [Table[], () => Promise<void>, boolean] {
    const [tables, setTables] = useState<Table[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    let mockTables: Table[] = [
        {
            tableName: "users",
            structure: undefined,
        },
        {
            tableName: "posts",
            structure: undefined,
        },
    ];

    console.log(mockTables);

    const refreshTables = async () => {
        setIsLoading(true);
        await (new Promise((res, _) => setTimeout(() => res(true), 500)));
        setTables(mockTables);
        setIsLoading(false);
    }

    return [tables, refreshTables, isLoading];
}