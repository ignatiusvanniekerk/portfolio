import { BrowserModule } from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpModule, JsonpModule} from '@angular/http';
import { AppComponent } from './app.component';
import {MaterialRootModule, MdInputModule, MaterialModule} from '@angular/material';
import {WelcomeComponent} from './welcome/welcome.component';
import { TopNavbarComponent } from './top-navbar/top-navbar.component';
import { FullPageSpinnerComponent } from './full-page-spinner/full-page-spinner.component';
import { FooterComponent } from './footer/footer.component';
import {AngularFireModule} from 'angularfire2';
import {firebaseConfig} from '../environments/firebase.config';
import { AgmCoreModule } from 'angular2-google-maps/core';
import { MapMarkerComponent } from './map-marker/map-marker.component';
import {CommonModule} from '@angular/common';
import {MdlModule} from 'angular2-mdl';
import {GoogleService} from '../services/google.service';
import {Routes, RouterModule} from '@angular/router';
import { JulieComponent } from './julie/julie.component';
import { AutocompleteComponent } from './autocomplete/autocomplete.component';


const appRoutes: Routes = [
  { path: '', component: WelcomeComponent },
  { path: 'welcome', component: WelcomeComponent },
  { path: 'mark', component: MapMarkerComponent },
  { path: 'julie', component: JulieComponent }

];

@NgModule({
  declarations: [
    AppComponent,
    TopNavbarComponent,
    FullPageSpinnerComponent,
    FooterComponent,
    MapMarkerComponent,
    WelcomeComponent,
    JulieComponent,
    AutocompleteComponent
  ],
  imports: [
    BrowserModule,
    JsonpModule,
    FormsModule,
    CommonModule,
    HttpModule,
    MaterialRootModule,
    MaterialModule,
    MdInputModule,
    MdlModule,
    ReactiveFormsModule,
    AngularFireModule.initializeApp(firebaseConfig),
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyCw8KF21oUgFRQ1afbzij_R1DUVNkMMIXs'
    }),
    RouterModule.forRoot(appRoutes)
  ],
  providers: [GoogleService],
  bootstrap: [AppComponent]
})
export class AppModule { }
