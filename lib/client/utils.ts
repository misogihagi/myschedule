function formatDate(date:Date){
    return ''+
      date.getFullYear()+'nen'+
      (date.getMonth()+1)+'gatu'+
      date.getDate()+'niti'+
      date.getHours()+'ji'+
      date.getMinutes()+'hun'
}


export function message(start:Date,end:Date){
    return formatDate(start) +'kara'+formatDate(end)
}