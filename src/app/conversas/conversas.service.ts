import { Injectable } from '@angular/core';
import { BoraStore } from '../store/bora.store';
import { HttpClient } from '@angular/common/http';
import { Observable, take } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ConversasService {
  GET_MENSAGEM = 'https://tg-bora-api.vercel.app/getmensagembyId/';

  constructor(private http: HttpClient, private boraStore: BoraStore) {}

  getMessages(): Observable<any> {
    return this.http
      .get<any[]>(`${this.GET_MENSAGEM}${this.boraStore.getIdUsuarioLogado()}`)
      .pipe(take(1));
  }
}
