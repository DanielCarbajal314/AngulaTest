import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { StockData } from '../services/dtos/stock-data.model';
import { StocksService } from '../services/stocks.service';


export class StocksUiService {

  public readonly $stockData: Subject<StockData> = new Subject();
  public readonly $emptyResult: Subject<void> = new Subject();

  constructor(private stocksService: StocksService) { }

  queryStocks(stockQuery: string) {
    this.stocksService.getStocks(stockQuery).subscribe(stockDataResponse =>{
      stockDataResponse.isEmpty ? this.$emptyResult.next() : this.$stockData.next(stockDataResponse.data);
    })
  }

}
