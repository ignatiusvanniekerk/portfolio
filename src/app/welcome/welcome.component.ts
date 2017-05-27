import {Component, OnInit, ElementRef, ViewChild} from '@angular/core';
import {FormGroup, FormControl, Validators} from '@angular/forms';
import {FirebaseListObservable, AngularFire} from 'angularfire2';
import {GoogleService} from '../../services/google.service';
import {Jsonp} from '@angular/http';
import {Router} from '@angular/router';

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
   * Element ref for the front page dom
   */
  @ViewChild('fontpage')
  public fontpage: ElementRef;

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

  constructor(af: AngularFire,
              private gs: GoogleService,
              private router :Router,
              private clientIP: Jsonp) {
    this.items = af.database.list('/items');
    this.form = new FormGroup({
      'name': this.name,
      'lat': this.lat,
      'long': this.long
    });
    this.clientIP.get('//api.ipify.org/?format=jsonp&callback=JSONP_CALLBACK')
      .subscribe(response => {
        this.activeClientIP = response
      });
  }

  //////////////////////////////////////////////
  //
  //          ANGULAR LIFE HOOKS
  //
  //////////////////////////////////////////////

  public ngOnInit() {
    setInterval( () => {
      if(this.fontpage.nativeElement){
        this.height = window.innerHeight;
      }
    }, 1000);

    if(navigator.geolocation){
      navigator.geolocation.getCurrentPosition(this.setPosition.bind(this));
    }

  }

  //////////////////////////////////////////////
  //
  //          PUBLIC METHODS
  //
  //////////////////////////////////////////////

  /**
   *
   * @param position Takes the browser position in
   * sets location.
   *
   */
  public setPosition(position){
    setTimeout( position => this.location = position.coords, 100);
    if (position['coords']) {
      this.location =position['coords'];
      this.reverseLookup().subscribe((response)=>{

      });
    }
  }

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
    }

    this.items.push(params);

    this.name.setValue('');
    this.router.navigate(['mark',{ queryParams: params}]);
  }

  /**
   *
   * does reverse lookup of lat and long to return Street address
   */
  public reverseLookup(): any{
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
