export class Properties {
    public id: number;
    public type: string;
    public name: string;
    public value: string;

    constructor(profileData?: Partial<Properties>) {
        if (profileData) {
            Object.assign(this, profileData);
        }
    }

}
