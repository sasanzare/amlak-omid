
import { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import { LeafletMouseEvent } from 'leaflet';
import "leaflet/dist/leaflet.css";



const MapContainer = dynamic(() => import('react-leaflet').then((mod) => mod.MapContainer), {
  ssr: false,
});

const TileLayer = dynamic(() => import('react-leaflet').then((mod) => mod.TileLayer), {
  ssr: false,
});

const Marker = dynamic(() => import('react-leaflet').then((mod) => mod.Marker), {
  ssr: false,
});
const Popup = dynamic(() => import('react-leaflet').then((mod) => mod.Popup), {
  ssr: false,
});







 function Map({ getCoordinate }) {
  const [markerPosition, setMarkerPosition] = useState({
    lat: 29.5926,
    lng: 52.5836,
  });

 
  const handleMarkerMove = (e: LeafletMouseEvent) => {
    setMarkerPosition({
      lat: e.target._latlng.lat,
      lng: e.target._latlng.lng,
    });
    
    getCoordinate(markerPosition)

  };


  return (
    <>
    {typeof window !== 'undefined' && (
      <MapContainer
        center={[markerPosition.lat, markerPosition.lng]}
        zoom={12}
        style={{ height: "400px" }}
        className="shadow-es rounded-4"
        
      >
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        <Marker
          position={[markerPosition.lat, markerPosition.lng]}
          draggable={true}
          eventHandlers={{ dragend: handleMarkerMove }}
        >
          <Popup>
      محل مدنظر را لطفا انتخاب کنید!
    </Popup>
        </Marker>
      </MapContainer>
     )}

    </>
  );
}


Map.getInitialProps = () => ({});

export default  Map;