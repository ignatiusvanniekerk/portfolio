import {Component, OnInit, ElementRef, ViewChild} from '@angular/core';
import {FormGroup, FormControl, Validators} from '@angular/forms';
import {FirebaseListObservable, AngularFire} from 'angularfire2';
import {GoogleService} from '../../services/google.service';
import {Http, Jsonp} from '@angular/http';
import {Router} from '@angular/router';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.css']
})
export class WelcomeComponent implements OnInit {

  public height: number = 10;
  public form: FormGroup;
  public name: FormControl = new FormControl('', Validators.required);
  public lat: FormControl = new FormControl('');
  public long: FormControl = new FormControl('');
  public locationName: any ;

  items: FirebaseListObservable<any[]>;

  @ViewChild('fontpage')
  public fontpage: ElementRef;

  location = {};
  setPosition(position){
    setTimeout( position => this.location = position.coords, 100);
    if(position['coords']){
      this.location =position['coords']
      console.log(this.location);
      this.getComments();


    }

  }
  constructor(af: AngularFire,
              private gs: GoogleService,
              private router :Router,
              private clientIP: Jsonp) {
    this.items = af.database.list('/items');
    this.form = new FormGroup({
      'name': this.name,
      'lat': this.lat,
      'long': this.long
    })
    this.clientIP.get('//freegeoip.net/json/?callback=?').subscribe(response => console.log('response',response));
  }

  ngOnInit() {
    setInterval( () => {
      if(this.fontpage.nativeElement){
        this.height = window.innerHeight;
      }
    }, 1000)

    if(navigator.geolocation){
      navigator.geolocation.getCurrentPosition(this.setPosition.bind(this));
    };

  }
  onSubmit(){
    this.items.push({
    name: this.name.value,
    lat :this.location['latitude'],
    long: this.location['longitude']});
    this.name.setValue('');
    this.router.navigate(['/mark']);
  }

  getComments(){
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
