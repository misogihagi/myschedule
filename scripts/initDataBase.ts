import {client, q} from '../lib/db'

export default async function initDataBase(){
  await client.query(
    q.CreateDatabase({ name: 'my-schedule-db' })
  )
  
  await client.query(
    q.CreateCollection({ name: 'schedules' })
  )
  console.log('db initialised')
}
if(require.main === module) {
  initDataBase()
}