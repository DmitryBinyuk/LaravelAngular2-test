/// <reference path="../../../typings/browser.d.ts" />
import {Component} from '@angular/core';

@Component({
    selector: 'my-app',
    templateUrl: './js/app.component.html',
    styleUrls: ['./js/app.component.css']
})
export class AppComponent {
    name = "Гость";

    age:number = 24;

    count: number=0;

    increase($event) : void {
        this.count++;
	console.log($event);
    }


    clicks:number = 0;
    onChanged(increased){
        increased==true?this.clicks++:this.clicks--;
    }
}