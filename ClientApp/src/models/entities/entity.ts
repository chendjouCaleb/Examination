export class Entity<TID> {
    id: TID;
    registrationDate: Date;

    apply(value: any = {}) {
      Object.assign(this, value);
    }
}
