export class Resident {
  public constructor(
    private cpf: string,
    private rg: string,
    private name: string,
    private contact_phone: string,
    private birthday: Date,
    private id?: number,
    private created_at?: Date,
    private updated_at?: Date
  ) {}

  toJSON(){
    return {
      id: this.id,
      cpf: this.cpf,
      rg: this.rg,
      name: this.name,
      contact_phone: this.contact_phone,
      birthday: this.birthday,
      created_at: this.created_at,
      updated_at: this.updated_at
    };
  }
}