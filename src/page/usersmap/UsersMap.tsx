import React, { useEffect, useState } from 'react'
import { useLoading } from '../../hooks/useLoading'
import { UserDetails, userService } from '../../service/userService';
import { mapPopupContent } from '../user/UserDetailsView';
import { Map, MapMarkerValues } from '../../map/Map'

export function usersToMapMarkerValue(users: Array<UserDetails>): Array<MapMarkerValues> {
  const markerValues = users.map(it => {
    return {
      coordinateX: Number(it.coordinates.split(',')[0]),
      coordinateY: Number(it.coordinates.split(',')[1]),
      popupMarkerContent: mapPopupContent(it)
    }
  })

  return markerValues
}

export function UsersMap() {
  const users = useLoading(() =>
    userService.getAll()
  )[0] || [];

  const [markers, setMarkers] = useState<Array<MapMarkerValues>>([{
    coordinateX: 0,
    coordinateY: 0,
    popupMarkerContent: ''
  }])

  useEffect(() => {
    setMarkers(usersToMapMarkerValue(users))
  }, [users])

  console.log(markers)

  return (
    <Map
      coordinates={ markers.length !== 0 ? markers :  [{
        coordinateX: 0,
        coordinateY: 0,
        popupMarkerContent: ''
      }]}
      maxZoom={20}
      zoom={6}
    />
  )
}