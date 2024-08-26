import { PDocumentType } from "app/interfaces/p-document-type";
import { Profile } from "app/interfaces/profile";
import { Third } from "app/interfaces/third";

export interface User
{
    id:                number;
    name:              string;
    email:             string;
    avatar?:           string;
    status?:           string;
    profileId:         Profile;
    thirdId:           Third;
    third_id:          number;
    profile_id:        number;
    password:          string;
    active:            number;
    image:             string;
    doctypeId:         PDocumentType;
    docid:             string;
    dv:                number;
    celular:           string;
    attempt:           number;
    pass:              string;
    verification_code: string;
    lastLogin:         Date;
    createdAt:         Date;
    updateAt:          Date;
}
