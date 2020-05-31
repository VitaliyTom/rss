function RegionObj(ISOCountry, city, city_district, continent, country, country_code, postcode, residential, suburb) {

    this.ISOCountry = ISOCountry;
	this.city = city;
	this.city_district = city_district;
	this.continent = continent;
	this.country = country;
	this.country_code = country_code;
	this.postcode = postcode;
    this.residential = residential;
    this.suburb = suburb;

}

export default RegionObj;

// ISO_3166-1_alpha-3  //: "BLR"
// city      //: "Минск"
// city_district   //: "Центральный район"
// continent   //: "Europe"
// country     //: "Беларусь"
// country_code    //: "by"
// postcode    //: "220020"
// residential //: "Зацень"
// // road: "1-й Гольшанский переулок"
// suburb  //: "Зацень" 