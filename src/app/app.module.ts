import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ApiService } from './service/api.service';
import { HttpClientModule } from '@angular/common/http';
import { CityInputComponent } from './component/city-input/city-input.component';
import { FormsModule } from '@angular/forms';
import { WeatherResultModule } from './weather-result/weather-result.module';
import { AutocompleteLibModule } from 'angular-ng-autocomplete';
import { TempConverterPipe } from './filters/temp-converter.pipe';
import { NgxSpinnerModule } from 'ngx-spinner';

@NgModule({
  declarations: [
    AppComponent,
    CityInputComponent,
    TempConverterPipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    WeatherResultModule,
    AutocompleteLibModule,
    NgxSpinnerModule
  ],
  providers: [ApiService],
  bootstrap: [AppComponent]
})
export class AppModule { }
