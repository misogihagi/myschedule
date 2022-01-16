function formatDate(date:Date){
    return ''+
      date.getFullYear()+'年'+
      (date.getMonth()+1)+'月'+
      date.getDate()+'日'+
      date.getHours()+'時'+
      date.getMinutes()+'分'
}


export function message(start:Date,end:Date){
    return formatDate(start) +'から'+formatDate(end)+'まで予定を登録します。よろしければ企業名を入力してください。'
}
