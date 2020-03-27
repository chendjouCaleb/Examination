import {Entity} from "./entity";
import {User} from "./user.entity";
import {Examination} from "./examination";

export class Corrector extends Entity<number>{
  userId: string;
  user: User;

  examination: Examination;
  examinationId: number;

  paperCount: number;
  correctedPaperCount: number;
}
