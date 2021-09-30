interface User {
    id: number;
    name: string;
    email: string;
    password: string;
    avatar: string;
}

interface Playlist {
    id: number;
    name: string;
    created_by: User.id;
}
