// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { createScheduleData } from '../../lib/db'
import {CreateResponse,ErrorMessage} from '../..'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<CreateResponse|ErrorMessage>
) {
  try{
    console.log(req.body)
    const ret=JSON.parse(req.body)
    await createScheduleData({
      title:'meeting',
      start:(new Date(ret.start)).getTime(),
      end:(new Date(ret.end)).getTime(),
    })
    res.status(200).json({
      ok:true
    })
  } catch(e){
    res.status(400).json({ok:false, message:e} as ErrorMessage)
  }
}
