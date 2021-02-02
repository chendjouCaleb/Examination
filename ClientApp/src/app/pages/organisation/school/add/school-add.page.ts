import {Component} from '@angular/core';
import {Router} from '@angular/router';
import {School} from 'examination/entities';

@Component({
  templateUrl: 'school-add.page.html'
})
export class SchoolAddPage {
 cancel = () => this.router.navigateByUrl('/schools');
   constructor(private router: Router) { }

   oncreated(school: School) {
     this.router.navigateByUrl(school.url);
   }
}
