import { Country}  from 'country-state-city';
let countries = Country.getAllCountries();
let newCountryList = []
for(var i=0;i<countries.length;i++){
    var obj = {label:countries[i].name, value:countries[i].name, country_code:countries[i].isoCode}
    newCountryList.push(obj);
}
export const countryList =  newCountryList;

// Categories
let nftCategories = []
nftCategories.push("Art");
nftCategories.push("Music");
nftCategories.push("Domain Names");
nftCategories.push("Virtual Worlds");
nftCategories.push("Trading Cards");
nftCategories.push("Collectibles");
nftCategories.push("Sports");
nftCategories.push("Documents");
nftCategories.push("Utility");
export const nftCategoryList = nftCategories;


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