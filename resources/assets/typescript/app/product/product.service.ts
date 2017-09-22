/// <reference path="../../../../../typings/browser.d.ts" />
import {Injectable} from '@angular/core';
import {Http, Jsonp} from '@angular/http';
import {Product} from './product';
import { Observable } from 'rxjs/Observable';
 
@Injectable()
export class ProductService{
 
    constructor(private jsonp: Jsonp){ }
     
    getData(): Observable<Product[]> {
        return this.jsonp.get('/api/v1/products')
    }
}