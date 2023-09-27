import { RowDataPacket } from "mysql2/index";
import { IComment, IImages, IProduct} from "@Shared/types";

export interface ICommentEntity extends RowDataPacket {
    comment_id: string;
    name: string;
    email: string;
    body: string;
    product_id: string;
}

export interface IProductSearchFilter {
    title?: string;
    description?: string;
    priceFrom?: number;
    priceTo?: number;
}

export interface IProductEntity extends IProduct, RowDataPacket {
    product_id: string;
}

export interface IImageEntity extends RowDataPacket {
    image_id: string;
    product_id: string,
    url: string,
    main: number
}

export type ProductCreatePayload = Omit<IProduct, "id" | "comments">;
export type CommentCreatePayload = Omit<IComment, "id">;
export type ImageCreatePayload = Omit<IImages, "id">;
// Omit is a typescript helper, which returns the given type (first parameter in the generic type)
// and excludes the given key (second parameter)
