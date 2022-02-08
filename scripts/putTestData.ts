import {client,q} from '../lib/db'
import {ScheduleData} from '..'
import putData from './putData'

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
  return putData(documents)
}
if(require.main === module) {
  putTestData()
}