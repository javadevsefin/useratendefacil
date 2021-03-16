import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HomeService } from './modulos/home/shared/home.service';
import { Mensagem } from './modulos/home/shared/mensagem';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = "Prefeitura de Goiânia";
}
