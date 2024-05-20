import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';
import { ToastrConfig } from './toastr.config';
import { tokenInterceptor } from './shared/interceptors/token.interceptor';
import { HTTP_INTERCEPTORS, HttpClientModule, provideHttpClient, withFetch } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { provideToastr } from 'ngx-toastr';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes), 
    provideClientHydration(), 
    provideHttpClient(withFetch()),
    importProvidersFrom(HttpClientModule, ReactiveFormsModule),
    { 
      provide: HTTP_INTERCEPTORS, 
      useValue: tokenInterceptor, 
      multi: true // Set to true to allow multiple interceptors
    },
    provideAnimations(), // required animations providers
    provideToastr(ToastrConfig), // Toastr providers
    provideAnimationsAsync(), provideAnimationsAsync()
  ]
};
