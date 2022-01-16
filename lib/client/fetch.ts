import {ScheduleData,Schedule} from '../..'

const origin= process.browser ? window.location.origin : 'http://localhost:3000'

export function getScheduleData():Promise<Array<Schedule>>{
    return fetch(origin+'/api/getScheduleData').then(res=>{
        if(res.status!==200)return new Promise(r=>r([]))
        return res.json()
    })
    .then(res=>{
        return res.map((data: ScheduleData)=>{
            return {
                title:data.title,
                start:new Date(data.start),
                end:new Date(data.end),
            }
        })
    })
}
export function createScheduleData(data:Schedule){
    return fetch(origin+'/api/createScheduleData',{
        method: 'POST',
        body: JSON.stringify(data)
    }).then(res=>res.json())
    .then(res=>{
        if(res.status!==200)return new Promise(r=>r([]))
        return res.json()
    })
}
