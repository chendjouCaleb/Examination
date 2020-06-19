import {EventEmitter, Injectable} from "@angular/core";
import * as signalR from "@microsoft/signalr";
import {HubConnection} from "@microsoft/signalr";
import {CurrentItems} from "examination/app/current-items";
import {AlertEmitter} from "examination/controls";
import {Student} from "examination/models";
import {ReplaySubject} from "rxjs";

@Injectable({providedIn: 'root'})
export class StudentHub {

  public readonly connection: HubConnection;

  public readonly studentCreated = new ReplaySubject<Student>();
  public readonly studentDeleted = new ReplaySubject<Student>();

  constructor(private _items: CurrentItems) {
    this.connection = new signalR.HubConnectionBuilder()
      .withUrl(`http://localhost:9000/hubs/students`).build();

    this.connection.on("StudentCreated", (student: Student) => {
      this.studentCreated.next(student);
    });

    this.connection.on("StudentDeleted", (student: Student) => {
      this.studentDeleted.next(student);
    });

    this.connection.start().then(() => console.log( "Student hub is ok!")).catch(error => console.error(error));

    this.connection.onclose((error) => {
      console.log(error)
    })
  }

  sendStudentCreated(student: Student) {
    this.connection.send("OnStudentCreated", 10, 10);
  }



}
