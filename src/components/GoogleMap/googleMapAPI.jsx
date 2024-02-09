/* eslint-disable no-undef */
import React, { useEffect } from "react";

const GoogleMapAPI = () => {
  useEffect(() => {
    const script = document.createElement("script");
    script.src = `https://maps.googleapis.com/maps/api/js?key=YOUR_API_KEY&libraries=places&v=weekly&callback=initMap`;
    script.defer = true;
    script.async = true;

    document.head.appendChild(script);

    return () => {
      document.head.removeChild(script);
    };
  }, []);

  function initMap() {
    const map = new google.maps.Map(document.getElementById("map"), {
      center: { lat: 40.749933, lng: -73.98633 },
      zoom: 13,
      mapTypeControl: false,
    });
    const card = document.getElementById("pac-card");
    const input = document.getElementById("pac-input");
    const biasInputElement = document.getElementById("use-location-bias");
    const strictBoundsInputElement =
      document.getElementById("use-strict-bounds");
    const options = {
      fields: ["formatted_address", "geometry", "name"],
      strictBounds: false,
    };

    map.controls[google.maps.ControlPosition.TOP_LEFT].push(card);

    const autocomplete = new google.maps.places.Autocomplete(input, options);

    autocomplete.bindTo("bounds", map);

    const infowindow = new google.maps.InfoWindow();
    const infowindowContent = document.getElementById("infowindow-content");

    infowindow.setContent(infowindowContent);

    const marker = new google.maps.Marker({
      map,
      anchorPoint: new google.maps.Point(0, -29),
    });

    autocomplete.addListener("place_changed", () => {
      infowindow.close();
      marker.setVisible(false);

      const place = autocomplete.getPlace();

      if (!place.geometry || !place.geometry.location) {
        // User entered the name of a Place that was not suggested and
        // pressed the Enter key, or the Place Details request failed.
        window.alert("No details available for input: '" + place.name + "'");
        return;
      }

      // If the place has a geometry, then present it on a map.
      if (place.geometry.viewport) {
        map.fitBounds(place.geometry.viewport);
      } else {
        map.setCenter(place.geometry.location);
        map.setZoom(17);
      }

      marker.setPosition(place.geometry.location);
      marker.setVisible(true);
      infowindowContent.children["place-name"].textContent = place.name;
      infowindowContent.children["place-address"].textContent =
        place.formatted_address;
      infowindow.open(map, marker);
    });

    function setupClickListener(id, types) {
      const radioButton = document.getElementById(id);

      radioButton.addEventListener("click", () => {
        autocomplete.setTypes(types);
        input.value = "";
      });
    }

    setupClickListener("changetype-all", []);
    setupClickListener("changetype-address", ["address"]);
    setupClickListener("changetype-establishment", ["establishment"]);
    setupClickListener("changetype-geocode", ["geocode"]);
    setupClickListener("changetype-cities", ["(cities)"]);
    setupClickListener("changetype-regions", ["(regions)"]);
    biasInputElement.addEventListener("change", () => {
      if (biasInputElement.checked) {
        autocomplete.bindTo("bounds", map);
      } else {
        autocomplete.unbind("bounds");
        autocomplete.setBounds({
          east: 180,
          west: -180,
          north: 90,
          south: -90,
        });
        strictBoundsInputElement.checked = biasInputElement.checked;
      }

      input.value = "";
    });
    strictBoundsInputElement.addEventListener("change", () => {
      autocomplete.setOptions({
        strictBounds: strictBoundsInputElement.checked,
      });
      if (strictBoundsInputElement.checked) {
        biasInputElement.checked = strictBoundsInputElement.checked;
        autocomplete.bindTo("bounds", map);
      }

      input.value = "";
    });
  }

  window.initMap = initMap;

  return (
    <div>
      <body>
        <div class="pac-card" id="pac-card">
          <div>
            <div id="title">Autocomplete search</div>
            <div id="type-selector" class="pac-controls">
              <input
                type="radio"
                name="type"
                id="changetype-all"
                checked="checked"
              />
              <label for="changetype-all">All</label>

              <input type="radio" name="type" id="changetype-establishment" />
              <label for="changetype-establishment">establishment</label>

              <input type="radio" name="type" id="changetype-address" />
              <label for="changetype-address">address</label>

              <input type="radio" name="type" id="changetype-geocode" />
              <label for="changetype-geocode">geocode</label>

              <input type="radio" name="type" id="changetype-cities" />
              <label for="changetype-cities">(cities)</label>

              <input type="radio" name="type" id="changetype-regions" />
              <label for="changetype-regions">(regions)</label>
            </div>
            <br />
            <div id="strict-bounds-selector" class="pac-controls">
              <input type="checkbox" id="use-location-bias" value="" checked />
              <label for="use-location-bias">Bias to map viewport</label>

              <input type="checkbox" id="use-strict-bounds" value="" />
              <label for="use-strict-bounds">Strict bounds</label>
            </div>
          </div>
          <div id="pac-container">
            <input id="pac-input" type="text" placeholder="Enter a location" />
          </div>
        </div>
        <div id="map"></div>
        <div id="infowindow-content">
          <span id="place-name" class="title"></span>
          <br />
          <span id="place-address"></span>
        </div>

        <script
          src="https://maps.googleapis.com/maps/api/js?key=INSERT_YOUR_API_KEY&callback=initMap&libraries=places&v=weekly&solution_channel=GMP_CCS_autocomplete_v1"
          defer
        ></script>
      </body>
    </div>
  );
};

export default GoogleMapAPI;
