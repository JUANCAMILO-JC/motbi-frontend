import { Third } from "./third";

export interface Bill {
    id:                number;
    status:            string;
    subtotal:          string;
    retefuente:        string;
    reteica:           string;
    total:             string;
    costo:             string;
    fecha_elaboracion: Date;
    fecha_vencimiento: Date;
    zyp_key:           string;
    status_dian:       string;
    cufe:              string;
    pdf_invoice:       string;
    xml_invoice:       string;
    invoice_sends:     number;
    status_payment:    string;
    createdAt:         Date;
    updatedAt:         Date;
    third_id:          number;
    thirdId:           Third;
}
