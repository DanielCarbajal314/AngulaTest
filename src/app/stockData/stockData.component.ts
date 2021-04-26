import { HttpClient } from '@angular/common/http';
import {Component, OnDestroy, OnInit} from '@angular/core';
import { Subscription } from 'rxjs';
import { StocksService } from './services/stocks.service';
import { StocksUiService } from './uiServices/stocks-ui.service';

@Component({
  selector: 'stock-data',
  templateUrl: './stockData.component.html',
  styleUrls: ['./stockData.component.scss']
})
export class StockData implements OnInit, OnDestroy {
  public open: number;
  public high: number;
  public low: number;
  public close: number;
  public stockQuery: string = '';

  private noResults: boolean = false;
  private searchMade: boolean = false;
  private suscriptions: Subscription[] = [];
  private stocksUiService: StocksUiService

  get showResults() {
    return this.searchMade && !this.noResults;
  }

  get showNoResults() {
    return this.searchMade && this.noResults;
  }


  constructor(private http: HttpClient) {
    this.stocksUiService = new StocksUiService(new StocksService(this.http));
  }


  ngOnInit() {
    this.suscriptions.push(this.stocksUiService.$emptyResult.subscribe(() => {
      this.noResults = true;
      this.searchMade = true;
    }));
    this.suscriptions.push(this.stocksUiService.$stockData.subscribe(stockData => {
      this.open = stockData.open;
      this.high = stockData.high;
      this.low = stockData.low;
      this.close = stockData.close;
      this.noResults = false;
      this.searchMade = true;
    }));
  }  
  
  ngOnDestroy(): void {
    this.suscriptions.forEach(x => x.unsubscribe());
  }

  search() {
    this.stocksUiService.queryStocks(this.stockQuery);
  }
}