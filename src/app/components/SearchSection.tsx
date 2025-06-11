import React from "react";
import { Input } from "../components/ui/input";
import { Button } from "./ui/button";
import { SearchIcon } from "lucide-react";
import GooglePlacesAutocomplete from 'react-google-places-autocomplete';

function SearchSection() {
    const [value, setValue] = React.useState(null);

    const getLatLng = (place) => {
        const placeId = place.value.place_id;
        const service = new google.maps.places.PlacesService(document.createElement('div'));
        service.getDetails({ placeId }, (details, status) => {
            if (status === google.maps.places.PlacesServiceStatus.OK) {
                const lat = details.geometry.location.lat();
                const lng = details.geometry.location.lng();
                console.log("Latitude:", lat, "Longitude:", lng);
            }
            else {
                console.error("Error fetching place details:", status);
            }
        });
    }
    
    return (
        <div className="pd-2 md:pd-6 border-2px rounded-xl flex flex-row items-center space-between">
            {/*<Input placeholder="Vai para onde?" className="mr-1 border-teal-100 bg-white/80 dark:bg-gray-800/80"/>
            <Button variant="default" className="bg-teal-500" type="submit">
                <SearchIcon className="mr-2 h-4 w-4" />
            </Button>*/}
            <GooglePlacesAutocomplete
                apiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}
                selectProps={{
                    value,
                    onChange: (place) => { getLatLng(place); setValue(place)},
                    className: "mr-1 border-teal-100 bg-white/80 dark:bg-gray-800/80 w-full",
                    isClearable: true,
                    placeholder: "Vai para onde?",
                    components: {
                        DropdownIndicator: false,
                    },
                    styles: {
                        control: (provided) => ({
                            ...provided,
                            backgroundColor: 'transparent',
                            color: 'inherit',
                        }),
                        input: (provided) => ({
                            ...provided,
                            color: 'inherit',
                        }),
                        menu: (provided) => ({
                            ...provided,
                            color: 'inherit',
                            backgroundColor: 'transparent',
                        }),
                        option: (provided, state) => ({
                            ...provided,
                            backgroundColor: state.isFocused ? '#008080' : 'transparent',
                            color: 'inherit',
                        }),
                        singleValue: (provided) => ({
                            ...provided,
                            color: 'inherit',
                        }),
                    }
                }}
                autocompletionRequest={{
                    componentRestrictions: { country: ['br'] },
                    bounds: [{lat: -22.9292, lng: -42.5099}]
                }}
            />
        </div>
    )
}

export default SearchSection;