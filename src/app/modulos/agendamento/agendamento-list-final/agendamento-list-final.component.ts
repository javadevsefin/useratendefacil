import { CadastroUsuarioService } from './../../cadastro-usuario/shared/cadastro-usuario.service';
import { AgendamentoService } from './../shared/agendamento.service';
import { DetalhamentoServico } from './../shared/detalhamento-servico';

import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';




@Component({
  selector: 'app-agendamento-list-final',
  templateUrl: './agendamento-list-final.component.html',
  styleUrls: ['./agendamento-list-final.component.css'],
  preserveWhitespaces: true
})
export class AgendamentoListFinalComponent implements OnInit {

  agendForm: FormGroup;
  id: number = 0;
  nome: string = "";
  cpfCnpj: string = "";
  email: string = "";
  telefone: string = "";
  id_agendamento: number = 0;
  unidade: String = "";
  data: string = '';
  horario: string = '';
  especifico: string = '';
  status: string = '';
  btn: boolean = true;
  detalhamentoServicos: DetalhamentoServico[];

  constructor(private route: ActivatedRoute, 
    private fb: FormBuilder,
    private agendamentoService: AgendamentoService,
    private router: Router,
    private cadastroService: CadastroUsuarioService) { }

  ngOnInit(): void {
   
    

    const routeParans = this.route.snapshot.params;
    console.log(routeParans);

      if(routeParans.id_usuario != null){
        this.cadastroService.loadById(routeParans.id_usuario).subscribe((usuario: any)=>{
            this.id = usuario.id;
            this.nome = usuario.nome;
            this.cpfCnpj = usuario.cpfCnpj;
            this.email = usuario.email;
            this.telefone = usuario.fone;
            this.agendForm.get('contribuinte').setValue(this.id.toString());
        });

        if(routeParans.id_agendamento != null){
          this.agendamentoService.loadById(routeParans.id_agendamento).subscribe((agenda: any)=>{
            this.id_agendamento = agenda.id
            this.unidade = agenda.grade.unidade.descricao;
            this.horario = agenda.horario;
            this.data = agenda.grade.calendario.dia;
            this.especifico = agenda.grade.servico.descricao;
            this.status =  agenda.statusAgendamento;
            this.combobox(agenda.grade.servico.descricao);
            this.agendForm.get('id').setValue(this.id_agendamento.toString());
          }
          );
        }
      }

    this.agendForm = this.fb.group({
      id: ["", []],
      contribuinte: ["", []],
      detalhamentoServico: ["", [Validators.required]],
      prioridade: ["", [Validators.required]]
  });
  }

  combobox(servico){
    this.agendamentoService.listDetalhamentoServico(servico).subscribe(
      dados => this.detalhamentoServicos = dados
    );
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

    enviar(){
      if(this.agendForm.valid){
        this.btn = !this.btn;
        console.log(this.agendForm.value)
        this.agendamentoService.enviar(this.agendForm.value).subscribe(
          success => {
            console.log("Passou!")
          }
        );
      }
    }

    imprimir(id){
     this.router.navigate(['agendamento/senha', id]);
     /*let url: string = "http://localhost:4900/agendamento/senha"+"/"+id;
     window.open(url, "Teste", "resizable,scrollbars,status");*/
    }

}
