export interface Schedule {
    title:string,
    start:Date,
    end:Date,
}
export interface ScheduleData {
    title:string,
    start:number,
    end:number,
}
export interface CreateResponse {
    ok:boolean
}
export interface ErrorMessage{
    ok:boolean,
    message:string
}
