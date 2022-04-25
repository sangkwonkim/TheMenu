/* global kakao */
import React, { useEffect } from "react";

const { kakao } = window;

const Map = () => {
  useEffect(() => {
    let container = document.getElementById("map");
    
    let options = {
      center: new kakao.maps.LatLng(35.85133, 126.570667),
      level: 5,
    };

    // 장소 검색 객체를 생성합니다
  var ps = new kakao.maps.services.Places(); 

  var infowindow = new kakao.maps.InfoWindow({zIndex:1});


function displayKeywordPlace(place) {
    
  // 마커를 생성하고 지도에 표시합니다
  var marker = new kakao.maps.Marker({
      map: map,
      position: new kakao.maps.LatLng(place.y, place.x) 
  });

  // 마커에 클릭이벤트를 등록합니다
  kakao.maps.event.addListener(marker, 'click', function() {
      // 마커를 클릭하면 장소명이 인포윈도우에 표출됩니다
      infowindow.setContent('<div style="padding:5px;font-size:12px;">' + place.place_name + '</div>');
      infowindow.open(map, marker);
  });
}
    
    let map = new kakao.maps.Map(container, options);

    function displayMarker(locPosition, message) {

      // 마커를 생성합니다
      var marker = new kakao.maps.Marker({  
          map: map, 
          position: locPosition
      }); 
      
      var iwContent = message, // 인포윈도우에 표시할 내용
          iwRemoveable = true;
  
      // 인포윈도우를 생성합니다
      var infowindow = new kakao.maps.InfoWindow({
          content : iwContent,
          removable : iwRemoveable
      });
      
      // 인포윈도우를 마커위에 표시합니다 
      infowindow.open(map, marker);
      
      // 지도 중심좌표를 접속위치로 변경합니다
      map.setCenter(locPosition);      
  }    

    navigator.geolocation.getCurrentPosition(function(position) {
        
      var lat = position.coords.latitude,
          lon = position.coords.longitude;
      
      var locPosition = new kakao.maps.LatLng(lat, lon), 
          message = '<div style="padding:5px;">내 위치</div>';

      ps.keywordSearch('김치찌개', placesSearchCB, {location: new kakao.maps.LatLng(lat,lon)}); 

      function placesSearchCB (data) {

        var bounds = new kakao.maps.LatLngBounds();

        for (var i=0; i<data.length; i++) {
            displayKeywordPlace(data[i]);    
            bounds.extend(new kakao.maps.LatLng(data[i].y, data[i].x));
        }       
}
      
      displayMarker(locPosition, message);
    });
    
  }, []);

  return (
    <div>
      <div id="map" style={{width:'600px', height:'600px'}}>
      </div>
    </div>
  );
};

export default Map;