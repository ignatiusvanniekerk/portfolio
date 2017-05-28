import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { enableProdMode } from '@angular/core';
import { environment } from './environments/environment';
import { AppModule } from './app/app.module';
import {FullPageSpinnerComponent} from './app/full-page-spinner/full-page-spinner.component'
import {SERVICE_PROVIDERS} from './services/service-providers';


if (environment.production) {
  enableProdMode();
}

platformBrowserDynamic().bootstrapModule(AppModule,SERVICE_PROVIDERS);
