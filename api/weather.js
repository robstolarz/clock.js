var Forecast = require('forecast.io');

function Weather(){}

Weather.prototype.properties = {
  apikey:'your key here (ask rob)'
  , lat: 41.751921
  , long: -72.8670558
}

Weather.prototype.tick = {};
Weather.prototype.tick["update weather cache"] = {
  function:function(api){
    var me = this;
    console.log("Updating weather cache...");
    new Forecast({APIKey:this.properties.apikey})
      .get(this.properties.lat,this.properties.long,function(err,res,data){
        if (err) return console.error(err);
        console.log("Got the weather.");
        console.log(JSON.stringify(data.currently));
        this.weather = {
          israining:data.currently.icon=="rain" //check if forecast.io thinks we should display a rain icon
        };
        me['get weather'](api,this.weather); //refresh everyone
      }
    );
  },ms:15 * 1000*60 //every (15 minutes to ms)
  , onStart:true
};

Weather.prototype.weather = null;

Weather.prototype['get weather'] = function(api,gets){
  api.socket.emit('weather',this.weather||undefined);
}

module.exports = Weather;