import React, { Suspense } from 'react'
import EventDetails from './EventDetails'

const EventDetailsPage = () => {
  return (
    <Suspense fallback={<div>Event name not specified</div>}>
      <EventDetails></EventDetails>
    </Suspense>
  )
}

export default EventDetailsPage
