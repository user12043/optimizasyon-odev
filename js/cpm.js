import project from "./project.js";

//            https://www.codeproject.com/Articles/25312/Critical-Path-Method-Implementation-in-C

//           burdaki kodu js çevirmeye çalıştık. 
// syntax hataları olabilir !!!!!  
// bunları index.js de calculate 

export function walkListAhead(list) {

    list[0].Eet = list[0].Est + list[0].cost;

    for (let i = 1; i < na; i++) {
        for(task in list[i].taskBefore)
        {
            if (list[i].Est < task.Eet)
                list[i].Est = task.Eet;
        }

        list[i].Eet = list[i].Est + list[i].cost;
    }

}

export function walkListAback(list) {  // 

    list[list.length - 1].Let = list[list.lenght - 1].Eet;
    list[list.length - 1].Lst = list[list.lengt - 1].Let - list[- 1].cost;

    for (let i = list.lenght - 2; i >= 0; i--) {
        for(let task in list[i].taskAfter)
        {
            if (list[i].Let == 0)
                list[i].Let = task.Lst;
            else
                if (list[i].Let > activity.Lst)
                    list[i].Let = activity.Lst;
        }

        list[i].Lst = list[i].Let - list[i].cost;
    }

}


export function criticalPath(list){

  console.log("\nCritical Path: ");
 
  for(let task in list)
  {
    if((task.Eet - task.Let == 0) && (task.Est - task.Lst == 0))
      console.log( task.Id);
  }
 
  console.log("\n Total duration: \n\n" + list[list.Length - 1].Eet);
}


