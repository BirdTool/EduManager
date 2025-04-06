export interface Teacher {
    id: number;
    name: string;
    email: string;
    password: string;
    role: string;
    classes: Classes[];
}

export interface Classes {
    name: string;
    matery: string;
}