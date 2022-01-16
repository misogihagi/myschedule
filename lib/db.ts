import {ScheduleData} from '..'

import * as faunadb from 'faunadb'
export const q=faunadb.query

const localSetting={
  secret: 'secret',
  domain: 'localhost',
  scheme: 'http',
  port:8443
}
const cloudSetting={
  secret: process.env.FAUNA_SECRET_KEY as string,
  domain: "db.us.fauna.com"
}

export const client = new faunadb.Client(
  process.env.IS_LOCAL_TEST ?localSetting :cloudSetting
)

export async function getScheduleData():Promise<Array<ScheduleData>>{
  const scheduleRefs=await client.query<{data:string}>(
      q.Paginate(q.Documents(q.Collection('schedules')))
  )

  return await client.query<Array<{data:ScheduleData}>>(
      q.Map(scheduleRefs.data, q.Lambda('ret', q.Get(q.Var('ret'))))
  )
  .then(res=>res.map(r=>r.data))
}

export function createScheduleData(data:ScheduleData){
    return client.query(
        q.Create(
            q.Collection('schedules'),
           { data },
        )
    )
}


const db={
    client,
    q,
    getScheduleData,
    createScheduleData,
}

export default db