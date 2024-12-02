import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-faq',
  templateUrl: './faq.component.html',
  styleUrl: './faq.component.css'
})
export class FaqComponent implements OnInit{

  constructor(private _titleService: Title) {

  }

  ngOnInit(): void {
    this._titleService.setTitle('Formuease | FAQ');
  }

}
