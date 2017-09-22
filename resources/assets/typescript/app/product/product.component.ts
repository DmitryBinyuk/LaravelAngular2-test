/// <reference path="../../../../../typings/browser.d.ts" />
import {Component, OnChanges, SimpleChanges} from '@angular/core';
import {ProductService} from './product.service';

@Component({
    selector: 'app-products',
    templateUrl: './js/app/product/product.component.html',
    providers: [ProductService]
})
export class ProductComponent {
    products = [];

    constructor(private productService: ProductService){}

    ngOnInit(){
        // this.products = this.productService.getData();

        this.productService.getData().subscribe(data => this.products = data);
    }
}