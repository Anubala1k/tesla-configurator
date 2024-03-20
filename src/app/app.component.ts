import {Component, OnInit} from '@angular/core';
import {AsyncPipe, JsonPipe} from '@angular/common';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { HomepageDashboardComponent } from './homepage/homepage-dashboard.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports:  [AsyncPipe, JsonPipe, RouterOutlet, RouterLink, RouterLinkActive, HomepageDashboardComponent],
  templateUrl: 'app.component.html',
})
export class AppComponent implements OnInit{
  title = "tesla-configurator";
  constructor() {
  }

  ngOnInit(): void {
  }

}