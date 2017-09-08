/// <reference path="../../../typings/browser.d.ts" />
import { Component, EventEmitter, Input, Output } from '@angular/core';
      
@Component({
    selector: 'child-comp',
    template: `<h2>(дочерний компонент)Добро пожаловать {{name}}!</h2>
		<p>Возраст пользователя (тянем из парент компонента): {{userAge}}</p>
		<button (click)="change(true)">+</button>
		<button (click)="change(false)">-</button>`,
    styles: [`h2, p {color:red;}`]
})
export class ChildComponent { 
    name= "Евгений";
    
    _userAge: number;

    @Input()
    set userAge(age:number) {
	this._userAge = age;
    } 

    get userAge() { return this._userAge; }

    @Output() onChanged = new EventEmitter<boolean>();

    change(increased) {
        this.onChanged.emit(increased);
    }
}