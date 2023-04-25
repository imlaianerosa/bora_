import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, take, tap } from 'rxjs';
import { BoraStore } from '../store/bora.store';

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  ENVIAR_MSG = 'https://tg-bora-api.vercel.app/setmensagens';
  GET_MENSAGEM = 'https://tg-bora-api.vercel.app/getmensagembyId/';
  private readonly GET_USUARIO_BY_ID =
  'https://tg-bora-api.vercel.app/getusuariosbyid/';

  constructor(private http: HttpClient, private boraStore: BoraStore) {}

  sendMessage(data: any): Observable<any> {
    return this.http.post(`${this.ENVIAR_MSG}`, data).pipe(take(1));
  }

  getMessages(): Observable<any> {
    return this.http.get(`${this.GET_MENSAGEM}${this.boraStore.getIdUsuarioLogado()}`).pipe(take(1));
  }

  getDadosUsuarios(id: any){
    return this.http.get<any[]>(`${this.GET_USUARIO_BY_ID}${id}`).pipe(tap(console.log));
  }
}
