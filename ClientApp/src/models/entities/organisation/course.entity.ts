import {Entity} from "../entity";
import {Level} from "./level.entity";
import {List} from "@positon/collections";
import {Score} from "./score.entity";
import {sum} from "../../../controls/array";
import {CourseLevelSpeciality} from "./course-level-speciality.entity";

export class Course extends Entity<number> {
  constructor(value: any = {}) {
    super();

    this.id = value.id;
    this.registrationDate = new Date(value.registrationDate);

    this.name = value.name;
    this.code = value.code;
    this.coefficient = value.coefficient;
    this.radical = value.radical;
    this.isGeneral = value.isGeneral;

    this.description = value.description;
    this.multipleScore = value.multipleScore;

    this.levelId = value.levelId;
  }


  name: string;
  code: string;
  description: string;
  multipleScore: boolean;
  radical: number;
  coefficient: number;

  isGeneral: boolean;

  levelId: number;
  level: Level;

  courseLevelSpecialities: List<CourseLevelSpeciality>;

  scores: List<Score>;

  get totalScoreRadical(): number {
    if(!this.scores) {return 0;}
    return sum(this.scores.toArray(), s => s.radical)
  }

  get url(): string {
    return `${this.level.url}/courses/${this.id}`;
  }

  get apiUrl(): string {
    return `courses/${this.id}`
  }

  get specialityNames(): string[] {
    if(!this.courseLevelSpecialities) {return []}

    return this.courseLevelSpecialities.toArray().map(t => t.levelSpeciality.speciality.name);
  }

  get levelIndex(): number {
    return this.level.index + 1;
  }
}
