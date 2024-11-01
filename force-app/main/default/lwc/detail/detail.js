import { LightningElement } from 'lwc';
import getWeather from '@salesforce/apex/CurrentWeatherConditionAPI.getCurrentWeather';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';

export default class Detail extends LightningElement {

    longitude;
    latitude;
    result;
    error;
    ready = false;

    connectedCallback(){
        this.getLocation();
    }

    MakeCallout(){
        console.log(this.longitude)
        getWeather({longitude:this.longitude,latitude:this.latitude})
        .then( data =>{
            console.log(JSON.stringify(data));
            console.log(data);
            this.result = (data);
            this.ready = true;
            if(data['errorMessage']){
                this.error = data['errorMessage'];
                this.showMessage('Server side error in loading data.', 'Error Message', 'error');
            }
        }).catch(error =>{
            this.error = error;
            this.showMessage('There is error in loading data.', 'Error Message', 'error');
        })
    }

    getLocation(){
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    this.latitude = position.coords.latitude;
                    this.longitude = position.coords.longitude;
                    console.log(this.longitude);
                    this.MakeCallout();
                },
                (error) => {
                    this.error = error.message;
                    this.showMessage(error.message, 'Error Message', 'error');
                }
            );
        } else {
            this.error = 'Geolocation is not supported by this browser.';
            this.showMessage('Geolocation is not supported by this browser.', 'Error Message', 'error');
        }
    }

    showMessage(message,title,varaint){
        this.dispatchEvent(new ShowToastEvent({
            title: title,
            message: message,
            variant: varaint, // other values: 'error', 'warning', 'info'
            mode: 'dismissable' // other values: 'pester', 'sticky'
        }));
    }

    get getLocationName(){
        return this.result.Name +' Weather'
    }

    get getHumidity(){
        return this.result.humidity
    }

    get getCondition(){
        return this.result.condition
    }

    get getTemprature(){
        return this.result.temp +''
    }

    get getWindDirection(){
        return this.result.windDir
    }

    get getFeelsLike(){
        return this.result.feelsLike
    }

    get getWindSpeed(){
        return this.result.windSpeed
    }

}