import {client,q} from '../lib/db'
import {ScheduleData} from '..'

function getEnd(start:Date):Date{
  const date=new Date(start)
  date.setHours(start.getHours()+1)
  return new Date(date)
}
function getDuration(day:Date,period:number){
  const date=new Date(day)
  date.setDate(day.getDate()+period)
  return {
    start:(new Date(date)).getTime(),
    end:getEnd(date).getTime(),
  }
}

const today=new Date()
const documents:Array<ScheduleData>=((a,b)=>a.map((_,i)=>{
  return {
    title:a[i],
    start:b[i].start,
    end:b[i].end,
  }
}))(
  [
    'yesterday',
    'today',
    'tomorrow'
  ],
  [
    getDuration(today,-1),
    getDuration(today,0),
    getDuration(today,1),
  ]  
)

export default function putTestData(){
  return client.query(
    q.Map(
      documents,
      q.Lambda(
        'date',
        q.Create(
          q.Collection('schedules'),
          { data: q.Var('date')  },
        )
      ),
    )
  )
  .then(()=>console.log('test data created'))
  .catch((err) => console.error('Error: %s', err))
}
if(require.main === module) {
  putTestData()
}