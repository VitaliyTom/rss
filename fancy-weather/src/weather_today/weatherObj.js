function Weather(
	country,
	name,
	temp_c,
	temp_f,
	feelslike_c,
	feelslike_f,
	humidity,
	wind_kph,
	wind_mph,
	localtime,
	condition,
	nextThreeDay
) {
	this.country = country;
	this.name = name;
	this.temp_c = temp_c;
	this.temp_f = temp_f;
	this.feelslike_c = feelslike_c;
	this.feelslike_f = feelslike_f;
	this.humidity = humidity;
	this.wind_kph = wind_kph;
	this.wind_mph = wind_mph;
	this.localtime = localtime;
	this.condition = condition;
	this.nextThreeDay = nextThreeDay;
}

export default Weather;
