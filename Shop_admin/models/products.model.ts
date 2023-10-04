import axios from "axios";
import {IProduct, IProductSearchPayload} from "@Shared/types";
import {IProductEditData} from "../types";

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

export async function removeProduct(id: string): Promise<void> {
    await axios.delete(`${host}/products/${id}`);
}

export async function removeComment(id: string): Promise<void> {
    await axios.delete(`${host}/comments/${id}`);
}

function compileIdsToRemove(data: string | string[]): string[] {
    if (typeof data === "string") return [data];
    return data;
}

function splitNewImages(str = ""): string[] {
    return str
        .split(/\r\n|,/g)
        .map(url => url.trim())
        .filter(url => url);
}

export async function updateProduct(
    productId: string,
    formData: IProductEditData
): Promise<void> {
    try {
        // запрашиваем у Products API товар до всех изменений
        const {
            data: currentProduct
        } = await axios.get < IProduct > (`${host}/products/${productId}`);
        console.log('-->', currentProduct)

        if (formData.commentsToRemove) {
            console.log('--> commentsStart')
            const commentsIdsToRemove = compileIdsToRemove(formData.commentsToRemove);
            const getDeleteCommentActions = () => commentsIdsToRemove.map(commentId => {
                return axios.delete(`${host}/comments/${commentId}`);
            });
            await Promise.all(getDeleteCommentActions());
            console.log('--> commentsEnd')
        }

        if (formData.imagesToRemove) {
            console.log('--> imagesStart')
            const imagesIdsToRemove = compileIdsToRemove(formData.imagesToRemove);
            await axios.post(`${host}/products/remove-images`, imagesIdsToRemove);
            console.log('--> imagesEnd')
        }

        if (formData.newImages) {
            console.log('--> newImagesStart')
            const urls = splitNewImages(formData.newImages);
            const images = urls.map(url => ({ url, main: 0 }));
            if (!currentProduct.thumbnail) {
                images[0].main = 1;
            }
            await axios.post(`${host}/products/add-images`, { productId, images });
            console.log('--> newImagesEnd')
        }

        if (formData.mainImage && formData.mainImage !== currentProduct?.thumbnail) {
            console.log('--> mainImagesStart')
            await axios.post(`${host}/products/update-thumbnail/${productId}`, {
                newThumbnailId: formData.mainImage
            });
            console.log('--> mainImagesEnd')
        }

        await axios.patch(`${host}/products/${productId}`, {
            title: formData.title,
            description: formData.description,
            price: Number(formData.price)
        });
    } catch (e) {
        console.log(e); // фиксируем ошибки, которые могли возникнуть в процессе
    }
}