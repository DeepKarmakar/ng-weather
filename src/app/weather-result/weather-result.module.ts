import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WeatherResultComponent } from './weather-result/weather-result.component';
import { TabsComponent } from './tabs/tabs.component';
import { TabComponent } from './tabs/tab.components';
import { AutocompleteLibModule } from 'angular-ng-autocomplete';
import { WeatherChartComponent } from './weather-chart/weather-chart.component';

@NgModule({
  declarations: [
    WeatherResultComponent,
    TabsComponent,
    TabComponent,
    WeatherChartComponent
  ],
  imports: [
    CommonModule,
    AutocompleteLibModule
  ],
  exports: [
    WeatherResultComponent,
    TabsComponent,
    TabComponent
  ]
})
export class WeatherResultModule { }
