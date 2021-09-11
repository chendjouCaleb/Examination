import {Component, Inject, Input, OnInit, ViewChild} from '@angular/core';
import {Course, Level, LevelSpeciality, School, Speciality} from 'examination/entities';
import {CourseLevelSpecialityLoader, CourseLoader, LevelSpecialityLoader} from 'examination/loaders';
import {COURSE_SERVICE_TOKEN, ICourseService} from '../course.service.interface';
import {List} from '@positon/collections';
import {MsTable} from "@ms-fluent/components";

export interface Column {
  name: string;
  sortBy?: [string, 'number' | 'string' | 'date'],
  display: string
}

@Component({
  templateUrl: 'course-list.html',
  selector: 'app-course-list'
})
export class CourseList implements OnInit {
  @Input()
  level: Level;

  @Input()
  speciality: Speciality;

  @Input()
  levelSpeciality: LevelSpeciality;

  @ViewChild(MsTable)
  table: MsTable;

  courses: Course[] = [];
  isLoading: boolean = true;

  columns: Column[] = [
    {name: '#', display: '#'},
    {name: 'name', display: 'Nom', sortBy: ['name', 'string']},
    {name: 'code', display: 'Code', sortBy: ['code', 'string']},
    {name: 'coefficient', display: 'Coeff.', sortBy: ['coefficient', 'number']},
    {name: 'radical', display: 'radical', sortBy: ['radical', 'number']},
    {name: 'multipleScore', display: 'Barème'},
    {name: 'specialities', display: 'Specialités'},
    {name: 'levelIndex', display: 'Niveau', sortBy: ['levelIndex', 'number']},
    {name: 'registrationDate', display: 'Date d\'ajout', sortBy: ['registrationDate', 'date']},
    {name: 'action', display: 'Actions'}
  ];

  constructor(
    private _levelSpecialityLoader: LevelSpecialityLoader,
    private _courseLevelSpeciality: CourseLevelSpecialityLoader,
    private _courseLoader: CourseLoader,
    @Inject(COURSE_SERVICE_TOKEN) public service: ICourseService) {

  }

  async ngOnInit() {
    try {
      await this.loadCourses();
      this.isLoading = false;
    }catch (e) {
      this.isLoading = false;
    }
  }


  addCourse() {
    this.service.addCourse(this.level).then(course => {
      if (course) {
        this.table.unshift(course);
      }
    });
  }

  getCourses(): List<Course> {
    if (this.level) {
      return this.level.courses;
    }

    if (this.speciality) {
      return this.speciality.courses;
    }

    return this.levelSpeciality.courseLevelSpecialities.convertAll(l => l.course);
  }

  get school(): School {
    if (this.level) {
      return this.level?.department?.school;
    }

    if (this.speciality) {
      return this.speciality?.department?.school;
    }

    if (this.levelSpeciality) {
      return this.levelSpeciality.level?.department?.school;
    }
  }

  async loadCourses() {
    if (this.level) {
      await this._levelSpecialityLoader.loadByLevel(this.level);
      await this._courseLoader.loadByLevel(this.level);

    }
    if (this.speciality) {
      await this._courseLoader.loadBySpeciality(this.speciality);
    }

    if (this.levelSpeciality) {
      await this._courseLevelSpeciality.loadByLevelSpeciality(this.levelSpeciality);
    }
    for (const course of this.courses) {
      await this._courseLevelSpeciality.loadByCourse(course);
    }

    this.table.unshift(...this.getCourses().toArray());
  }
}
