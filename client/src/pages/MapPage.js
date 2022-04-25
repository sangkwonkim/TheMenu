/* global kakao */
import React, { useEffect } from "react";
import { useLocation } from 'react-router-dom';

const { kakao } = window;

export default function MapPage () {
  const { state } = useLocation();
  
  useEffect(() => {
    console.log(state)
    const container = document.getElementById("map");
    const options = {
      center: new kakao.maps.LatLng(35.85133, 126.570667),
      level: 5,
    };
    const map = new kakao.maps.Map(container, options);

    const ps = new kakao.maps.services.Places(); 
    
    function displayKeywordMarker(place) {
      const infowindow = new kakao.maps.InfoWindow({zIndex:1});
      const marker = new kakao.maps.Marker({
          map: map,
          position: new kakao.maps.LatLng(place.y, place.x) 
      });
      kakao.maps.event.addListener(marker, 'click', function() {
        infowindow.setContent('<div style="padding:5px;font-size:12px;">' + place.place_name + '</div>');
        infowindow.open(map, marker);
      });
    }
    
    function displayMarker(locPosition, message) {
      const marker = new kakao.maps.Marker({  
          map: map, 
          position: locPosition
      }); 
      const iwContent = message, // 인포윈도우에 표시할 내용
          iwRemoveable = true;
  
      // 인포윈도우를 생성합니다
      const infowindow = new kakao.maps.InfoWindow({
          content : iwContent,
          removable : iwRemoveable
      });
      
      infowindow.open(map, marker);
      map.setCenter(locPosition);      
    }    

    navigator.geolocation.getCurrentPosition(function(position) {
      const lat = position.coords.latitude,
        lon = position.coords.longitude;
      
      const locPosition = new kakao.maps.LatLng(lat, lon), 
        message = '<div style="padding:5px;">Your Location</div>';

      ps.keywordSearch(`${state}`, placesSearchCB, {location: new kakao.maps.LatLng(lat,lon)}); 

      function placesSearchCB (data) {
        const bounds = new kakao.maps.LatLngBounds();

        for (let i=0; i<data.length; i++) {
            displayKeywordMarker(data[i]);    
            bounds.extend(new kakao.maps.LatLng(data[i].y, data[i].x));
        }       
      }
      
      displayMarker(locPosition, message);
    });
    
  }, [state]);

  return (
    <div>
      <div id="map" style={{width:'600px', height:'600px'}}>
      </div>
    </div>
  );
};
