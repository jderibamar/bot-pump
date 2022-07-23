import { AfterViewInit, Component, OnInit, ViewChild, ElementRef } from '@angular/core'
// import { LiveAnnouncer } from '@angular/cdk/a11y'
import { MexcService } from './servicos/mexc.service'
import { BittrexService } from './servicos/bittrex.service'
import { ExchangesService } from './servicos/exchanges.service'


import {} from '@angular/cdk/a11y'
import { MatSort, Sort } from '@angular/material/sort'
import { MatTableDataSource } from '@angular/material/table'
import { fromEvent } from 'rxjs'



@Component(
{
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit
{
  constructor
  (
     private mexcS: MexcService, private btxS: BittrexService, private excS: ExchangesService
  ) {}

    colunasTab: string[] = ['moeda', 'exc', 'high', 'low', 'ocorrencias', 'percentual']
    dataSource: any 

    @ViewChild(MatSort) sort: MatSort
    @ViewChild('filter',  {static: true}) filter: ElementRef

    ngOnInit(): void 
    {
        this.gerarTabelaHTML()
        // setInterval(() => location.reload() , 900 * 1000)
        this.loadData()

        // this.excS.pumpsBinance()
    }

    // ngAfterViewInit() 
    // { 
    //     setInterval( () => { this.gerarTabelaHTML() }, 3000)
    // }   

    public loadData() 
    {
        fromEvent(this.filter.nativeElement, 'keyup').subscribe(() => 
        {
          if (!this.dataSource) 
          {
             return
          }
          this.dataSource.filter = this.filter.nativeElement.value
        })
    }


      //monta o ARRAY de fonte de dados para gerar a tabela que será renderizada
      //bc = Binance / Crex
      async gerarTabelaHTML()
      {          
          //arrary geral contendo todas as interesecções de todas as exchanges
          let todasExcs = []

          let binance = await this.excS.pumpsBinance()
             
          todasExcs.push
          (
             ...binance
          )
  
          this.dataSource = new MatTableDataSource(todasExcs)
          this.dataSource.sort = this.sort
  
          // console.log('Array geral: ' + todasExcs)
          // ...crexExmo, ...crexMexc, ...crexBittrex,  ...crexCoinex, ...crexChangellyPro, ...crexAscendex, ...crexZtb, ...crexFmfw,
      }
      
}
