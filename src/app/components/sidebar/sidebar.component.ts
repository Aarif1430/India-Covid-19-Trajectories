import { Component, OnInit, Injectable } from '@angular/core';
import { SidebarService } from './sidebar.service';

declare interface RouteInfo {
  path: string;
  title: string;
  rtlTitle: string;
  icon: string;
  class: string;
}
export const ROUTES: RouteInfo[] = [
  {
    path: '/dashboard',
    title: 'Dashboard',
    rtlTitle: 'لوحة القيادة',
    icon: 'icon-chart-pie-36',
    class: ''
  }
];

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})

@Injectable()
export class SidebarComponent implements OnInit {
  menuItems: any[];
  dropdownList = [];
  selectedItems = [];
  dropdownSettings = {};
  selectedAll: any;
  visibleStates: any;
  searchText: any;
  constructor(private sidebarService: SidebarService) {}
  ngOnInit() {
    this.menuItems = ROUTES.filter(menuItem => menuItem);
    this.visibleStates = this.sidebarService.visibleStates;
}
onItemSelect(item:any){
  let index = this.selectedItems.indexOf(item);
  if (index !==-1){ index = 0}
  if(!this.selectedItems.includes(item.target.defaultValue)){
    this.selectedItems.push(item.target.defaultValue);
  } else {
    this.selectedItems.splice(index, 1);
  }
  this.sidebarService.selectedState(this.selectedItems, 'S');
}
OnItemDeSelect(item:any){
  console.log(item);
  console.log(this.selectedItems);
}
onSelectAll(items: any){
  for (const state of this.visibleStates) {
    state.checked = true;
    this.selectedItems.push(state.name);
  }
  this.sidebarService.selectedState(this.selectedItems, 'S');
}
onDeSelectAll(items: any){
  for (const state of this.visibleStates) {
    state.checked = false;
  }
  this.selectedItems = [];
  this.sidebarService.selectedState(this.selectedItems, 'S');
}
  hasData(): boolean{
    return true ? this.visibleStates.length > 0 : false;
  }
  isMobileMenu() {
    if (window.innerWidth > 991) {
      return false;
    }
    return true;
  }
}
