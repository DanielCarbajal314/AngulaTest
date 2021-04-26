import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { StockData, StockDataApiResponse, StockDataResponse } from './dtos/stock-data.model';

export class StocksService {

  constructor(private http: HttpClient) { }


  getStocks(stockQuery:string): Observable<StockDataResponse>{
    const query = `https://jsonmock.hackerrank.com/api/stocks?date=${stockQuery}`
    return this.http.get<StockDataApiResponse>(query)
      .pipe(
        map(x => x.total > 0 ? { data: x.data[0], isEmpty:false }: {isEmpty: true})
      );
  }

}
