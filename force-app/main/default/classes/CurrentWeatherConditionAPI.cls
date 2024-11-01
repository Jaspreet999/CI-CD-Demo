Global without sharing class CurrentWeatherConditionAPI {
    @AuraEnabled (cacheable=true)
    public static Response getCurrentWeather(String longitude, String latitude){
		
        HttpRequest request = new HttpRequest();
        String endpoint = Label.WeatherApi+'/current.json?'+'key='+Label.APIKEY+'&q='+latitude+','+longitude;
        request.setEndpoint(endpoint);
        request.setMethod('GET');
        Http http = new Http();
		Response response = new Response();	
        system.debug('request --'+request);
        try{
            HttpResponse httpResponse = http.send(request);
            system.debug('httpResponse --'+httpResponse.getStatusCode());
            if(httpResponse.getStatusCode() == 200){
                JsonParser parser = json.createparser(httpResponse.getBody());
                system.debug('parser --'+parser);
                while (parser.nextToken() != null) {
                    if(parser.getCurrentToken() == JSONToken.FIELD_NAME) {
                        parser.nextValue();
                        //system.debug(parser.getCurrentName());
                        if(parser.getCurrentName() == 'Name'){
                            response.Name = (parser.getText());
                        }else if (parser.getCurrentName() == 'temp_c') {
                            response.temp = (parser.getText());
                        } else if (parser.getCurrentName() == 'feelslike_c') {
                            response.feelsLike = parser.getText();
                        } else if (parser.getCurrentName() == 'text') {
                            response.condition = parser.getText();
                        } else if (parser.getCurrentName() == 'wind_dir') {
                            response.windDir = parser.getText();
                        } else if (parser.getCurrentName() == 'wind_kph') {
                            response.windSpeed = parser.getText();
                        } else if (parser.getCurrentName() == 'humidity') {
                            response.humidity = parser.getText();
                        }
                    }
                } 
            }else{
                response.errorMessage = 'Server Side Error';
            }
            
        }catch(Exception e){
			response.errorMessage = 'Server Side Error';
        }
        
        system.debug('response--'+response);
        return response;
        
    }
    
    GLobal class Response{
        @AuraEnabled public String Name;
        @AuraEnabled public String temp;
        @AuraEnabled public String feelsLike;
        @AuraEnabled public String condition;
        @AuraEnabled public String windDir;
        @AuraEnabled public string windSpeed;
        @AuraEnabled public string humidity;
        @AuraEnabled public string errorMessage;
        
    }

}