import { CommonModule } from '@angular/common';
import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'lib-wrapper',
  templateUrl: './wrapper.component.html',
  styleUrls: ['./wrapper.component.css'],
})
export class WrapperComponent implements OnInit{

    @Input() wrapper: { image?: string, backgroundColor: string }[] = [];
    @Input() height: string = '300px';
    width: string = '';

    constructor() {

    }
    ngOnInit(): void {
        const anchoTotal = this.wrapper.length * 250;
        this.width = anchoTotal +'px';
    }

}
