import {Component, Inject, Input, OnInit, ViewChild} from "@angular/core";
import {MsTable} from "@ms-fluent/components";
import {Course, CourseLevelSpeciality} from "examination/entities";
import {CourseLevelSpecialityLoader, CourseLoader, LevelSpecialityLoader} from "examination/loaders";
import {CourseHttpClient, CourseLevelSpecialityHttpClient} from "@examination/http";
import {Column, COURSE_SERVICE_TOKEN, CourseHomeService, ICourseService} from "@examination/components";

@Component({
  templateUrl: 'course-level-speciality-list.html',
  selector: 'CourseLevelSpecialityList'
})
export class CourseLevelSpecialityList implements OnInit {


  courseLevelSpecialities: CourseLevelSpeciality[] = [];
  isLoading: boolean = true;

  @ViewChild(MsTable)
  table: MsTable;

  @Input()
  itemUrlFn: (item: CourseLevelSpeciality) => string = (item) => item.course.url;

  @Input()
  courseUrlFn: (item: Course) => string = (item) => item.url;

  @Input()
  params: any;

  @Input()
  hiddenColumns: string[] = [];

  constructor(
    private _courseLevelSpecialityLoader: CourseLevelSpecialityLoader,
    private _courseLevelSpecialityHttpClient: CourseLevelSpecialityHttpClient,
    @Inject(COURSE_SERVICE_TOKEN) public service: ICourseService) {}

  async ngOnInit() {
    try {
      await this.loadCourses();
      this.isLoading = false;
    }catch (e) {
      this.isLoading = false;
    }
  }



  async loadCourses() {
    const courseLevelSpecialities = await this._courseLevelSpecialityHttpClient.list(this.params);
    await this._courseLevelSpecialityLoader.loadAll(courseLevelSpecialities);

    console.log("Found: " + courseLevelSpecialities.length);

    this.courseLevelSpecialities = courseLevelSpecialities.toArray();

    this.table.unshift(...courseLevelSpecialities);
  }
}
