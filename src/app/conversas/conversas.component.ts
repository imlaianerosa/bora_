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
  mensagens: any;
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
      this.mensagens = dados;
    });

    // this.listarUser()
    // setTimeout(() => {
    //   for (let i = 0; i < this.conversas.length; i++) {
    //     if (this.pessoaConversa.filter(this.conversas[i].idUsuDestino)) {
    //       if (
    //         this.conversas[i].idUsuDestino !==
    //         this.boraStore.getIdUsuarioLogado()
    //       ) {
    //         this.pessoaConversa.push(this.conversas[i].idUsuDestino);
    //       }
    //     }

    //     if (this.pessoaConversa.filter(this.conversas[i].idUsuario)) {
    //       if (
    //         this.conversas[i].idUsuario !== this.boraStore.getIdUsuarioLogado()
    //       ) {
    //         this.pessoaConversa.push(this.conversas[i].idUsuario);
    //       }
    //     }
    //   }
    // }, 2000);
    // setTimeout(() => {
    //   console.log(this.pessoaConversa)
    // }, 3000);
  }

  listarUser() {
    this.service.getMessages().subscribe((dados: any[]) => {
      this.mensagens = dados;
    });

    const idUsuarioLogado = this.boraStore.getIdUsuarioLogado(); // ID do usuário logado
    const idsUsuarios: any[] = []; // Lista vazia para armazenar os IDs dos usuários que trocaram mensagem com o usuário logado

    this.mensagens.forEach((mensagem: { idUsuario: any; idUsuDestino: any; }) => {
      const remetente = mensagem.idUsuario;
      const destinatario = mensagem.idUsuDestino;

      // Se o remetente ou destinatário da mensagem for o usuário logado, adicionamos o ID do outro usuário na lista
      if (remetente === idUsuarioLogado) {
        idsUsuarios.push(destinatario);
      } else if (destinatario === idUsuarioLogado) {
        idsUsuarios.push(remetente);
      }

      setTimeout(() => {
        console.log(idsUsuarios)
      }, 1500);
    });
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
