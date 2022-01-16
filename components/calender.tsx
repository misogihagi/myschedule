import {useRef,useEffect} from 'react'
import FullCalendar from '@fullcalendar/react'
import interactionPlugin from '@fullcalendar/interaction';
import dayGridPlugin from '@fullcalendar/daygrid' // a plugin
import timeGridPlugin from '@fullcalendar/timegrid';

import {Schedule} from '..'

import {message} from '../lib/client/utils'
import {getScheduleData,createScheduleData} from '../lib/client/fetch'


const Calendar = () => {
  const calendarRef=useRef<FullCalendar>(null)
  function refresh(){
    if(!calendarRef.current)return ;
    const api=calendarRef.current.getApi()
    api.removeAllEvents()
    getScheduleData().then(schedules=>{
      schedules.forEach(schedule => {
        api.addEvent(schedule)
      });
    })
  }
  useEffect(() => {
    refresh()
  }, []);
  return (
    <FullCalendar
      ref={calendarRef}
      plugins={[ interactionPlugin,dayGridPlugin,timeGridPlugin ]}
      initialView="timeGridWeek"
      selectable={true}
      select={async function(info) {
        const title=window.prompt(message(info.start,info.end))
        if(!title)return ;
        await createScheduleData({
          title:title as string,
          start:info.start,
          end:info.end,
        })
        refresh()
      }}
      
    />
  )
}

export default Calendar
