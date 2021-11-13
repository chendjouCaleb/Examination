import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {CourseHomeModule} from "../home";
import {MsCollectionSlideModule} from "@ms-fluent/components";
import {CourseSlide} from "./course-slide";
import {CourseSlideService} from "./course-slide.service";

@NgModule({
  imports: [ CommonModule, CourseHomeModule, MsCollectionSlideModule ],
  declarations: [ CourseSlide ],
  providers: [ CourseSlideService ]
})
export class CourseSlideModule {

}
