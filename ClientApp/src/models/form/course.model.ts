import {IsNotEmpty, IsNumber, MinLength} from 'class-validator';
import {Course, Level, LevelSpeciality} from "examination/entities";

export interface CourseBodyModel {
  name: string;
  code: string;
  radical: number;
  coefficient: number;
  description: string;
  isGeneral?: boolean;
}


export interface CourseAddParams {
  levelId?: number;
  levelSpecialityId?: number[]
}

export class CourseAddModel {
  @IsNotEmpty()
  @MinLength(3)
  name: string;

  @IsNotEmpty()
  code: string;

  @IsNotEmpty()
  @IsNumber()
  radical: number;

  @IsNotEmpty()
  @IsNumber()
  coefficient: number;

  isGeneral: boolean;

  @IsNotEmpty()
  description: string;

  @IsNotEmpty()
  level: Level;

  levelSpecialities: LevelSpeciality[] = [];


  get body(): CourseBodyModel {
    return {
      name: this.name,
      code: this.code,
      radical: this.radical,
      coefficient: this.coefficient,
      description: this.description,
      isGeneral: this.isGeneral
    };
  }

  get params(): CourseAddParams {
    const params: CourseAddParams= {levelId: this.level.id};

    if(!this.isGeneral && this.levelSpecialities) {
      params.levelSpecialityId = this.levelSpecialities.map(l => l.id);
    }

    return params;
  }
}



export class CourseEditModel {
  @IsNotEmpty()
  @MinLength(3)
  name: string;

  @IsNotEmpty()
  code: string;

  @IsNotEmpty()
  @IsNumber()
  radical: number;

  @IsNotEmpty()
  @IsNumber()
  coefficient: number;


  @IsNotEmpty()
  description: string;


  @IsNotEmpty()
  level: Level;

  levelSpeciality: LevelSpeciality;


  get body(): CourseBodyModel {
    return {
      name: this.name,
      code: this.code,
      radical: this.radical,
      coefficient: this.coefficient,
      description: this.description,
    };
  }
}

export interface CourseLevelSpecialityAddParams {
  courseId: number;
  levelSpecialityId: number
}

export class CourseLevelSpecialityAddModel {
  @IsNotEmpty()
  course: Course;

  @IsNotEmpty()
  levelSpeciality: LevelSpeciality;

  get params(): CourseLevelSpecialityAddParams {
    return {
      courseId: this.course.id,
      levelSpecialityId: this.levelSpeciality.id
    }
  }
}
