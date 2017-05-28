import {Component, OnInit, ElementRef, ViewChild} from '@angular/core';
import {FormGroup, FormControl, Validators} from '@angular/forms';
import {FirebaseListObservable, AngularFire} from 'angularfire2';
import {GoogleService} from '../../services/google.service';
import {Jsonp} from '@angular/http';
import {Router} from '@angular/router';
import {CoordinatesService, COOEvent} from '../../services/coordinates.service';
import {FirebaseService, FBEvent} from '../../services/firebase.service';
import {log} from 'util';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.css']
})
export class WelcomeComponent implements OnInit {

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
   * active user form group
   */
  public form: FormGroup;

  /**
   *
   */
  public userId: any;
  /**
   *
   * @type {FormControl}
   */
  public name: FormControl = new FormControl('', Validators.required);

  /**
   *
   * @type {FormControl}
   */
  public lat: FormControl = new FormControl('');

  /**
   *
   * @type {FormControl}
   */
  public long: FormControl = new FormControl('');

  /**
   *
   * @type {any}
   */
  public locationName: any ;

  /**
   *
   * @type {any}
   */
  public activeClientIP: any;

  /**
   *
   * Firebase observable for return values
   */
  items: FirebaseListObservable<any[]>;

  /**
   *
   * browser lat and long var
   */
  public location = {};

  //////////////////////////////////////////////
  //
  //          CONSTRUCTOR
  //
  //////////////////////////////////////////////

  constructor(private gs: GoogleService,
              private frb: FirebaseService,
              private router :Router,
              private cos: CoordinatesService) {
    this.form = new FormGroup({
      'name': this.name,
      'lat': this.lat,
      'long': this.long
    });
    this.items = this.frb.items
    this.cos.subscribe((event) => {
      switch (event.kind) {
        case COOEvent.LOCATION_UPDATED:
          this.location = event.value.params;
          this.reverseLookup();
          break;
      }
    });
    this.frb.subscribe((event) => {
      switch (event.kind) {
        case FBEvent.IP_FOUND:
          this.activeClientIP = event.value.params;
          this.reverseLookup();
          break;
        case FBEvent.ALL_USERS_FOUND:
          this.frb.locateActiveUser();
          break;
        case FBEvent.USER_FOUND:
          this.name.setValue(event.value.params['name']);
          this.userId = event.value.params['$key']
          break;
      }
    });
  }

  //////////////////////////////////////////////
  //
  //          ANGULAR LIFE HOOKS
  //
  //////////////////////////////////////////////

  public ngOnInit() {
    setInterval( () => {
      if (!this.activeClientIP) {
        this.activeClientIP = this.frb.activeClientIP;
      }
    }, 10000);
  }

  //////////////////////////////////////////////
  //
  //          PUBLIC METHODS
  //
  //////////////////////////////////////////////

  /**
   *
   * Submits form and saves to firebase
   */
  public onSubmit(){
    let params = {
      name: this.name.value,
      lat :this.location['latitude'],
      long: this.location['longitude'],
      IP  : this.activeClientIP['_body'].ip
    };

    if (this.userId) {
      this.items.update(this.userId, params)
    }else {
      this.items.push(params);
    }

    this.name.setValue('');
    this.router.navigate(['mark']);
  }

  /**
   *
   * does reverse lookup of lat and long to return Street address
   */
  public reverseLookup(){
    if(!this.locationName){
      this.gs.apiCall(this.location['latitude'], this.location['longitude'])
        .map(response => response.json())
        .subscribe((response) => {
          if(response.results){
            this.locationName = response.results[0].formatted_address.split(",")
          }else {
            this.locationName = ''
          }
        }, (err: any) => {
          console.log('err',err)
        });
    }

  }
}
