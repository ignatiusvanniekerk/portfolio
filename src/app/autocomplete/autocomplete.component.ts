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

  @Input()
  public query = '';

  public filteredList: Array <any> = [];

  public elementRef: ElementRef;

  public loading:boolean = false;

  @Output()
  valueChanged: EventEmitter<any> = new EventEmitter<any>();

  constructor(myElement: ElementRef,
              private gs: GoogleService) {
    this.elementRef = myElement;
  }

  filter() {
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

  select(item){
    this.query = item.formatted_address;
    this.filteredList = [];
    this.valueChanged.emit(item);
  }

  handleClick(event){
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

  ngOnInit() {
  }

}
