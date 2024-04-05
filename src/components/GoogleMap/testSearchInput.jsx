import React, { useEffect, useRef, useState } from "react";
import "./googleMapAPI.css";
let autoComplete;

const loadScript = (url, callback) => {
  let script = document.createElement("script");
  script.type = "text/javascript";

  if (script.readyState) {
    script.onreadystatechange = function () {
      if (script.readyState === "loaded" || script.readyState === "complete") {
        script.onreadystatechange = null;
        callback();
      }
    };
  } else {
    script.onload = () => callback();
  }

  script.src = url;
  document.getElementsByTagName("head")[0].appendChild(script);
};

const SearchLocationInput = ({ setSelectedLocationss }) => {
  const [query, setQuery] = useState("");
  const autoCompleteRef = useRef(null);
  const REACT_APP_GOOGLE_MAPS_KEY = process.env.REACT_APP_GOOGLE_MAPS_KEY;

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const handleScriptLoad = (updateQuery, autoCompleteRef) => {
    autoComplete = new window.google.maps.places.Autocomplete(
      autoCompleteRef.current,
      {
        // types: ["(cities)"],
        componentRestrictions: { country: "AE" },
      }
    );

    autoComplete.addListener("place_changed", () => {
      handlePlaceSelect(updateQuery);
    });
  };

  const handlePlaceSelect = async (updateQuery) => {
    const addressObject = await autoComplete.getPlace();
    console.log("Before formatting, address is ----- : ", addressObject);

    const query = addressObject.formatted_address;
    updateQuery(query);
    console.log({ query });

    const latLng = {
      lat: addressObject?.geometry?.location?.lat(),
      lng: addressObject?.geometry?.location?.lng(),
    };

    console.log({ latLng });
    setSelectedLocationss(latLng);
  };

  useEffect(() => {
    loadScript(
      `https://maps.googleapis.com/maps/api/js?key=${REACT_APP_GOOGLE_MAPS_KEY}&libraries=places`,
      () => handleScriptLoad(setQuery, autoCompleteRef)
    );
  }, [REACT_APP_GOOGLE_MAPS_KEY, handleScriptLoad]);

  return (
    <div className="search-location-input">
      <label>Type in your suburb or postcode</label>
      <input
        ref={autoCompleteRef}
        className="form-control-location mt-2 col-12"
        onChange={(event) => setQuery(event.target.value)}
        placeholder="Search Places ..."
        value={query}
      />
    </div>
  );
};

export default SearchLocationInput;
