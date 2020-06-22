import {Component, Inject, Input, Optional, ViewEncapsulation} from "@angular/core";
import {Student} from "examination/models";
import {MAT_SNACK_BAR_DATA, MatSnackBarRef} from "@angular/material/snack-bar";
import {MsfModal, MsfModalRef} from "fabric-docs";
import {StudentDetails} from "examination/app/student/details/student-details";


@Component({
  template: `
      <msAlert [icon]="false" [closeButton]="false" theme="info">
          <div class="ms-fontWeight-semibold ms-fontSize-16">Nouvel étudiant</div>
          <div class="mt-2 d-flex">
              <MsfPersona size="size72">
                  <MsfPersonaFigure [text]="student.fullName" ></MsfPersonaFigure>
              </MsfPersona>
              <div class="ml-2">
                  <div class="ms-fontWeight-semibold">{{student.fullName}}</div>
                  <div>Matricule: {{student.registrationId}}</div>
                  <div *ngIf="student.speciality">Specialité: {{student.speciality.name}}</div>


                  <div class="mt-3">
                      <button msAlertButton action="true" (click)="details()">Voir</button>
                      <button msAlertButton class="ml-3" (click)="snackbar.dismiss()">Fermer</button>
                  </div>
              </div>
          </div>
          
      </msAlert>
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
