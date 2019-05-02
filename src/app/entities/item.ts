export interface Item {
    id?: string;
    name: string;
    type: type;
    // Admins: User[]
}

export enum type {
    group, event, folder, file, link
}
