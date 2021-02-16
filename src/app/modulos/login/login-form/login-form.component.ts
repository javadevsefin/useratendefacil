import { AuthService } from './../shared/auth.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CadastroUsuarioService } from '../../cadastro-usuario/shared/cadastro-usuario.service';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css']
})
export class LoginFormComponent implements OnInit {

  mostrarMens: boolean = false;
  loginForm: FormGroup;
  cpfCnpj: string = "";
  senha: string = "";
  id: number = 0;
  msgError: boolean = false;

  constructor(private usuarioService: CadastroUsuarioService,
              private authService: AuthService,
              private fb: FormBuilder,
              private router: Router) { }

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      cpfCnpj: ['', []],
      senha: ['', []]
    });
  }

  fechar(){
    this.msgError = false;
  }

  logar(){

    let cpfCnpj = this.loginForm.get('cpfCnpj').value;
    let senha = this.loginForm.get('senha').value;

    this.authService.logar(cpfCnpj, senha).subscribe((res: any)=>{
        this.id = res.id;
        this.cpfCnpj = res.cpfCnpj;
        this.senha = res.senha;

        if(this.cpfCnpj === cpfCnpj &&  this.senha === senha){
          this.authService.setLoggedIn(true);
          this.router.navigate(['agendamento/user', this.id]);
        }
    }, (error: any) => { this.msgError = true }
    );
    this.loginForm.reset();
  }
}
