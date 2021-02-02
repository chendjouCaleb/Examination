import {GenericHttpClient, SERVER_URL} from "../httpClient";
import {Course, CourseLevelSpeciality, LevelSpeciality} from "examination/entities";
import {Injectable} from "@angular/core";
import {List} from "@positon/collections";
import {CourseLevelSpecialityAddParams} from "../../form";


@Injectable()
export class CourseLevelSpecialityHttpClient extends GenericHttpClient<CourseLevelSpeciality, number> {
  url: string = SERVER_URL + "/courseLevelSpecialities";


  createFromAny(value: any): CourseLevelSpeciality {
    return new CourseLevelSpeciality(value);
  }


  async addCourseLevelSpeciality(params: CourseLevelSpecialityAddParams) {
    return this.add({}, params);
  }


  listByCourse(course: Course): Promise<List<CourseLevelSpeciality>> {
    return this.listAsync({courseId: course.id});
  }

  listByLevelSpeciality(levelSpeciality: LevelSpeciality): Promise<List<CourseLevelSpeciality>> {
    return this.listAsync({levelSpecialityId: levelSpeciality.id});
  }

}
