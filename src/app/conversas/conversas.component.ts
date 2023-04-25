import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { BaseBoraComponent } from '../shared/components/base-bora/base-bora.component';
import { ConversasService } from './conversas.service';
import { BoraStore } from '../store/bora.store';

@Component({
  selector: 'app-conversas',
  templateUrl: './conversas.component.html',
  styleUrls: ['./conversas.component.scss'],
})
export class ConversasComponent extends BaseBoraComponent {
  menuOpen = false;
  conversas: any;
  pessoaConversa: [{}];

  constructor(
    private router: Router,
    private service: ConversasService,
    private boraStore: BoraStore
  ) {
    super();
  }

  ngOnInit(): void {
    this.service.getMessages().subscribe((dados: any[]) => {
      this.conversas = dados;
    });
    setTimeout(() => {
      for (let i = 0; i < this.conversas.length; i++) {
        if (!this.pessoaConversa.find(this.conversas[i].idUsuDestino)) {
          if (
            this.conversas[i].idUsuDestino !==
            this.boraStore.getIdUsuarioLogado()
          ) {
            this.pessoaConversa.push(this.conversas[i].idUsuDestino);
          }
        }

        if (!this.pessoaConversa.find(this.conversas[i].idUsuario)) {
          if (
            this.conversas[i].idUsuario !== this.boraStore.getIdUsuarioLogado()
          ) {
            this.pessoaConversa.push(this.conversas[i].idUsuario);
          }
        }
      }
    }, 1000);
  }

  goToChat() {
    this.router.navigate(['/chat']);
  }

  goToFeed() {
    this.router.navigate(['/feed']);
  }

  goToEdit() {
    this.router.navigate(['/perfil']);
  }

  goToConversas() {
    this.router.navigate(['/conversas']);
  }

  public toggleMenu(): void {
    this.menuOpen = !this.menuOpen;
  }

  exit() {
    this.router.navigate(['/']);
    this.onDestroy;
  }
}
