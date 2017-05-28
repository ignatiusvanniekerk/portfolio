import {Component, OnInit, ElementRef, ViewChild} from '@angular/core';
import {FirebaseListObservable } from 'angularfire2';
import {FormGroup, FormControl} from '@angular/forms';
import 'rxjs/add/operator/startWith';
import {MdlDialogComponent} from 'angular2-mdl';
import {FirebaseService, FBEvent} from '../../services/firebase.service';
import {CoordinatesService, COOEvent} from '../../services/coordinates.service';

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
  public countryName = 'South Africa';

  /**
   *
   * @type {{}}
   * location object
   */
  public location = {};

  /**
   *
   * All Objects
   */
  public allUsers: any;

  /**
   *
   * Active user
   */
  public activeUser: any;

  /**
   *
   * follow user or check map
   */
  public followME: boolean = true;

  /**
   *
   * initial Found
   */
  public intialFound: boolean = false;

  //////////////////////////////////////////////
  //
  //          CONSTRUCTOR
  //
  //////////////////////////////////////////////

  constructor(private frb: FirebaseService,
              private cos: CoordinatesService) {
    this.form = new FormGroup({
      'countries': this.countries
    });
    this.intialFound = false;
    this.items = this.frb.items;
    if(this.frb.allUsers){
      this.allUsers = this.frb.allUsers
      this.asignActiveUser(this.frb.activeClient);
    }
    this.frb.subscribe((event) => {
      switch (event.kind) {
        case FBEvent.ALL_USERS_FOUND:
          this.allUsers = event.value.params;
          this.frb.locateActiveUser();
          break;
        case FBEvent.USER_FOUND:
          this.asignActiveUser(event.value.params);
          break;
      }
    });
    this.cos.subscribe((event) => {
      switch (event.kind) {
        case COOEvent.LOCATION_UPDATED:
          if (this.followME) {
            this.udateMakerMoving(event.value.params);
          }
          break;
      }
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
    this.followME = false;

  }

  /**
   *
   *Shows the dialog box
   */
  public onDialogShow(){
    this.editUserDialog.show();
  }

  /**
   *
   *hides dialog box
   */
  public onDialogHide(){
    this.editUserDialog.close();
  }

  /**
   *
   * @param user
   */
  public asignActiveUser(user){
    if (user) {
      this.activeUser = user;
      this.lat = user['lat'];
      this.lng = user['long'];
      this.countryName = user['name'];
    }else{
      this.followME = false;
    }
  }

  /**
   *
   * @param newLoaction
   */
  public udateMakerMoving(newLoaction){
    if (this.activeUser ) {
      this.activeUser['lat'] = newLoaction['latitude'];
      this.activeUser['long'] = newLoaction['longitude'];
      this.items.update(this.activeUser['$key'], this.activeUser).then(()=>{
        this.lat = newLoaction['latitude'];
        this.lng = newLoaction['longitude'];
      });
    }else if (!this.intialFound) {
      this.lat = newLoaction['latitude'];
      this.lng = newLoaction['longitude'];
      this.countryName = 'Found You';
    }
  }

}
