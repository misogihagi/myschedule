process.env.IS_LOCAL_TEST='true'

import initDB  from './initDataBase'
import putTestData from './putTestData'
import { spawn } from 'child_process'

export default async function localTest(){
    //if needed
    //docker pull fauna/faunadb:latest
    //docker run --rm --name faunadb -p 8443:8443 -p 8084:8084 fauna/faunadb
    await initDB()
    await putTestData()
    console.log('web server start')
    const webProcess = spawn('npm', ['run', 'dev']);
}
localTest()
