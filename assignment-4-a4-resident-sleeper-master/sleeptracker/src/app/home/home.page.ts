import { Component, OnInit, ViewChild, ElementRef } from "@angular/core";
import { SleepService } from '../services/sleep.service';
import { Chart } from 'chart.js';
import { Storage } from '@ionic/storage';


import { SleepData } from '../data/sleep-data';
import { OvernightSleepData } from '../data/overnight-sleep-data';
import { StanfordSleepinessData } from '../data/stanford-sleepiness-data';
import {black} from "color-name";

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})

export class HomePage implements OnInit{
    @ViewChild("nightCanvas",{static:true}) nightCanvas: ElementRef;
    @ViewChild("dayCanvas",{static:true}) dayCanvas: ElementRef;
    private today = new Date(Date.now());

    public dayEntry: number;
    public nightEntry: Date;
    public nightChart: Chart;
    public dayChart: Chart;


  	constructor(public sleepService:SleepService,private storage: Storage) {
        //this.storage.set('nightArr',[0,0,0,0,0,0,0]) ;
        //this.storage.set('dayArr',[0,0,0,0,0,0,0]) ;
	}
	resetToday(){

        let tod = new Date(this.today);
        this.storage.get('dayArr').then((tempArr) => {
            tempArr[tod.getDay()] = 0
            this.storage.set('dayArr',tempArr);
        this.dayChart = new Chart(this.dayCanvas.nativeElement, {
            type: "line",
            options:{

                legend:{
                    labels:{
                        fontColor: 'black'
                    },
                    fontColor: 'black'
                }

            },
            data: {
                labels: [ "Sunday","Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
                datasets: [
                    {
                        label: "Tiredness During the day (Averaged per day)",
                        fill: false,
                        lineTension: 0.1,
                        backgroundColor: "rgba(255, 71, 26,0.4)",
                        borderColor: "rgba(255, 71, 26,0.4)",
                        borderCapStyle: "butt",
                        borderDash: [],
                        borderDashOffset: 0.0,
                        borderJoinStyle: "miter",
                        pointBorderColor: "rgba(255, 71, 26,0.4)",
                        pointBackgroundColor: "#fff",
                        pointBorderWidth: 1,
                        pointHoverRadius: 5,
                        pointHoverBackgroundColor: "rgba(255, 71, 26,0.4)",
                        pointHoverBorderColor: "rgba(255, 71, 26,0.4)",
                        pointHoverBorderWidth: 2,
                        pointRadius: 1,
                        pointHitRadius: 10,
                        data: tempArr,
                        spanGaps: false
                    }
                ]
            }
        });
    });
        this.storage.get('nightArr').then((tempArr) => {
            tempArr[tod.getDay()] = 0
            this.storage.set('nightArr',tempArr);

        this.nightChart = new Chart(this.nightCanvas.nativeElement, {
            type: "line",
            options:{

                legend:{
                    labels:{
                        fontColor: 'black'
                    },
                    fontColor: 'black'
                }

            },
            data: {
                labels: [ "Sunday","Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
                datasets: [
                    {
                        label: "Hours Slept This week",
                        fill: false,
                        lineTension: 0.1,
                        backgroundColor: "rgba(75,192,192,0.4)",
                        borderColor: "rgba(75,192,192,1)",
                        borderCapStyle: "butt",
                        borderDash: [],
                        borderDashOffset: 0.0,
                        borderJoinStyle: "miter",
                        pointBorderColor: "rgba(75,192,192,1)",
                        pointBackgroundColor: "#fff",
                        pointBorderWidth: 1,
                        pointHoverRadius: 5,
                        pointHoverBackgroundColor: "rgba(75,192,192,1)",
                        pointHoverBorderColor: "rgba(220,220,220,1)",
                        pointHoverBorderWidth: 2,
                        pointRadius: 1,
                        pointHitRadius: 10,
                        data: tempArr,
                        spanGaps: false
                    }
                ]
            }
        });
    });


}
    onAddDay(input){
        let tod = new Date(this.today);
        this.storage.get('dayArr').then((tempArr) => {
            if(tempArr[tod.getDay()] != 0){
                tempArr[tod.getDay()] = (tempArr[tod.getDay()] + input)/2; //get the average for today
            }
            else{
                tempArr[tod.getDay()] =input //set first day input
            }

        this.storage.set('dayArr',tempArr);
        this.dayChart = new Chart(this.dayCanvas.nativeElement, {
            type: "line",
            options:{

                legend:{
                    labels:{
                        fontColor: 'black'
                    },
                    fontColor: 'black'
                }

            },
            data: {
                labels: [ "Sunday","Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
                datasets: [
                    {
                        label: "Tiredness During the day (Averaged per day)",
                        fill: false,
                        lineTension: 0.1,
                        backgroundColor: "rgba(255, 71, 26,0.4)",
                        borderColor: "rgba(255, 71, 26,0.4)",
                        borderCapStyle: "butt",
                        borderDash: [],
                        borderDashOffset: 0.0,
                        borderJoinStyle: "miter",
                        pointBorderColor: "rgba(255, 71, 26,0.4)",
                        pointBackgroundColor: "#fff",
                        pointBorderWidth: 1,
                        pointHoverRadius: 5,
                        pointHoverBackgroundColor: "rgba(255, 71, 26,0.4)",
                        pointHoverBorderColor: "rgba(255, 71, 26,0.4)",
                        pointHoverBorderWidth: 2,
                        pointRadius: 1,
                        pointHitRadius: 10,
                        data: tempArr,
                        spanGaps: false
                    }
                ]
            }
        });
        });
    }
    onAddNight(input){
            //console.log(this.today +' '+ val);
            let got =  new Date(input);
            console.log(got.getDay());
            console.log(got.getHours()+got.getMinutes()/60);

        this.storage.get('nightArr').then((tempArr) => {
            tempArr[got.getDay()] = got.getHours()+got.getMinutes()/60;
            this.storage.set('nightArr',tempArr);

            this.nightChart = new Chart(this.nightCanvas.nativeElement, {
                type: "line",
                options:{

                    legend:{
                        labels:{
                            fontColor: 'black'
                        },
                        fontColor: 'black'
                    }

                },
                data: {
                    labels: [ "Sunday","Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
                    datasets: [
                        {
                            label: "Hours Slept This week",
                            fill: false,
                            lineTension: 0.1,
                            backgroundColor: "rgba(75,192,192,0.4)",
                            borderColor: "rgba(75,192,192,1)",
                            borderCapStyle: "butt",
                            borderDash: [],
                            borderDashOffset: 0.0,
                            borderJoinStyle: "miter",
                            pointBorderColor: "rgba(75,192,192,1)",
                            pointBackgroundColor: "#fff",
                            pointBorderWidth: 1,
                            pointHoverRadius: 5,
                            pointHoverBackgroundColor: "rgba(75,192,192,1)",
                            pointHoverBorderColor: "rgba(220,220,220,1)",
                            pointHoverBorderWidth: 2,
                            pointRadius: 1,
                            pointHitRadius: 10,
                            data: tempArr,
                            spanGaps: false
                        }
                    ]
                }
            });
        });

    }

	ngOnInit(){
        this.storage.get('nightArr').then((tempArr) => {
            this.nightChart = new Chart(this.nightCanvas.nativeElement, {
                type: "line",
                options:{

                    legend:{
                        labels:{
                            fontColor: 'black'
                        },
                        fontColor: 'black'
                    }

                },
                data: {
                    labels: [ "Sunday","Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
                    datasets: [
                        {
                            label: "Hours Slept This week",
                            fill: false,
                            lineTension: 0.1,
                            backgroundColor: "rgba(75,192,192,0.4)",
                            borderColor: "rgba(75,192,192,1)",
                            borderCapStyle: "butt",
                            borderDash: [],
                            borderDashOffset: 0.0,
                            borderJoinStyle: "miter",
                            pointBorderColor: "rgba(75,192,192,1)",
                            pointBackgroundColor: "#fff",
                            pointBorderWidth: 1,
                            pointHoverRadius: 5,
                            pointHoverBackgroundColor: "rgba(75,192,192,1)",
                            pointHoverBorderColor: "rgba(220,220,220,1)",
                            pointHoverBorderWidth: 2,
                            pointRadius: 1,
                            pointHitRadius: 10,
                            data: tempArr,
                            spanGaps: false
                        }
                    ]
                }
            });
        });
        this.storage.get('dayArr').then((tempArr) => {
        this.dayChart = new Chart(this.dayCanvas.nativeElement, {
            type: "line",
            options:{

                legend:{
                    labels:{
                        fontColor: 'black'
                    },
                    fontColor: 'black'
                }

            },
            data: {
                labels: [ "Sunday","Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
                datasets: [
                    {
                        label: "Tiredness During the day (Averaged per day)",
                        fill: false,
                        lineTension: 0.1,
                        backgroundColor: "rgba(255, 71, 26,0.4)",
                        borderColor: "rgba(255, 71, 26,0.4)",
                        borderCapStyle: "butt",
                        borderDash: [],
                        borderDashOffset: 0.0,
                        borderJoinStyle: "miter",
                        pointBorderColor: "rgba(255, 71, 26,0.4)",
                        pointBackgroundColor: "#fff",
                        pointBorderWidth: 1,
                        pointHoverRadius: 5,
                        pointHoverBackgroundColor: "rgba(255, 71, 26,0.4)",
                        pointHoverBorderColor: "rgba(255, 71, 26,0.4)",
                        pointHoverBorderWidth: 2,
                        pointRadius: 1,
                        pointHitRadius: 10,
                        data: tempArr,
                        spanGaps: false
                    }
                ]
            }
        });
    });
	}


	/* Ionic doesn't allow bindings to static variables, so this getter can be used instead. */
	get allSleepData() {
		return SleepService.AllSleepData;
	}

}
