import { PProductClassification } from "./p-product-classification";

export interface PProductCode {
    id:                          number;
    name:                        string;
    value:                       string;
    status:                      string;
    code:                        string;
    createdAt?:                  Date;
    updatedAt?:                  Date;
    p_ProductClassifications_id: number;
    p_ProductClassification:     PProductClassification;

}
