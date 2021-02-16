import { Component, Inject, OnInit } from '@angular/core';
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
  leadersErrMess!: string;
	// selectedLeader!: Leader;

  constructor(private leaderService: LeaderService,
    @Inject('BaseURL') public BaseURL:any) { }

  ngOnInit(): void {
  	this.leaderService.getLeaders()
    .subscribe(leader => this.leaders = leader,
      errmess => this.leadersErrMess = <any>errmess);
  }

  // onSelect(leader: Leader) {
  // 	this.selectedLeader = leader;
  // }
}
