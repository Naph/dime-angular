import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { StyleGuideComponent } from "./shared/style-guide.component";

@NgModule({
  imports: [BrowserModule],
  declarations: [
    AppComponent,
    StyleGuideComponent
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
