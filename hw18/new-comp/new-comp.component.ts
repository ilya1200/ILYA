import { Component, OnInit } from '@angular/core';
import { runMain } from 'module';

import { Soldier } from './soldier';
import { Commander } from './commander';
import { Unit } from './unit';

@Component({
  selector: 'app-new-comp',
  templateUrl: './new-comp.component.html',
  styleUrls: ['./new-comp.component.css']
})
export class NewCompComponent implements OnInit {

  constructor() { }

  ngOnInit() {

  }//!ngOnInit()
  
}
