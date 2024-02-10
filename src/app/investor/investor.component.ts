import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from '../shared/services/api.service';
import { ReplaySubject, takeUntil, tap } from 'rxjs';
import { InvestorResponse } from '../shared/models/investorResponse';

@Component({
  selector: 'app-investor',
  templateUrl: './investor.component.html',
  styleUrls: ['./investor.component.css']
})
export class InvestorComponent implements OnInit {

  constructor(private activatedRoute: ActivatedRoute, private apiService: ApiService) {
    this.firmId = +this.activatedRoute.snapshot.paramMap.get('id');
  }

  firmId: number;
  private onDestroy: ReplaySubject<boolean> = new ReplaySubject(1);
  investorResponse: InvestorResponse;
  assetType: string = null;

  ngOnInit(): void {
  }

  showCommitment() {
    this.apiService.get('api/Investor/commitment/' + this.assetType + '/' + this.firmId).pipe(
      tap(),
      takeUntil(this.onDestroy)
    ).subscribe((response: InvestorResponse) => {
      this.investorResponse = response;
    })
  }

  ngOnDestroy() {
    this.onDestroy.next(true);
    this.onDestroy.complete();
  }

}
