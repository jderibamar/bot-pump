import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core' //para que o nosso serviço tenha acesso ao módulo HTTP
import { Funcoes } from './funcoes.service'
import { map } from 'rxjs/operators'
// const stocksExchange = require('stocks-exchange-client').client

const int = '1d' // interval
const s = 'BTCUSDT'

@Injectable()
export class ExchangesService
{
    constructor(private funcS: Funcoes){}

    async pumpsBinance()
    {
        let api_info = await fetch('https://api.binance.com/api/v3/exchangeInfo'),
            s = await api_info.json(),
            p = s.symbols, // PARES
            perc = 0, // DIFERENÇA PERCENTAL ENTRE MAIOR ALTA E MENOR BAIXA
            pumps = [],
            c = [], // ARRAY COM O CLOSES PRICES
            rsi = ''
            

            for(let i in p)
            {
                if(p[i].status == 'TRADING')
                {
                    let symbol = p[i].symbol
                    let kl_api = await fetch(`https://api.binance.com/api/v3/klines?symbol=${symbol}&interval=${int}&limit=180`),
                    k = await kl_api.json()

                    for(let i = 0; i < k.length; i++)
                    {
                        let time = new Date(k[i][0]),
                            o = k[i][1],
                            h = k[i][2],
                            l = k[i][3]
                        
                        c.push(k[i][4])
                       

                        if(i == k.length -1)
                            rsi = this.funcS.calcRSI(c)

                        if(o < c) // ABERTURA TEM QUE SER MENOR QUE O FECHAMENTO 
                        {
                            perc = (h - l) / l * 100

                            if(perc > 50)
                                pumps.push({ s: symbol, h: h, l: l, dif: perc, rsi: rsi, d: time })
                        }
                    }
                }
            }   
            
            // for(let i in pumps)
            // {
            //     console.log(pumps[i].s + ' h: ' + pumps[i].h + ' l: ' + pumps[i].l + ' dif: ' + pumps[i].dif 
            //     + ' rsi: ' + pumps[i].rsi)
            // }

            let pp = this.funcS.count(pumps, 'Binance')

            for(let i = 0; i < pp.length; i++)
            {
                let cont = 0

                for(let j  = 0; j < pp.length; j++)
                {
                    if(pp[i].s == pp[j].s)
                    {
                        ++cont
                        if(cont > 0)
                            pp.splice(j, 1)
                    }
                }
            }

            pp.sort( (a, b) =>
            {
                return (b.perc > a.perc) ? 1 : ((a.perc > b.perc) ? -1 : 0)
            })


            // for(let i in pp)
            //     console.log(pp[i].s + ' -> DIF: ' + pp[i].perc + ' Data: ' + pp[i].d + ' h: ' + pp[i].h + ' l: ' + pp[i].l
            //     + ' cont: ' + pp[i].cont + ' Exchange: ' + pp[i].exc)

            // console.log(pp.length)    
        // for(let i in candles)
        // {
        //     console.log('Time: ' + k[i][0])
        //     console.log('Open: ' + k[i][1])
        //     console.log('High: ' + k[i][2])
        //     console.log('Low: ' + k[i][3])
        //     console.log('Close: ' + k[i][4])

        //     console.log('---------------------------------------------------')
        // }

        return pp
    }
    
    async testeCandle()
    {
        let kl_api = await fetch(`https://api.binance.com/api/v3/klines?symbol=UNFIUSDT&interval=1d&limit=180`),
            k = await kl_api.json()

        for(let i in k)
        {
            let time = new Date(k[i][0]),
            o = k[i][1],
            h = k[i][2],
            l = k[i][3],
            c = k[i][4]

            if(o < c) // ABERTURA TEM QUE SER MENOR QUE O FECHAMENTO 
            {
                let perc = (h - l) / l * 100

                console.log('Percentual -> ' + perc + ' H -> ' + h + ' L -> ' + l + ' Data -> ' + time)
            }
        }
    }

}