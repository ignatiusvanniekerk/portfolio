import { Injectable } from '@angular/core';
import {Http, Response}       from '@angular/http';
import { Observable }     from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
@Injectable()

export class GoogleService {
  /**
   *
   * @type {string}
   * default api string
   */
  private apiUrl: any = 'https://maps.googleapis.com/maps/api/geocode/json?';

  /**
   *
   * @type {string}
   * lat and long
   */
  private latlong: any = 'latlng=';

  /**
   *
   * @type {string}
   * street adress to be added to api string
   */
  private streetName: any = 'address=';

  ///////////////////////////////////////
  //
  //
  //
  ///////////////////////////////////////
  constructor(private http: Http) {}

  /**
   *
   * @param lat
   * @param long
   * @returns {Observable<Response>}
   * gets lat and long object from google api
   */
  public apiCall(lat: any, long: any): Observable<Response>  {
      return this.http.get(`${this.apiUrl}${this.latlong}${lat},${long}`)
    }

  /**
   *
   * @param name
   * @returns {Observable<Response>}
   * returns the street address array
   */
  public apiCallName(name: any): Observable<Response>  {
      return this.http.get(`${this.apiUrl}${this.streetName}${name}`)
    }
}
