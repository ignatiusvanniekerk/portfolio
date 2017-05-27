import { Injectable } from '@angular/core';

@Injectable()
export class CoordinatesService {

  public scope: Array<any> | boolean = false;

  constructor() {
  }

  public getScope(): Array<any> | boolean {
    return this.scope;
  }

  public setScope(scope: any): void {
    this.scope = scope;
  }


}
