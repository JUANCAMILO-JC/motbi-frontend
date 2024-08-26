export class City {
    public id: number;
    public id_department: number;
    public code: string;
    public lat: string;
    public lng: string;
    public title: string;
    public ica: string;
    public rndc_code: string;
    public createdAt: Date;
    public updatedAt: Date;
  
    constructor(cityData?: Partial<City>) {
      if (cityData) {
        Object.assign(this, cityData);
      }
    }
  
    get Id(): number {
      return this.id;
    }
  
    set Id(value: number) {
      this.id = value;
    }
  
    get Id_department(): number {
      return this.id_department;
    }
  
    set Id_department(value: number) {
      this.id_department = value;
    }
  
    get Code(): string {
      return this.code;
    }
  
    set Code(value: string) {
      this.code = value;
    }
  
    get Lat(): string {
      return this.lat;
    }
  
    set Lat(value: string) {
      this.lat = value;
    }
  
    get Lng(): string {
      return this.lng;
    }
  
    set Lng(value: string) {
      this.lng = value;
    }
  
    get Title(): string {
      return this.title;
    }
  
    set Title(value: string) {
      this.title = value;
    }
  
    get Ica(): string {
      return this.ica;
    }
  
    set Ica(value: string) {
      this.ica = value;
    }
  
    get Rndc_code(): string {
      return this.rndc_code;
    }
  
    set Rndc_code(value: string) {
      this.rndc_code = value;
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