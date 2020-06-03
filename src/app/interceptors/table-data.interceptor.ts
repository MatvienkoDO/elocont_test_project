import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpResponse } from '@angular/common/http';
import { Observable, ReplaySubject } from 'rxjs';
import { map, first } from 'rxjs/operators';

import { DataItem } from '../interfaces/data-item';

const localStorageKey = 'data';

@Injectable()
export class TableDataInterceptor implements HttpInterceptor {
  private readonly data: ReplaySubject<DataItem[]>;
  private readonly data$: Observable<HttpResponse<DataItem[]>>;
  
  private currentData: DataItem[] = [];

  constructor() {
    this.data = new ReplaySubject(1);
    this.data$ = this.data.pipe(
      first(),
      map(
        data => new HttpResponse({
          body: data
        })
      )
    );

    this.initializeData();
    this.updateLocalStorage();
  }

  private initializeData() {
    const fromStorageData = localStorage.getItem(localStorageKey);
    if (fromStorageData) {
      const newData = JSON.parse(fromStorageData);

      this.data.next(newData);
      this.currentData = newData;
    } else {
      fetch("assets/data.json").then(async response => {
        const data = await response.json();
        
        if (data && Array.isArray(data.result)) {
          const newData: DataItem[] = data.result;
  
          this.data.next(newData);
          this.currentData = newData;
        }
      });
    }
  }

  private updateLocalStorage() {
    // there is no need to unsubscribe. This subscription will live all time of app
    this.data.subscribe(newData => {
      localStorage.setItem(localStorageKey, JSON.stringify(newData));
    });
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (req.method === 'PUT' && req.url === 'table-data') {
      this.currentData.push(req.body);

      this.data.next(this.currentData);

      return this.data$;
    }

    if (req.method === 'GET' && req.url === 'table-data') {
      return this.data$;
    }

    if (req.method === 'PATCH' && req.url === 'table-data') {
      const index = req.body.index;
      const update = req.body.update;

      Object.assign(this.currentData[index], update);
      this.data.next(this.currentData);

      return this.data$;
    }

    if (req.method === 'DELETE' && req.url === 'table-data') {
      const index = Number(req.headers.get('index'));

      if (isNaN(index)) {
        throw { reason: 'incorrect index header value' };
      }

      this.currentData.splice(index, 1);
      this.data.next(this.currentData);

      return this.data$;
    }

    return next.handle(req);
  }
}
