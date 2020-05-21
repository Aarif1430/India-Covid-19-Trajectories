import { Component, OnInit } from '@angular/core';
import { SidebarService } from '../../components/sidebar/sidebar.service'

@Component({
  selector: 'app-admin-layout',
  templateUrl: './admin-layout.component.html',
  styleUrls: ['./admin-layout.component.scss']
})
export class AdminLayoutComponent implements OnInit {
  public sidebarColor: string = 'red';

  constructor(private siderbarService: SidebarService) {}
  changeSidebarColor(color){
    var sidebar = document.getElementsByClassName('sidebar')[0];
    var mainPanel = document.getElementsByClassName('main-panel')[0];

    this.sidebarColor = color;

    if(sidebar != undefined){
        sidebar.setAttribute('data',color);
    }
    if(mainPanel != undefined){
        mainPanel.setAttribute('data',color);
    }
  }
  changeDashboardColor(color){
    const body = document.getElementsByTagName('body')[0];
    if (body && color === 'white-content') {
        body.classList.add(color);
        this.siderbarService.updateGraph(color, 'C');
    }
    else if(body.classList.contains('white-content')) {
      body.classList.remove('white-content');
      this.siderbarService.updateGraph(color, 'C');
    }
  }
  ngOnInit() {}
}
