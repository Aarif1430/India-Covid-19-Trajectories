import { ViewChild, ElementRef, Component, OnInit } from '@angular/core';
import Plotly from 'plotly.js-dist';
import { DashboardService } from './dashboard.service';
import { Subscription } from 'rxjs/Subscription';
import { SidebarService } from '../../components/sidebar/sidebar.service'
@Component({
  selector: 'app-dashboard',
  templateUrl: 'dashboard.component.html'
})
export class DashboardComponent implements OnInit {
  test: Date = new Date();
  public data: any;
  public data1: any;
  public dates: [];
  public layout: any;
  private selectedStates = ['Maharashtra'];
  public visibleStates: any;
  private color = 'black-content';
  clickEventsubscription:Subscription;
  @ViewChild('plotContainer') plotContainer: ElementRef;

  constructor(private dashboardService: DashboardService, private sidebarService: SidebarService) {
    this.clickEventsubscription = this.sidebarService.getClickEvent().subscribe((selectedValue)=>{
      this.color = selectedValue[0];
      this.selectedStates = selectedValue[0];
      if (selectedValue[1] === 'C'){this.changeGraphLayout()}
      if (selectedValue[1] === 'S'){this.updateGraph()}
      })
  }

  ngOnInit() {
    let processedData: any;
      this.dashboardService.getCovidData().subscribe(res => {
        this.data1 = res;
        processedData = this.processData();
        this.dates = processedData.dt;
        this.data = processedData.da;
        this.setConfiguration();
        this.sidebarService.visibleStates = this.visibleStates;
      });
  }
  changeGraphLayout(){
    if(this.color === 'black-content'){
      this.layout.plot_bgcolor = 'black';
      this.layout.paper_bgcolor = 'black';
      this.layout.title.font.color = 'white';
      this.layout.xaxis.color = 'white';
      this.layout.yaxis.color = 'white';
    } else{
      this.layout.xaxis.color = 'black';
      this.layout.yaxis.color = 'black';
      this.layout.title.font.color = 'black';
      this.layout.plot_bgcolor = 'white';
      this.layout.paper_bgcolor = 'white';
    }
    Plotly.redraw(this.plotContainer.nativeElement);
  }

  public processData(){
    const dates = []
    const data = []
    let temp = [];
    let movavg = [];
    this.visibleStates = ['an', 'ap', 'ar', 'as', 'br', 'ch', 'ct', 'dd', 'dl', 'dn', 'ga', 'gj', 'hp', 'hr', 'jh',
          'jk', 'ka', 'kl', 'la', 'ld', 'mh', 'ml', 'mn', 'mp', 'mz', 'nl', 'or', 'pb', 'py', 'rj', 'sk', 'tg', 'tn', 'tr',
          'tt', 'up', 'ut', 'wb'];
    const states = {an  :'Andaman and Nicobar Islands',ap  :'Andhra Pradesh',ar  :'Arunachal Pradesh',as  :'Assam',
          br  :'Bihar',ch  :'Chandigarh',ct  :'Chhattisgarh',dn  :'Dadra and Nagar Haveli',dd  :'Daman and Diu',
          dl  :'Delhi',ga  :'Goa',gj  :'Gujarat',hr  :'Haryana',hp  :'Himachal Pradesh',jk  :'Jammu and Kashmir',
          jh  :'Jharkhand',ka  :'Karnataka',kl  :'Kerala',ld  :'Lakshadweep',mp  :'Madhya Pradesh',mh  :'Maharashtra',
          mn  :'Manipur',ml  :'Meghalaya',mz  :'Mizoram',nl  :'Nagaland',or  :'Odisha',py  :'Puducherry',pb  :'Punjab',
          rj  :'Rajasthan',sk  :'Sikkim',tn  :'Tamil Nadu',tg  :'Telangana',tr  :'Tripura',up  :'Uttar Pradesh',
          ut  :'Uttarakhand',wb  :'West Bengal'}
    this.data1.forEach((d: any) => {
      if (d.status === 'Confirmed'){
        dates.push(d.date);
      }
    });
    this.visibleStates.forEach((key: string) => {
      this.data1.forEach((d: any) => {
        if (d.status === 'Confirmed'){
          temp.push(d[key]);
        }
      });
      temp = temp.map(Number);
      temp = temp.reduce((r, a) => {
        r.push((r.length && r[r.length - 1] || 0) + a);
        return r;
      }, []);
      for (let i = 1; i < temp.length; i++){
        const mean = (temp[i] + temp[i-1] + temp[i+1])/3;
        movavg.push(Math.floor(mean));
      }
      movavg = temp.map((e, i, a) => e - a[i - 7])
      data.push({state:states[key], date:dates,cases:temp.map(e => e >= 5 ? e : NaN), m: movavg.map((e, i) => temp[i] >= 5 ? e : NaN)});
      temp = [];
      movavg = [];
    });
    return {dt:dates, da:data};
  }

  public formatDataForPlotting(states: string[]) {
    const graphData = [];
    let graphDate = [];
    this.data.forEach((d: any) => {
      this.dates.forEach((dt: string) => {
        graphDate.push(d.state+'<br>'+dt);
      });
      if(states.includes(d.state)){
      graphData.push({x: d.cases, y: d.m, name: d.state,
        text: this.dates.map(date => d.state + '<br>' + date),
        mode:'lines+markers',type:'scatter',
        textposition: 'center right',
        marker:{size:2,color:'rgba(254, 52, 110, 1)'},
        line:{color:'#721b65', simplify: false},
        transforms: [{
          type: 'filter',
          operation: '<=',
          target: this.dates,
          value: this.dates
        }]
      });
      graphDate = [];
      }});
    return graphData;
  }
  public updateGraph(): void{
    console.log(this.selectedStates);
    const dataFrame = this.formatDataForPlotting(this.selectedStates);
    Plotly.react(this.plotContainer.nativeElement, dataFrame, this.layout);
  }
  public setConfiguration(): void{
  const dataFrame = this.formatDataForPlotting(this.selectedStates);
  const dateframes = [];
  for (const date of this.dates) {
    dateframes.push({
      name: date,
      data:  this.data.map(d => ({
        'transforms[0].value': date
      }))
    })
  }
    const graphDiv = this.plotContainer.nativeElement;
    const sliderSteps = [];
    for (const date of this.dates) {
      sliderSteps.push({
        method: 'animate',
        label: date,
        args: [[date], {mode: 'immediate',transition: {duration: 300},frame: {duration: 300, redraw: false}
        }]
      });
    }
    this.layout = {
      height: 700,
      plot_bgcolor:'black',
      paper_bgcolor:'black',
      title:{text:'Trajectory of Indian States COVID-19 Confirmed Cases ('+this.dates[this.dates.length - 1]+')',
      font: {size: 24,color: 'white'}},
      showlegend:false,
      autorange:false,
      xaxis:{title:'Total Confirmed Cases',type:'log',range:[1,6],color:'white',titlefont:{size:24,color:'rgba(242, 59, 118,1)'}},
      yaxis:{title:'New Confirmed Cases Last Week',type:'log',range:[0,5],color:'white',titlefont:{size:24,color:'rgba(242, 59, 118,1)'}},
      hovermode:'closest',
      font:{family:'Open Sans, sans-serif',color:'black',size:14},
      updatemenus: [{x: 0,y: 0,yanchor: 'top',xanchor: 'left',showactive: false,direction: 'left',type: 'buttons',pad: {t: 90, r: 10},
      buttons: [{method: 'animate',fill: 'white',args: [null, {
            mode: 'immediate',
            fromcurrent: true,
            transition: {duration: 300},
            frame: {duration: 300, redraw: false}
          }],label: 'Play'
        }, {method: 'animate',args: [[null], {
            mode: 'immediate',
            transition: {duration: 0},
            frame: {duration: 0, redraw: false}
          },
        ],label: 'Pause'}]}],
      sliders: [{tickcolor: 'transparent',font: {color: 'transparent'},
                bordercolor: 'black',pad: {l: 130, t: 60},currentvalue: {
                visible: true,
                prefix: 'Date:',
                xanchor: 'right',
                font: {size: 20, color: 'white'}},
                steps: sliderSteps}
              ]}
  Plotly.plot(graphDiv, {
    data: dataFrame,
    layout: this.layout,
    frames: dateframes
  })
  .then(() => {
    Plotly.animate(graphDiv);
  });
}
}
