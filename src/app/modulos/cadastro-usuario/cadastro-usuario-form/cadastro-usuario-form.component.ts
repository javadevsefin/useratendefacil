import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CadastroUsuarioService } from '../shared/cadastro-usuario.service';

@Component({
  selector: 'app-cadastro-usuario-form',
  templateUrl: './cadastro-usuario-form.component.html',
  styleUrls: ['./cadastro-usuario-form.component.css']
})
export class CadastroUsuarioFormComponent implements OnInit {

  mostrarMens: boolean = false;
  cadUserForm: FormGroup;
  password: string;
  confirm_password: string;

  nome: string = "";
  cpfCnpj: string = "";
  email: string = "";
  fone: string = "";
  senha: string = "";

  constructor(private fb: FormBuilder, 
              private usuarioService: CadastroUsuarioService) { }

  ngOnInit(): void {
 
    this.cadUserForm = this.fb.group({
        nome: ['',[Validators.required]],
        cpfCnpj:['',[Validators.required]],
        email: ['',[Validators.required, Validators.email]],
        fone: ['',[Validators.required]],
        senha: ['',[Validators.required ,Validators.minLength(6)]],
        confirmarSenha:['',[Validators.required, Validators.minLength(6)]]
    });
  }

  validarSenha(){
        this.password = this.cadUserForm.get('senha').value;
		  	this.confirm_password = this.cadUserForm.get('confirmarSenha').value;
			
				  if(this.password != this.confirm_password) {
            this.cadUserForm.get('senha').setValue("");
            this.cadUserForm.get('confirmarSenha').setValue("")
				  }  
  }

  confirmarDados(){
    this.validarSenha();
    this.nome = this.cadUserForm.get('nome').value;
    this.cpfCnpj = this.cadUserForm.get('cpfCnpj').value;
    this.email = this.cadUserForm.get('email').value;
    this.fone = this.cadUserForm.get('fone').value;
    this.senha = this.cadUserForm.get('senha').value;
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
      
  onSubmit(){
    if(this.cadUserForm.valid){
        this.usuarioService.create(this.cadUserForm.value).subscribe(
          success => { this.mostrarMens = true }
        );
     }
     this.cadUserForm.reset();
  }

  limpar(){
    this.cadUserForm.reset();
  }

}
