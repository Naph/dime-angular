import { Injectable } from '@angular/core';

@Injectable()
export class HttpService {

  private headers = {
    type: 'cors',
    credentials: 'include',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + localStorage.getItem('id_token') || ''
    }
  };

  get(path: string) {
    return this.http(path);
  }

  post(path: string, data: Object) {
    return this.http(path, 'POST', data);
  }

  patch(path: string, data: Object) {
    return this.http(path, 'PATCH', data);
  }

  put(path: string, data: Object) {
    return this.http(path, 'PUT', data);
  }

  destroy(path: string) {
    return this.http(path, 'DELETE');
  }

  http(path: string, method: string = 'GET', data: Object = {}) {
    let host = process.env.API_LOCATION + path;
    let headers = Object.assign(this.headers, {
      method: method,
      body: JSON.stringify(data)
    });

    return fetch(host, headers)
      .then((res) => Promise.all([res, res.json()]))
      .then(([res, json]) => {
        if (res.status < 200 || res.status >= 300) {
          throw new Error(json.message);
        }

        return json;
      });
  }
}
