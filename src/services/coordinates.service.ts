import { Injectable } from '@angular/core';
import {BaseDataModel} from './BaseDataModel';

export enum COOEvent {
  /**
   *  Indicates location updating
   */
  LOCATION_UPDATED
}


@Injectable()
export class CoordinatesService extends BaseDataModel{

  /**
   *
   * browser lat and long var
   */
  public location = {};


  /**
   *
   * old location
   */
  public oldLocation: any;

  /**
   *
   * new location
   */
  public newLocation: any;
  //////////////////////////////////////////////
  //
  //          CONSTRUCTOR
  //
  //////////////////////////////////////////////

  constructor() {
    super();
    setInterval(()=>{
      if(navigator.geolocation){
        navigator.geolocation.getCurrentPosition(this.setPosition.bind(this));
      }
    },1000);
  }

  /**
   *
   * @param position Takes the browser position in
   * sets location.
   *
   */
  public setPosition(position){
    if (position['coords']) {
      this.location = position['coords'];
      this.newLocation = this.location;
      if (this.oldLocation !== this.newLocation) {
        this.emitChange(COOEvent.LOCATION_UPDATED, { params: this.location});
        this.oldLocation = this.location;
      }
    }
  }
}
