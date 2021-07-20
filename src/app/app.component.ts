import { Component } from '@angular/core';
import { GlobalModel } from './model/global.model';
import { ApiService } from './api/api.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  global: boolean;
  data: GlobalModel;
  radioSelected: any;
  states: any[];
  barChartType = 'horizontalBar';
  barChartLabels: any[] = [
    'Infected', 'Recovered', 'Deaths'
  ];
  barChartData: any[] = [
    { data: [65, 76, 33], label: 'Lable' }
  ];


  constructor(private api: ApiService) {
    this.data = new GlobalModel();
  }

  ngOnInit(): void {
    this.fetchData();
    this.fetchStates();
  }

  fetchData() {
    this.api.fetchCovidData().subscribe((res : any[]) =>{
      var state = 'KA'
      this.data.confiremd = res[state]['total']['confirmed'];
      this.data.recovered = res[state]['total']['recovered'];
      this.data.deaths = res[state]['total']['deceased'];
      this.data.lastupdate = res[state]['meta']['last_updated'];
      this.barChartData = [
        {
          data: [this.data.confiremd, this.data.recovered, this.data.deaths],
          label: 'People'
        }
      ];
    });
  }

  fetchStates() {
    this.api.fetchCovidData().subscribe((res : any[]) =>{
      var listobj =[]
      for(var data in res){
        listobj.push(data)
      }
      this.states = listobj

    });
  }

  fetchDataByState(state: string) {
    this.api.fetchCovidData().subscribe((res : any[]) =>{
      this.data.confiremd = res[state]['total']['confirmed'];
      this.data.recovered = res[state]['total']['recovered'];
      this.data.deaths = res[state]['total']['deceased'];
      this.data.lastupdate = res[state]['meta']['last_updated'];
      this.barChartData = [
        {
          data: [this.data.confiremd, this.data.recovered, this.data.deaths],
          label: 'People'
        }
      ];
    }); 
  }
}
