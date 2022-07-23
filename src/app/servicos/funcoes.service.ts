import { Injectable } from '@angular/core'

const percent = 2

@Injectable()
export class Funcoes
{
   count(ar: any, exc = '')
   {
      // ar.sort() // ARRAY CONTENDO OS DADOS
      let pumps = [],
         // current = null,
         // cnt = 0,
         cpAr = ar, // DUPLICO O ARRAY
         s = '' // SYMBOL
      
         for(let i in ar)
         {
            let cnt = 0

            for(let j in cpAr)
            {
               if(ar[i].s == cpAr[j].s)
               {
                  s = ar[i].s
                  cnt++
               }
            }

            if(cnt >= 4)
            {
               pumps.push({ s: ar[i].s, h: ar[i].h, l: ar[i].l, perc: ar[i].dif, d: ar[i].d, cont: cnt, exc: exc })
               // console.log(s + ' -> cont: ' + cnt)
            }
         }

         

      // for (let i = 0; i < ar.length; i++) 
      // {
      //    if (ar[i].s != current) 
      //    {
      //       if(cnt > 0)
      //       {
      //          pumps.push({ s: ar[i].s, h: ar[i].h, l: ar[i].l, perc: ar[i].dif, d: ar[i].d, cont: cnt })
      //          // console.log('par: ' + current + ' cnt: ' + cnt)
      //       }
            
      //       current = ar[i].s
      //       cnt = 1
      //    } 
      //    else 
      //       cnt++
      // }
            
      return pumps
   }

   ordemDec(a: any, b: any) // ORDENAR DO MAIOR PARA O MENOR
   {
      return a.perc > b.perc
   }

   uniq(a) // ELIMINA ELEMENTOS REPETIDOS DE UM ARRAY
   {
      return a.sort().filter((item, pos, ary) => 
      {
          return !pos || item != ary[pos - 1]
      })
    }

   indexOf(arr)
   {
      var tmp = [];
      for(var i = 0; i < arr.length; i++)
      {
          if(tmp.indexOf(arr[i]) == -1) // RETORNA -1 SE NÃO ENCONTRAR O VALOR
            tmp.push(arr[i]);
      }
      
      return tmp
  }
  

}
