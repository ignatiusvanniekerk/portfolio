import {Component, OnInit, ElementRef, ViewChild} from '@angular/core';
import { AngularFire, FirebaseListObservable } from 'angularfire2';
import {FormGroup, FormControl} from '@angular/forms';
import 'rxjs/add/operator/startWith';
import {MdlAlertComponent, MdlDialogComponent} from 'angular2-mdl';

@Component({
  selector: 'app-map-marker',
  templateUrl: './map-marker.component.html',
  styleUrls: ['./map-marker.component.css']
})
export class MapMarkerComponent implements OnInit {
  public height: number = 10;

  public form: FormGroup;
  public countries: FormControl = new FormControl('');

  @ViewChild('editUserDialog')
  public editUserDialog: MdlDialogComponent;

  @ViewChild('fontpage')
  public fontpage: ElementRef;

  items: FirebaseListObservable<any[]>;
  lat: number = -30.559482;
  lng: number = 22.937505999999985;
  countryName = 'South Africa'

  location = {};
  setPosition(position){
    setTimeout( position => this.location = position.coords, 0);
  }




  constructor(af: AngularFire) {
    this.items = af.database.list('/items');
    this.form = new FormGroup({
      'countries': this.countries
    })
  }

  ngOnInit(){
    if(this.fontpage.nativeElement){
      this.height = window.innerHeight;
      console.log(this.height)
    }
  }

  public onDialogShow(){
    this.editUserDialog.show()
  }

  submitDetals(item){
    this.lat = item.geometry.location.lat;
    this.lng = item.geometry.location.lng;
    this.countryName = item.formatted_address;
  }

  onDialogHide(){
    this.editUserDialog.close()
  }


}
