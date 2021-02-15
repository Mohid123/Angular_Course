import { Component, OnInit } from '@angular/core';
import { Leader } from '../shared/leader';
import { LeaderService } from '../services/leader.service';
import { flyinout, expand } from '../animations/app.animation';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss'],
   host: {
    '[@flyinout]': 'true',
    'style': 'display: block;'
  },
  animations: [
  flyinout(),
  expand()
  ]
})
export class AboutComponent implements OnInit {

	leaders!: Leader[];

	selectedLeader!: Leader;

  constructor(private leaderService: LeaderService) { }

  ngOnInit(): void {
  	this.leaderService.getLeaders()
    .subscribe(leader => this.leaders = leader);
  }

  onSelect(leader: Leader) {
  	this.selectedLeader = leader;
  }
}
