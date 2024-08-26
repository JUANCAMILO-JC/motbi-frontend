export class Profile {
    public id: number;
    public idProfile: number;
    public idRol: number;

    constructor(profileData?: Partial<Profile>) {
        if (profileData) {
            Object.assign(this, profileData);
        }
    }

    get Id(): number {
        return this.id;
    }

    set Id(value: number) {
        this.id = value;
    }

    get IdProfile(): number {
        return this.idProfile;
    }

    set IdProfile(value: number) {
        this.idProfile = value;
    }

    get IdRol(): number {
        return this.idRol;
    }

    set IdRol(value: number) {
        this.idRol = value;
    }
}
