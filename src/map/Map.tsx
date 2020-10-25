import React from 'react'
import { Map as LeafletMap, TileLayer, Marker, Popup } from 'react-leaflet';

interface Props {
  coordinateX: number;
  coordinateY: number;
  zoom: number;
  maxZoom: number;
  popupContent: string;
}

export function Map(props: Props) {

  return (
    <LeafletMap
      center={[props.coordinateX, props.coordinateY]}
      zoom={props.zoom}
      maxZoom={props.maxZoom}
      attributionControl={true}
      zoomControl={true}
      doubleClickZoom={true}
      scrollWheelZoom={true}
      dragging={true}
      animate={true}
      easeLinearity={0.35}
    >
      <TileLayer
        url='http://{s}.tile.osm.org/{z}/{x}/{y}.png'
      />
      <Marker position={[props.coordinateX, props.coordinateY]}>
        <Popup>
          {props.popupContent}
        </Popup>
      </Marker>
    </LeafletMap>
  )
}