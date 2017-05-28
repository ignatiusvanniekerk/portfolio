import {GoogleService} from './google.service';
import {FirebaseService} from './firebase.service';
import {CoordinatesService} from './coordinates.service';
import {BaseDataModel} from './BaseDataModel';

/**
 *
 * @type {[FirebaseService,GoogleService,CoordinatesService,BaseDataModel]}
 */
export var SERVICE_PROVIDERS = [
  FirebaseService,
  GoogleService,
  CoordinatesService,
  BaseDataModel
];
