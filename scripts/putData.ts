import {client,q} from '../lib/db'
import {ScheduleData} from '..'

export default function putData(data:Array<ScheduleData> | ScheduleData){

  // e.g.
  // zx putdata 2019-01-01T00:00:00.000Z

  return  client.query(
    Array.isArray(data) ?
    q.Map(
    data,
      q.Lambda(
        'date',
        q.Create(
          q.Collection('schedules'),
          { data: q.Var('date')  },
        )
      ),
    ) :
      q.Create(
        q.Collection('schedules'),
        { data }
      )
  )
  .then(()=>console.log('test data created'))
  .catch((err) => console.error('Error: %s', err))
}
if(require.main === module) {
  const date = new Date(process.argv[2])
  const start=date.getTime()
  date.setHours(date.getHours()+10)
  const end=date.getTime()

  putData({
    title:'duty',
    start,
    end
  })

}