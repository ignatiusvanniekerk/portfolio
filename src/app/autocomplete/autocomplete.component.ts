import { Component, OnInit,ElementRef, EventEmitter,Output, Input } from '@angular/core';
import {GoogleService} from '../../services/google.service';

@Component({
  selector: 'autocomplete',
  templateUrl: './autocomplete.component.html',
  styleUrls: ['./autocomplete.component.css'],
  host: {
    '(document:click)': 'handleClick($event)',
  },
})
export class AutocompleteComponent implements OnInit {

  //////////////////////////////////////////////
  //
  // Public Var
  //
  //////////////////////////////////////////////

  /**
   *
   * @type {string}
   * query string from parent component
   */
  @Input()
  public query = '';

  /**
   *
   * @type {Array}
   * returned rosponse from api call
   */
  public filteredList: Array <any> = [];

  /**
   *
   * @type {boolean}
   * to indicate loading if waitning for api to return values
   */
  public loading:boolean = false;

  /**
   *
   * @type {EventEmitter<any>}
   * outputs a api object with the location selected to host component
   */
  @Output()
  valueChanged: EventEmitter<any> = new EventEmitter<any>();

  /**
   * Element ref
   */
  public elementRef: ElementRef;
  ///////////////////////////////////////////////
  //
  //  CONSTRUCTOR
  //
  //////////////////////////////////////////////

  constructor(private myElement: ElementRef,
              private gs: GoogleService) {
    this.elementRef = myElement;
  }

  ///////////////////////////////////////////////
  //
  //  PUBLIC METHODS
  //
  //////////////////////////////////////////////

  /**
   *
   * filter method to locate posible locations of query string
   */
  public filter() {
    this.loading = true;
    if (this.query !== ""){
      this.gs.apiCallName(this.query).map(response => response.json())
        .subscribe((response) => {
            this.loading = false;
            this.filteredList = response.results
          })
    }else{
      this.loading = false;
      this.filteredList = [];
    }
  }

  /**
   *
   * @param item
   * selected item from filtered list and emits to host component
   */
  public select(item){
    this.query = item.formatted_address;
    this.filteredList = [];
    this.valueChanged.emit(item);
  }

  public handleClick(event){
    var clickedComponent = event.target;
    var inside = false;
    do {
      if (clickedComponent === this.elementRef.nativeElement) {
        inside = true;
      }
      clickedComponent = clickedComponent.parentNode;
    } while (clickedComponent);
    if(!inside){
      this.filteredList = [];
    }
  }

  //////////////////////////////////////////////
  //
  //          ANGULAR LIFE HOOKS
  //
  //////////////////////////////////////////////

  ngOnInit() {
  }

}
