import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable()
export class SidebarService {
    private subject = new Subject<any>();
    visibleStates = [{name  :'Andaman and Nicobar',checked: false},
    {name  :'Andhra Pradesh',checked: false},
    {name  :'Arunachal Pradesh',checked: false},
    {name  :'Assam',checked: false},
    {name  :'Bihar',checked: false},
    {name  :'Chandigarh',checked: false},
    {name  :'Chhattisgarh',checked: false},
    {name  :'Dadra and Nagar Haveli',checked: false},
    {name  :'Daman and Diu',checked: false},
    {name  :'Delhi',checked: false},
    {name  :'Goa',checked: false},
    {name  :'Gujarat',checked: false},
    {name  :'Haryana',checked: false},
    {name  :'Himachal Pradesh',checked: false},
    {name  :'Jammu and Kashmir',checked: false},
    {name  :'Jharkhand',checked: false},
    {name  :'Karnataka',checked: false},
    {name  :'Kerala',checked: false},
    {name  :'Lakshadweep',checked: false},
    {name  :'Madhya Pradesh',checked: false},
    {name  :'Maharashtra',checked: true},
    {name  :'Manipur',checked: false},
    {name  :'Meghalaya',checked: false},
    {name  :'Mizoram',checked: false},
    {name  :'Nagaland',checked: false},
    {name  :'Odisha',checked: false},
    {name  :'Puducherry',checked: false},
    {name  :'Punjab',checked: false},
    {name  :'Rajasthan',checked: false},
    {name  :'Sikkim',checked: false},
    {name  :'Tamil Nadu',checked: false},
    {name  :'Telangana',checked: false},
    {name  :'Tripura',checked: false},
    {name  :'Uttar Pradesh',checked: false},
    {name  :'Uttarakhand',checked: false},
    {name  :'West Bengal',checked: false}]
    constructor(){}
    public updateGraph(color: string, flag: string): void{
        this.subject.next([color, flag]);
    }
    getClickEvent(): Observable<any>{
        return this.subject.asObservable();
      }
      public selectedState(state: string[], flag: string): void{
        this.subject.next([state, flag]);
    }
}