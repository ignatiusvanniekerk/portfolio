import { Injectable } from '@angular/core';
import {Http, Response}       from '@angular/http';
import { Observable }     from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
@Injectable()

export class GoogleService {

  private apiUrl: any = 'https://maps.googleapis.com/maps/api/geocode/json?'
  private latlong: any = 'latlng=';
  private streetName: any = 'address='

  constructor(private http: Http) {}

  public apiCall(lat: any, long: any): Observable<Response>  {
      return this.http.get(`${this.apiUrl}${this.latlong}${lat},${long}`)
    }

  public apiCallName(name: any): Observable<Response>  {
      return this.http.get(`${this.apiUrl}${this.streetName}${name}`)
    }
}
