import { AxiosError } from "axios";

export { }

declare global {

    interface User {
        id: number;
        email: string;
        password: string;
        name: string;
        role: string;
        avatar: string;
    }

    interface Product {
        id: number;
        title: string;
        price: number;
        description: string;
        category: Category;
        images?: (string)[] | null;
    }

    interface Category {
        id: number;
        name: string;
        image: string;
    }

    interface Token {
        access_token: string;
        refresh_token: string;
    }

}