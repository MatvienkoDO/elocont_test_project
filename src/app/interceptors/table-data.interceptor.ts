import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpResponse } from '@angular/common/http';
import { Observable, ReplaySubject } from 'rxjs';
import { map, first } from 'rxjs/operators';

@Injectable()
export class TableDataInterceptor implements HttpInterceptor {
  private readonly data = new ReplaySubject(1);

  constructor() {
    fetch("assets/data.json").then(async response => {
      const data = await response.json();
      
      if (data && Array.isArray(data.result)) {
        this.data.next(data.result);
      }
    });
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (req.method === 'get' && req.url === 'table-data') {

      return this.data.pipe(
        first(),
        map(
          data => new HttpResponse({
            body: data
          })
        )
      );
    }

    return next.handle(req);
  }
}
