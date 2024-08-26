import { Manifest } from "./manifest";
import { Third } from "./third";

export interface Odp {
    id:            number;
    subtotal:      string;
    retainer:      string;
    retefuente:    string;
    reteica:       string;
    total:         string;
    third_id:      number;
    thirdId:       Third;
    observaciones: string;
    status:        number;
    imagen:        string;
    createdAt:     Date;
    updateAt:      Date;
    manifests:     Manifest[];
}
