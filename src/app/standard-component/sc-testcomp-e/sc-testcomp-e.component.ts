import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'kwp-sc-testcomp-e',
  templateUrl: './sc-testcomp-e.component.html',
  styleUrls: ['./sc-testcomp-e.component.scss']
})
export class ScTestcompEComponent implements OnInit {
  @Input() testMessage: string;

  constructor() { }

  ngOnInit() {
  }

}
