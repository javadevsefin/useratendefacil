import { ActivatedRoute } from '@angular/router';
import { AgendamentoService } from './../shared/agendamento.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-agendamento-senha',
  templateUrl: './agendamento-senha.component.html',
  styleUrls: ['./agendamento-senha.component.css'],
  preserveWhitespaces: true
})
export class AgendamentoSenhaComponent implements OnInit {

  identificador: number;
  senha: string;
  nome: string;
  cpfCnpj: string;
  unidade: string;
  endereco: string;
  data: string;
  horario: string;
  servico: string;
  detalhamentoServico: string;
  statusAgendamento: string;
  prioridade: string;
  resultado: string;

  constructor(private agendamentoService: AgendamentoService,
              private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.dataAtual();
    const params = this.route.snapshot.params;
    if(params.id){
      this.senhaById(params.id);
    }
  }

  senhaById(id){
    this.agendamentoService.senhaById(id).subscribe((senha: any)=>{
          this.identificador = senha.identificador;
          this.senha = senha.senha;
          this.nome = senha.nome;
          this.cpfCnpj = senha.cpfCnpj;
          this.unidade = senha.unidade;
          this.endereco = senha.endereco;
          this.data = senha.data;
          this.horario = senha.horario;
          this.servico = senha.servico;
          this.detalhamentoServico = senha.detalhamentoServico;
          this.statusAgendamento = senha.statusAgendamento;
          this.prioridade = senha.prioridade;
    }
    );
  }
  
  imprimir(){
    print();
  }

  formatarDate(data: string){
    let dataCompleta = "";
		
			 let dia = data.substring(8,10);
			 let mes = data.substring(5,7);
       let ano = data.substring(0,4);
       
       if(dia.length == 1){
        dia = "0" + dia;
     }

     if(mes.length == 1){
       mes = "0" + mes
     }
       dataCompleta = dia+"/"+mes+"/"+ano
    
		 return dataCompleta;
  }

  formatarPessoas(pfj: string){
    let res: string;
    if(pfj.length == 11 ){
      res = this.formatarCpf(pfj);
    } 

    if(pfj.length == 14 ){
      res = this.formatarCnpj(pfj);
    } 
    return res;
  }

  formatarCpf(cpf){
    let str:string = cpf; 
    let p1 = str.substring(0, 3);
    let p2 = str.substring(3, 6);
    let p3 = str.substring(6, 9);
    let p4 = str.substring(9, 11);
      cpf = p1 + "." + p2 + "." + p3 + "-" + p4;
    return cpf
   }

   formatarCnpj(cnpj){
     let str: string = cnpj;

     let p1 = str.substring(0, 2);
     let p2 = str.substring(2, 5);
     let p3 = str.substring(5, 8);
     let p4 = str.substring(8, 12);
     let p5 = str.substring(12, 14);

      cnpj = p1 + "." + p2 + "." + p3 + "/" + p4 + "-" + p5;

      return cnpj;
    }

    dataAtual() {
      var data = new Date();	
      var dia = data.getDate();
      var mes = data.getMonth();
      var ano = data.getFullYear(); 
      
      var meses = new Array(
           'janeiro','fevereiro','março','abril','maio','junho','julho','agosto',
           'setembro','outubro','novembro','dezembro'
          );
      
       this.resultado = "Goiânia, " + dia + ' de ' + meses[mes] + ' de ' + ano +'.' ;
      
    }
}
