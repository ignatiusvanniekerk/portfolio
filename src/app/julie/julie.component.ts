import { Component, OnInit } from '@angular/core';


  //////////////////////////////////////////////
  //
  // Just as a playground feature. :)
  //
  //////////////////////////////////////////////

@Component({
  selector: 'app-julie',
  templateUrl: './julie.component.html',
  styleUrls: ['./julie.component.css']
})
export class JulieComponent implements OnInit {

  public time: any;
  public innerHeight:any;
  public height: number = 10;
  public extractData: any
  constructor() { }

  ngOnInit() {
    setInterval( () => {
      let countDownDate = new Date("Jun 14, 2017 19:27:00").getTime();
      let now = new Date().getTime()
      let distance = countDownDate - now;
      let days = Math.floor(distance / (1000 * 60 * 60 * 24));
      let hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      let minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      let seconds = Math.floor((distance % (1000 * 60)) / 1000);
      this.time = days + "d " + hours + "h " + minutes + "m " + seconds + "s ";

      if (distance < 0) {
        this.time = "LOVE YOU JULIE AND WELCOME";
      }

    }, 1000)
  }

}
