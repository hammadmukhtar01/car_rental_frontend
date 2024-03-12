import React, { useState, useEffect, useRef } from "react";
import { Input, List } from "antd";
import useGoogle from "react-google-autocomplete/lib/usePlacesAutocompleteService";
import { FaMapMarkerAlt } from "react-icons/fa";

const SearchLocationInput = ({ setSelectedLocationss }) => {
  const { placePredictions, getPlacePredictions, isPlacePredictionsLoading } =
    useGoogle({
      apiKey: "AIzaSyAePasC96mT2mWIMAGi0aPUIAL5hKRnhOg",
    });
  const [value, setValue] = useState("");
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState(null);
  const inputRef = useRef(null);

  useEffect(() => {
    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  const handleClickOutside = (event) => {
    if (inputRef.current && !inputRef.current.contains(event.target)) {
      setShowSuggestions(false);
    }
  };

  const handleSelectLocation = (description, placeId) => {
    setValue(description);
    setShowSuggestions(false);
    setSelectedLocation(description);
    fetchLocationDetails(placeId);
  };

  const fetchLocationDetails = (placeId) => {
    const service = new window.google.maps.places.PlacesService(
      document.createElement("div")
    );
    service.getDetails({ placeId }, (place, status) => {
      if (
        status === window.google.maps.places.PlacesServiceStatus.OK &&
        place
      ) {
        setSelectedLocationss({
          lat: place.geometry.location.lat(),
          lng: place.geometry.location.lng(),
        });
      }
    });
  };

  const handleInputChange = (evt) => {
    getPlacePredictions({
      input: evt.target.value,
      componentRestrictions: { country: "AE" },
    });
    setValue(evt.target.value);
    setShowSuggestions(true);
  };

  const handleFocus = (e) => {
    setShowSuggestions(true);
    const inputGroup = e.target.closest(".inputgroup");
    if (inputGroup) {
      inputGroup.classList.add("input-filled");
    }
  };

  const handleBlur = (e) => {
    const inputGroup = e.target.closest(".inputgroup");
    if (inputGroup) {
      if (e.target.value === "") {
        inputGroup.classList.remove("input-filled");
      }
    }
    setTimeout(() => {
      setShowSuggestions(false);
    }, 200);
  };

  return (
    <div>
      <div className="inputgroup" ref={inputRef}>
        <Input
          value={value}
          // onChange={(evt) => {
          //   getPlacePredictions({
          //     input: evt.target.value,
          //     componentRestrictions: { country: "AE" },
          //   });
          //   setValue(evt.target.value);
          //   setShowSuggestions(true);
          // }}
          loading={isPlacePredictionsLoading ? "true" : "false"}
          type="text"
          autoComplete="off"
          className="form-control"
          id="locationName"
          name="locationName"
          required
          // value={inputValue}
          onChange={handleInputChange}
          onFocus={handleFocus}
          onBlur={handleBlur}
        />
        <label htmlFor="locationName">Location</label>
      </div>
      <div
        style={{
          display: showSuggestions ? "flex" : "none",
          flexDirection: "column",
        }}
      >
        {!isPlacePredictionsLoading && (
          <List
            dataSource={placePredictions}
            className="list-group suggested-locations-div"
            renderItem={(item) => (
              <List.Item
                className="pl-3 list-group-item single-suggested-location d-flex align-items-center "
                onClick={() =>
                  handleSelectLocation(item.description, item.place_id)
                }
                style={{
                  backgroundColor:
                    selectedLocation === item.description ? "#ff0000" : "",
                  color: selectedLocation === item.description ? "#fff" : "",
                  cursor: "pointer",
                }}
              >
                <FaMapMarkerAlt
                  className="single-suggested-location-marker mr-2"
                  style={{ color: "#cc6119" }}
                />
                <List.Item.Meta title={item.description} />
              </List.Item>
            )}
          />
        )}
      </div>
    </div>
  );
};

export default SearchLocationInput;