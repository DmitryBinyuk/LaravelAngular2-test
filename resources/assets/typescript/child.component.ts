/// <reference path="../../../typings/browser.d.ts" />
import { Component,
    EventEmitter,
    Input,
    Output,
    OnInit,
    OnChanges,
    SimpleChanges,
    DoCheck,
    AfterContentInit,
    AfterContentChecked,
    AfterViewChecked,
    AfterViewInit } from '@angular/core';
import {DataService} from './data.service';
import {Phone} from './phone';
import {LogService} from './log.service';
import { Response} from '@angular/http';
import {User} from './user';
      
@Component({
    selector: 'child-comp',
    template: `<h2>(дочерний компонент)Добро пожаловать {{name}}!</h2>
		<p>Возраст пользователя (тянем из парент компонента): {{userAge}}</p>
		<button (click)="change(true)">+</button>
		<button (click)="change(false)">-</button><br>
        <input type="text" [(ngModel)]="name">
        <input type="number" [(ngModel)]="age"><br>
        <p #userName>{{name}}</p><br>
        <p [ngStyle]="{'color':'yellow'}">{{userName.textContent}}</p><br>

        <p [ngClass]="{invisible: visibility}">VISIBILITY</p><button (click)="toggle()">Toggle VISIBILITY</button><br>

        <p *ngIf="1==1">VISIBILITY (IF)</p>
        
        <div [ngClass]="{verdanaFont:true}">
            <h1>Hello Angular 2</h1>
            <p [ngClass]="{verdanaFont:false, segoePrintFont:true}">
                Angular 2 представляет модульную архитектуру приложения
            </p>
        </div>
    <h3> Сервисы: </h3>
    <!--<div>-->
        <!--<p>Имя пользователя: {{user?.name}}</p>-->
        <!--<p>Возраст пользователя: {{user?.age}}</p>-->
    <!--</div>-->
    <ul>
        <li *ngFor="let user of users">
            <p>Имя пользователя: {{user.name}}</p>
            <p>Возраст пользователя: {{user.age}}</p>
        </li>
    </ul>`,
    styles: [`h2, p {color:red;}
        .verdanaFont{font-size:13px; font-family:Verdana;}
        .segoePrintFont{font-size:14px; font-family:"Segoe Print";}
        .invisible{display:none;}`],
    providers: [DataService]//, LogService]
})

export class ChildComponent implements OnInit,
        OnChanges,
        DoCheck,
        AfterContentInit,
        AfterContentChecked,
        AfterViewChecked,
        AfterViewInit {

    items: Phone[] = [];
    constructor(private dataService: DataService){}

    count:number=1;

    @Input() name: string = "Евгений";

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

    user: User;
    users: User[]=[];

    //onInit and Co
    ngOnInit() {
        // this.items = this.dataService.getData();

        // this.dataService.getData().subscribe((data: Response) => this.user=data.json());

        this.dataService.getUsers().subscribe((data)=>this.users=data);
    }

    ngOnChanges(changes: SimpleChanges) {
        this.log(`OnChanges`);
        for (let propName in changes) {
            let chng = changes[propName];
            let cur  = JSON.stringify(chng.currentValue);
            let prev = JSON.stringify(chng.previousValue);
            this.log(`child: ${propName}: currentValue = ${cur}, previousValue = ${prev}`);
        }
    }

    ngDoCheck() {

        this.log(`ngDoCheck`);
    }
    ngAfterViewInit() {

        this.log(`ngAfterViewInit`);
    }
    ngAfterViewChecked() {

        this.log(`ngAfterViewChecked`);
    }
    ngAfterContentInit() {

        this.log(`ngAfterContentInit`);
    }
    ngAfterContentChecked() {

        this.log(`ngAfterContentChecked`);
    }

    private log(msg: string) {
        console.log(this.count + ". " + msg);
        this.count++;
    }

    visibility: boolean = true;
    // переключаем переменную
    toggle(){
        this.visibility=!this.visibility;
    }
}