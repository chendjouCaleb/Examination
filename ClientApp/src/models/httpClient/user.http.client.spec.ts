import {UserHttpClient} from "./user.http.client";
import {TestBed} from "@angular/core/testing";
import {HttpClient, HttpClientModule} from "@angular/common/http";
import {User} from "../user.entity";
import {H} from "@angular/cdk/keycodes";
import {RegisterModel} from "../register.model";
import {register} from "ts-node";

describe('UserHttpClient', () => {
  let httpClient: UserHttpClient;
  let createdUser: User;
  let addModel = new RegisterModel({
    name: "chendjou",
    surname: "user",
    email: "chendjou@user.test",
    password: "123456"
  });

  beforeEach(async () => {
    const module = TestBed.configureTestingModule({
      imports: [HttpClientModule],
    });

    httpClient = new UserHttpClient(module.inject(HttpClient));

    await httpClient.clear();

    createdUser = await httpClient.addAsync(addModel);
  });


  it('Create user', async () => {


    expect(createdUser.id.length).toBe(36);

    expect(createdUser.name).toBe(addModel.name);
    expect(createdUser.surname).toBe(addModel.surname);
    expect(createdUser.email).toBe(addModel.email);

  });

  it('Find user by Id', async () => {
    let user = await httpClient.findAsync(createdUser.id);

    expect(user.id).toBe(createdUser.id);
  });


  it('Find user by Email', async () => {
    let user = await httpClient.findByEmail(createdUser.email);

    expect(user.id).toBe(createdUser.id);
    expect(user.email).toBe(createdUser.email);
  });


  it('Find user by Username', async () => {
    let user = await httpClient.findByUsername(createdUser.username);

    expect(user.id).toBe(createdUser.id);
    expect(user.username).toBe(createdUser.username);
  });

  it('Change Phone Number', async () => {
    let phoneNumber = "695235874";
    await httpClient.updatePhoneNumber(createdUser, phoneNumber);

    let user = await httpClient.findAsync(createdUser.id);
    expect(user.phoneNumber).toBe(phoneNumber);
  });


  it("List user", async () => { });


});
