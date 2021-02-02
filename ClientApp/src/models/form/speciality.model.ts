import {IsNotEmpty, MinLength} from "class-validator";
import {Level} from "examination/entities";

export class SpecialityAddBody {
  name: string;
  description: string;
}

export class SpecialityAddParams {
  levelId: number[]
}

export class SpecialityAddModel {
  @IsNotEmpty()
  @MinLength(3)
  name: string;

  @IsNotEmpty()
  description: string;

  levels: Level[];

  get body(): SpecialityAddBody {
    return {
      name: this.name,
      description: this.description
    }
  }

  get params(): SpecialityAddParams {
    return {
      levelId: this.levels.map(l => l.id)
    }
  }
}


export class SpecialityEditModel {
  @IsNotEmpty()
  @MinLength(3)
  name: string;

  @IsNotEmpty()
  description: string;
}
