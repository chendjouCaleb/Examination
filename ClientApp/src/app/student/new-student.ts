import {Component, Inject, Input, Optional, ViewEncapsulation} from "@angular/core";
import {Student} from "examination/models";
import {MAT_SNACK_BAR_DATA, MatSnackBarRef} from "@angular/material/snack-bar";
import {MsfModal, MsfModalRef} from "fabric-docs";
import {StudentDetails} from "examination/app/student/details/student-details";


@Component({
  template: `
      <div class="new-student-layout">
          <div class="ms-fontWeight-semibold ms-fontSize-16">Nouvel étudiant</div>
          <div class="mt-2">
              <MsfPersona size="size72">
                  <MsfPersonaFigure [text]="student.fullName" ></MsfPersonaFigure>
                  <MsfPersonaText>
                      <div class="ms-fontWeight-semibold">{{student.fullName}}</div>
                      <div>Matricule: {{student.registrationId}}</div>
                      <div *ngIf="student.speciality">Specialité: {{student.speciality.name}}</div>
                      
                      
                      <div class="mt-2">
                          <MsfButton theme="primary" (click)="details()">Voir</MsfButton>
                          <MsfButton class="ml-3" (click)="snackbar.dismiss()">Fermer</MsfButton>
                      </div>
                  </MsfPersonaText>
              </MsfPersona>
          </div>
          
      </div>
  `,
  encapsulation: ViewEncapsulation.None,
  host: {'class': 'new-student'},
  styles: [`
      .new-student-layout {
          padding: 10px;
          background-color: var(--cardBackgroundColor)
      }`],
  selector: 'new-student'
})
export class NewStudent {
  @Input()
  student: Student;

  constructor(@Optional() public snackbar: MatSnackBarRef<NewStudent>,
                private modal: MsfModal,
                @Inject(MAT_SNACK_BAR_DATA) data)
  {
    this.student = data.student;
  }

  details() {
    const modalRef = this.modal.open(StudentDetails);
    modalRef.componentInstance.student = this.student;
    this.snackbar.dismiss();
  }

}
