export interface Item {
    id?: string;
    name: string;
    type: type;
    // Admins: User[]
}

enum type {
    group, event, folder, file, link
}
