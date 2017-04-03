import { Injectable } from '@angular/core';
import { HttpService } from "../shared/http.service";

@Injectable()
export class AuthService {

  constructor(
    public http: HttpService
  ) { }

  auth(username: string, password: string) {
    return this.http.post('auth', { username, password })
      .then(json => localStorage.setItem('id_token', json.id_token));
  }
}
