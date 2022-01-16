// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { getScheduleData } from '../../lib/db'
import {ScheduleData,ErrorMessage} from '../..'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ScheduleData[]|ErrorMessage>
) {
  try{
    const data=await getScheduleData()
    res.status(200).json(data)
  } catch(e){
    res.status(400).json({ok:false, message:e} as ErrorMessage)
  }
}
