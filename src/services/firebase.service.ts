import { Injectable } from '@angular/core';
import {AngularFire, FirebaseListObservable} from 'angularfire2';
import {Jsonp} from '@angular/http';
import {BaseDataModel} from './BaseDataModel';


export enum FBEvent {
  /**
   *  Indicates that all users was found
   */
  ALL_USERS_FOUND,

  /**
   *  Active user found
   */
  USER_FOUND,

  /**
   *  User IP found
   */
  IP_FOUND
}

@Injectable()
export class FirebaseService extends BaseDataModel{

  /**
   *
   * @type {any}
   * the active users IP
   */
  public activeClientIP: any;

  /**
   *
   * @type {any}
   * the active users IP
   */
  public activeClient: any;

  /**
   *
   * firebase obsevable
   */
  public items: FirebaseListObservable<any[]>;

  /**
   *
   * All Objects
   */
  public allUsers: any;

  constructor(private af: AngularFire,
              private clientIP: Jsonp) {
    super();
    this.items = af.database.list('/items');
    this.getActiveClientIP();
    this.getFrebaseUsers();
  }

  /**
   *
   * Get the firbase observable
   */
  public getFrebaseUsers(): any{
    this.items.subscribe((response)=>{
      this.allUsers = response;
      this.emitChange(FBEvent.ALL_USERS_FOUND, { params: this.allUsers});
      return this.allUsers;
    });
  }

  /**
   *
   * Get the active user IP
   */
  public getActiveClientIP(): any{
    this.clientIP.get('//api.ipify.org/?format=jsonp&callback=JSONP_CALLBACK')
      .subscribe(response => {
        this.activeClientIP = response;
        this.emitChange(FBEvent.IP_FOUND, { params: this.activeClientIP});
        return this.activeClientIP
      });
  }

  /**
   *
   * locates the user thats logged in and navigates to his/her
   * last saved location.
   */
  public locateActiveUser(): any{
    for (var i = 0; i < this.allUsers.length; i++) {
      if (this.allUsers[i]['IP'] === this.activeClientIP['_body'].ip){
        this.activeClient = this.allUsers[i];
        this.emitChange(FBEvent.USER_FOUND, { params: this.allUsers[i]});
        return this.allUsers[i];
      }
    }
  }
}
