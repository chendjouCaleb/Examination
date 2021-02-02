﻿export interface ITokenModel {
  accessToken: string;
  refreshToken: string;
  expireAt?: Date;
}


export class AccessToken {

  constructor(value: any = {}) {
    this.id = value.id;
    this.registrationDate = value.registrationDate ? new Date(value.registrationDate) : null;
    this.expireAt = value.expireAt ? new Date(value.expireAt) : null;

    this.token = value.token;
    this.refreshToken = value.refreshToken;
    this.connectionId = value.connectionId;
    this.duration = value.duration;
    this.clientId  = value.clientId;
  }

  id: string;
  registrationDate: Date;
  token: string;
  refreshToken: string;

  expireAt?: Date;

  duration: number;

  connectionId: number;

  clientId: string;
}
