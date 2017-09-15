import {Phone} from './phone';
import {Injectable} from '@angular/core';
import {LogService} from './log.service';
import {Http} from '@angular/http';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import {Response} from '@angular/http';
import {User} from './user';

@Injectable()
export class DataService{

    constructor(private http: Http){ }

    private data: Phone[] = [
        { name:"Apple iPhone 7", price: 56000},
        { name: "HP Elite x3", price: 56000},
        { name: "Alcatel Idol S4", price: 25000}
    ];
    getData() {

        return this.http.get('js/user.json')

        // this.logService.write("операция получения данных");
        // return this.data;
    }
    addData(name: string, price: number){

        this.data.push(new Phone(name, price));
    }

    getUsers() : Observable<User[]>{
        return this.http.get('js/user.json')
            .map((resp:Response)=>{

                let usersList = resp.json().data;
                let users :User[] = [];
                for(let index in usersList){
                    console.log(usersList[index]);
                    let user = usersList[index];
                    users.push({name: user.userName, age: user.userAge});
                }
                return users;
            });
    }
}