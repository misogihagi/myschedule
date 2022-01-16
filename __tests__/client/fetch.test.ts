import {getScheduleData,createScheduleData} from '../../lib/client/fetch'

const date=new Date('2000-01-01T12:00:00')

const schedules=[
    {
        title:'test1',
        start:date.getTime(),
        end:date.getTime()+1000*60*60,
    }
]

global.fetch=(path,option)=>{
    return new Promise(resolve=>{
        resolve({
            status:200,
            json:()=>{
                return new Promise(resolve=>{
                    resolve(schedules)    
                })
            }
        })
    })
}


it('getScheduleData', () => {
    expect.assertions(1);
    return getScheduleData().then(data => 
      expect(data).toEqual(schedules.map(e=>{return {
          title:e.title,
          start:new Date(e.start),
          end:new Date(e.end),
      }}))
    );
});