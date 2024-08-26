import { PProductChatacter } from "./p-product-chatacter";

export interface PProductClassification {
    id:                     number;
    name:                   string;
    value:                  string;
    status:                 string;
    createdAt:              null;
    updatedAt:              null;
    p_ProductCharacters_id: number;
    p_ProductCharacter: PProductChatacter;
}
