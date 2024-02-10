import { Component, OnInit } from '@angular/core';
import { ApiService } from '../shared/services/api.service';
import { environment } from 'src/environments/environment';
import { ReplaySubject, takeUntil, tap } from 'rxjs';
import { Root } from '../shared/models/root';
import { Router } from '@angular/router';

@Component({
  selector: 'app-investors',
  templateUrl: './investors.component.html',
  styleUrls: ['./investors.component.css']
})
export class InvestorsComponent implements OnInit {

  constructor(private apiService: ApiService, private router: Router) { }

  private onDestroy: ReplaySubject<boolean> = new ReplaySubject(1);
  public investorsResponse: Root;

  ngOnInit(): void {
    this.getInvestors();
  }

  getInvestors() {
    let encodedString = encodeURIComponent('2670,2792,332,3611');
    this.apiService.get('api/Investor?FirmID=' + encodedString).pipe(
      tap(),
      takeUntil(this.onDestroy)
    ).subscribe((response: Root) => {
      this.investorsResponse = response;
    })
  }

  navigateToInvestor() {
    this.router.navigate(['Investor']);
  }

  ngOnDestroy() {
    this.onDestroy.next(true);
    this.onDestroy.complete();
  }

}
