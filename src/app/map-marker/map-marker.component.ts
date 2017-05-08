import {Component, OnInit, ElementRef, ViewChild} from '@angular/core';
import { AngularFire, FirebaseListObservable } from 'angularfire2';
import {FormGroup, FormControl} from '@angular/forms';
import 'rxjs/add/operator/startWith';
import {MdlAlertComponent, MdlDialogComponent} from 'angular2-mdl';
import {Jsonp} from '@angular/http';
import {forEach} from '@angular/router/src/utils/collection';

@Component({
  selector: 'app-map-marker',
  templateUrl: './map-marker.component.html',
  styleUrls: ['./map-marker.component.css']
})
export class MapMarkerComponent implements OnInit {

  //////////////////////////////////////////////
  //
  // Public Var
  //
  //////////////////////////////////////////////

  /**
   *
   * @type {number}
   * page height var
   */
  public height: number = 10;

  /**
   *
   * Dialog form group
   */
  public form: FormGroup;

  /**
   *
   * @type {FormControl}
   * countries list
   */
  public countries: FormControl = new FormControl('');

  /**
   *
   *Material design element ref to open or close dialogbox
   */
  @ViewChild('editUserDialog')
  public editUserDialog: MdlDialogComponent;

  /**
   *
   * Element ref of dom to get page height
   */
  @ViewChild('fontpage')
  public fontpage: ElementRef;

  /**
   *
   * firebase obsevable
   */
  public items: FirebaseListObservable<any[]>;

  /**
   *
   * @type {number}
   * lat of sa as defualt
   */
  public lat: number = -30.559482;

  /**
   *
   * @type {number}
   * long of sa as defualt
   */
  public lng: number = 22.937505999999985;

  /**
   *
   * @type {string}
   * sa as defualt
   */
  public countryName = 'South Africa'

  /**
   *
   * @type {{}}
   * location object
   */
  public location = {};

  /**
   *
   * @type {any}
   * the active users IP
   */
  public activeClientIP: any;

  //////////////////////////////////////////////
  //
  //          CONSTRUCTOR
  //
  //////////////////////////////////////////////

  constructor(af: AngularFire,
              private clientIP: Jsonp) {
    this.items = af.database.list('/items');
    this.form = new FormGroup({
      'countries': this.countries
    })

    //will return the active users IP adress
    this.clientIP.get('//api.ipify.org/?format=jsonp&callback=JSONP_CALLBACK')
      .subscribe(response => {
        this.activeClientIP = response
        this.locateActiveUser();
      });
  }

  //////////////////////////////////////////////
  //
  //          ANGULAR LIFE HOOKS
  //
  //////////////////////////////////////////////

  public ngOnInit(){
    if(this.fontpage.nativeElement){
      this.height = window.innerHeight;
    }
  }

  //////////////////////////////////////////////
  //
  //          PUBLIC METHODS
  //
  //////////////////////////////////////////////

  /**
   *
   * @param item
   * submits the details entered to change location on map
   */
  public submitDetals(item){
    this.lat = item.geometry.location.lat;
    this.lng = item.geometry.location.lng;
    this.countryName = item.formatted_address;
  }

  /**
   *
   *Shows the dialog box
   */
  public onDialogShow(){
    this.editUserDialog.show()
  }

  /**
   *
   *hides dialog box
   */
  public onDialogHide(){
    this.editUserDialog.close()
  }

  /**
   *
   * locates the user thats logged in and navigates to his/her
   * last saved location.
   */
  public locateActiveUser(){
    for (var item in this.items) {
      console.log(item['IP'], this.activeClientIP['_body'].ip)
      if (item['IP'] === this.activeClientIP['_body'].ip){
        console.log(item['IP'])
        this.lat = item['lat']
        this.lng = item['long']
      }
    }
  }


}
