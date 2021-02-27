import {Entity} from '../entity';
import {Speciality} from './speciality.entity';
import {Level} from './level.entity';
import {List} from '@positon/collections';
import {CourseLevelSpeciality} from '../course/course-level-speciality.entity';
import {Application, Student} from '../member';


export class LevelSpeciality extends Entity<number> {

  constructor(value?: any) {
    super();
    if (value) {
      this.id = value.id;

      this.levelId = value.levelId;
      this.specialityId = value.specialityId;
    }
  }

  speciality: Speciality;
  specialityId: number;

  levelId: number;
  level: Level;

  courseLevelSpecialities: List<CourseLevelSpeciality>;
  students: List<Student>;
  applications: List<Application>;

  get url(): string {
    return `${this.level.url}/specialities/${this.id}`;
  }

  addApplication(application: Application) {
    if (this.applications) {
      this.applications.insert(0, application);
    }
  }

  addCourseLevelSpeciality(item: CourseLevelSpeciality) {
    if (this.courseLevelSpecialities && item.levelSpecialityId === this.id) {
      this.courseLevelSpecialities.add(item);
    }
  }

  addCourseLevelSpecialities(items: List<CourseLevelSpeciality>) {
    if (!this.courseLevelSpecialities) {
      return;
    }
    items.forEach(item => {
      if (item.levelSpecialityId === this.id) {
        this.courseLevelSpecialities.add(item);
      }
    })

  }

}
