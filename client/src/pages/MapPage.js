import React, { useEffect } from "react";
import { useLocation } from 'react-router-dom';

const { kakao } = window;

export default function MapPage () {
  const { state } = useLocation();
  
  useEffect(() => {
    const container = document.getElementById("map");
    const options = {
      center: new kakao.maps.LatLng(33.450701, 126.570667),
      level: 5,
    };
    const map = new kakao.maps.Map(container, options);

    const ps = new kakao.maps.services.Places(); 
    
    function displayKeywordMarker(place) {
      const infowindow = new kakao.maps.InfoWindow({ removable : true });
      const marker = new kakao.maps.Marker({
          map: map,
          position: new kakao.maps.LatLng(place.y, place.x) 
      });
      kakao.maps.event.addListener(marker, 'click', function() {
        infowindow.setContent(`<div style="padding:5px;font-size:12px;" ><a href=https://search.naver.com/search.naver?where=nexearch&sm=top_hty&fbm=1&ie=utf8&query=${place.road_address_name.split(' ')[1]}+${place.place_name}>${place.place_name}</a></div>`);
        infowindow.open(map, marker);
        setTimeout(() => {
          infowindow.close();
        }, 3000)
      });
    }
    
    
    function displayMarker(locPosition, message) {
      const imageSrc = "https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/markerStar.png"; 
      const imageSize = new kakao.maps.Size(24, 35); 
      
      const markerImage = new kakao.maps.MarkerImage(imageSrc, imageSize);

      const marker = new kakao.maps.Marker({  
          map: map, 
          position: locPosition,
          image: markerImage
      }); 
      const iwContent = message,
          iwRemoveable = true;
  
      const infowindow = new kakao.maps.InfoWindow({
          content : iwContent,
          removable : iwRemoveable
      });
      
      infowindow.open(map, marker);
      setTimeout(() => {
        infowindow.close();
      }, 3000)
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
