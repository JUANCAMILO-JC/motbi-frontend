import { Remesa } from "./remesa";

export interface Comply {
    id:                      number;
    doc_remesa:              string;
    doc_manifiesto:          string;
    doc_otro:                string;
    doc_remision:            string;
    doc_hojaderuta:          string;
    observations:            string;
    status:                  number;
    ingresoidRNDCremesa:     string;
    ingresoidRNDCmanifiesto: string;
    ingresoidRNDCviaje:      string;
    createdAt:               Date;
    updatedAt:               Date;
    remesa_id:               number;
    remesaId:                Remesa;
}
