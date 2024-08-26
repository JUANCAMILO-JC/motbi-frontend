import { Profile } from "./profile";

export class User {
    public id: number;
    public name: string;
    public email: string;
    public avatar?: string;
    public status?: string;
    public profileId: Profile;
    public third_id: number;
    public profile_id: number;
    public password: string;
    public active: number;
    public image: string;
    public docid: string;
    public dv: number;
    public celular: string;
    public attempt: number;
    public pass: string;
    public verification_code: string;
    public lastLogin: Date;
    public createdAt: Date;
    public updatedAt: Date;


    constructor(partial?: Partial<User>) {
        if (partial) 
        {
            Object.assign(this, partial);
        }
         this.dv = 0;
    }

    get Id(): number {
        return this.id;
    }

    set Id(id: number) {
        this.id = id;
    }

    get Name(): string {
        return this.name;
    }

    set Name(name: string) {
        this.name = name;
    }

    get Email(): string {
        return this.email;
    }

    set Email(email: string) {
        this.email = email;
    }

    get Avatar(): string | undefined {
        return this.avatar;
    }

    set Avatar(avatar: string | undefined) {
        this.avatar = avatar;
    }

    get Status(): string | undefined {
        return this.status;
    }

    set Status(status: string | undefined) {
        this.status = status;
    }

    get ProfileId(): Profile {
        return this.profileId;
    }

    set ProfileId(profileId: Profile) {
        this.profileId = profileId;
    }

    get Third_id(): number {
        return this.third_id;
    }

    set Third_id(third_id: number) {
        this.third_id = third_id;
    }

    get Profile_id(): number {
        return this.profile_id;
    }

    set Profile_id(profile_id: number) {
        this.profile_id = profile_id;
    }

    get Password(): string {
        return this.password;
    }

    set Password(password: string) {
        this.password = password;
    }

    get Active(): number {
        return this.active;
    }

    set Active(active: number) {
        this.active = active;
    }

    get Image(): string {
        return this.image;
    }

    set Image(image: string) {
        this.image = image;
    }

    get Docid(): string {
        return this.docid;
    }

    set Docid(docid: string) {
        this.docid = docid;
    }

    get Dv(): number {
        return this.dv;
    }

    set Dv(dv: number) {
        this.dv = dv;
    }

    get Celular(): string {
        return this.celular;
    }

    set Celular(celular: string) {
        this.celular = celular;
    }

    get Attempt(): number {
        return this.attempt;
    }

    set Attempt(attempt: number) {
        this.attempt = attempt;
    }

    get Pass(): string {
        return this.pass;
    }

    set Pass(pass: string) {
        this.pass = pass;
    }

    get Verification_code(): string {
        return this.verification_code;
    }

    set Verification_code(verification_code: string) {
        this.verification_code = verification_code;
    }

    get LastLogin(): Date {
        return this.lastLogin;
    }

    set LastLogin(lastLogin: Date) {
        this.lastLogin = lastLogin;
    }

    get CreatedAt(): Date {
        return this.createdAt;
    }

    set CreatedAt(createdAt: Date) {
        this.createdAt = createdAt;
    }

    get UpdatedAt(): Date {
        return this.updatedAt;
    }

    set UpdatedAt(updatedAt: Date) {
        this.updatedAt = updatedAt;
    }
}
