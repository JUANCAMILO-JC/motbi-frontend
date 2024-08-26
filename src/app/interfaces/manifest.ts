import { PRequestStatus } from "./p-request-status";
import { Remesa } from "./remesa";

export interface Manifest {
    id:                  number;
    status:              any;
    liquidado:           boolean;
    observations:        string;
    electronic_manifest: string;
    seguridadqr:         string;
    createdAt:           Date;
    updatedAt:           Date;
    consignment_id:      number;
    consignmentId:       Remesa;
    status_id:           number;
    stausId:             PRequestStatus;
}
