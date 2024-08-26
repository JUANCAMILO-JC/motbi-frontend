export class Department {
    public id: number;
    public id_country: number;
    public code: string;
    public title: string;
    public createdAt: Date;
    public updatedAt: Date;
  
    constructor(departmentData?: Partial<Department>) {
      if (departmentData) {
        Object.assign(this, departmentData);
      }
    }
  
    get Id(): number {
      return this.id;
    }
  
    set Id(value: number) {
      this.id = value;
    }
  
    get Id_country(): number {
      return this.id_country;
    }
  
    set Id_country(value: number) {
      this.id_country = value;
    }
  
    get Code(): string {
      return this.code;
    }
  
    set Code(value: string) {
      this.code = value;
    }
  
    get Ttitle(): string {
      return this.title;
    }
  
    set Citle(value: string) {
      this.title = value;
    }
  
    get CreatedAt(): Date {
      return this.createdAt;
    }
  
    set CreatedAt(value: Date) {
      this.createdAt = value;
    }
  
    get UpdatedAt(): Date {
      return this.updatedAt;
    }
  
    set UpdatedAt(value: Date) {
      this.updatedAt = value;
    }
  }
  