import { Agendamento } from './../shared/agendamento';
import { Calendario } from './../shared/calendario';
import { Unidade } from './../shared/unidade';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CadastroUsuarioService } from '../../cadastro-usuario/shared/cadastro-usuario.service';
import { AgendamentoService } from '../shared/agendamento.service';

@Component({
  selector: 'app-agendamento-list',
  templateUrl: './agendamento-list.component.html',
  styleUrls: ['./agendamento-list.component.css'],
  preserveWhitespaces: true
})
export class AgendamentoListComponent implements OnInit {

  agendForm: FormGroup;
  id: number = 0;
  nome: string = "";
  cpfCnpj: string = "";
  email: string = "";
  telefone: string = "";
  unidades: Unidade[];
  calendarios: Calendario[];
  agendamentos: Agendamento[];

  constructor(private route: ActivatedRoute, 
              private cadastroService: CadastroUsuarioService,
              private fb: FormBuilder,
              private agendamentoService: AgendamentoService,
              private router: Router) { }

  ngOnInit(): void {

    this.comboBox();

    const routeParans = this.route.snapshot.params;

      if(routeParans.id != null){
        this.cadastroService.loadById(routeParans.id).subscribe((usuario: any)=>{
            this.id = usuario.id;
            this.nome = usuario.nome;
            this.cpfCnpj = usuario.cpfCnpj;
            this.email = usuario.email;
            this.telefone = usuario.fone;
        });
      }

      this.agendForm = this.fb.group({
          calendario: ["", []],
          unidade: ["", []]
      });

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

    verAgenda(){
      let calendario = this.agendForm.get('calendario').value;
      let unidade = this.agendForm.get('unidade').value;

      this.agendamentoService.agendaContribuinte(calendario, unidade).subscribe(
        dados => this.agendamentos = dados
      );

    }

    agendar(id_agenda){
      this.router.navigate(['agendamento/userFin',  id_agenda,  this.id]);
    }

    comboBox(){
      this.agendamentoService.listCalendario().subscribe(
        dados=> this.calendarios = dados
      );

      this.agendamentoService.listUnidade().subscribe(
        dados=> this.unidades = dados
      );

     /* this.servicoService.listServico().subscribe(
        dados=> this.servicos = dados
      );*/
  }

}
