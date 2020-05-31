import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpResponse } from '@angular/common/http';
import { Observable, ReplaySubject } from 'rxjs';
import { map, first } from 'rxjs/operators';

import { DataItem } from '../interfaces/data-item';

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

    fetch("assets/data.json").then(async response => {
      const data = await response.json();
      
      if (data && Array.isArray(data.result)) {
        const newData: DataItem[] = data.result;

        this.data.next(newData);
        this.currentData = newData;
      }
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
      this.currentData.splice(req.body.index, 1);
      this.data.next(this.currentData);

      return this.data$;
    }

    return next.handle(req);
  }
}
