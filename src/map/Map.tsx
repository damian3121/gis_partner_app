import React from 'react'
import { Map as LeafletMap, TileLayer, Marker, Popup } from 'react-leaflet';

export interface MapMarkerValues extends Coordinates {
  popupMarkerContent: string;
}

interface Coordinates {
  coordinateX: number;
  coordinateY: number;
}

interface Props {
  coordinates: Array<MapMarkerValues>
  zoom: number;
  maxZoom: number;
}

export function Map(props: Props) {
  return (
    <LeafletMap
      center={[props.coordinates[0].coordinateX, props.coordinates[0].coordinateY]}
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
      {
        props.coordinates.map(it =>
          <Marker position={[it.coordinateX, it.coordinateY]}>
            <Popup>
              {it.popupMarkerContent}
            </Popup>
          </Marker>
        )
      }
    </LeafletMap>
  )
}