import {Speciality} from "examination/entities";

export class LevelAddParams {
  specialityId: number[]
}

export class LevelAddModel {
  specialities: Speciality[];

  get params(): LevelAddParams {
    return {
      specialityId: this.specialities.map(l => l.id)
    }
  }
}
