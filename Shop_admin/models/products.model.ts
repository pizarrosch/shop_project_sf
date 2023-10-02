import axios from "axios";
import {IProduct, IProductSearchPayload} from "@Shared/types";

const host = `http://${process.env.LOCAL_HOST}:${Number(process.env.LOCAL_PORT)}/${process.env.API_PATH}`;

export async function getProducts() {
    const {data} = await axios.get<IProduct[]>(`${host}/products`);
    console.log(data.length)
    return data || [];
}

export async function searchProducts(
    filter: IProductSearchPayload
): Promise<IProduct[]> {
    const { data } = await axios.get < IProduct[] > (
        `${host}/products/search`,
        { params: filter }
    );
    return data || [];
}

export async function getProduct(
    id: string
): Promise<IProduct | null> {
    try {
        const { data } = await axios.get < IProduct > (
            `${host}/products/${id}`
        );
        return data;
    } catch (e) {
        return null;
    }
}