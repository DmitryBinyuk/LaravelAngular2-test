/// <reference path="../../../typings/browser.d.ts" />
import {Component, OnChanges, SimpleChanges} from '@angular/core';
import {DataService} from './data.service';
import {Phone} from './phone';

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

    ngOnChanges(changes: SimpleChanges) {
        for (let propName in changes) {
            let chng = changes[propName];
            let cur  = JSON.stringify(chng.currentValue);
            let prev = JSON.stringify(chng.previousValue);
            this.log(`${propName}: currentValue = ${cur}, previousValue = ${prev}`);
        }
    }

    private log(msg: string) {
        console.log(msg);
    }
}