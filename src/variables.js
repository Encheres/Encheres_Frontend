import { Country}  from 'country-state-city';
let countries = Country.getAllCountries();
let newCountryList = []
for(var i=0;i<countries.length;i++){
    var obj = {label:countries[i].name, value:countries[i].name, country_code:countries[i].isoCode}
    newCountryList.push(obj);
}
export const countryList =  newCountryList;




// SELECT Styles
export const customSelectStyles = {
    control: styles => ({ ...styles, backgroundColor: '#000'}),
    option: (styles, { data, isDisabled, isFocused, isSelected }) => {
        return {
            ...styles,
            backgroundColor: isDisabled ? '#000' : isSelected ? '#0ff' : '#03091F',
            color: isDisabled ? '#000' : isSelected ? '#fff' : '#6c757d',
        };
    },
};