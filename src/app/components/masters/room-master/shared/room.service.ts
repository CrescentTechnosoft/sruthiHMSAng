import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { CustomEncoderService } from 'src/app/services/http/custom-encoder.service';
import { Inputs, Response } from './room.model';

@Injectable()
export class RoomService {
  private currentUrl: string = environment.normUrl + 'masters/room-master';

  constructor(private http: HttpClient, private encoder: CustomEncoderService) { }

  getRooms(): Observable<Inputs[]> {
    return this.http.get<Inputs[]>(this.currentUrl);
  }

  save(data: Inputs): Observable<Response> {
    return this.http.post<Response>(this.currentUrl, data);
  }

  update(data: Inputs): Observable<string> {
    return this.http.patch(`${this.currentUrl}/${data.id}`, data, { responseType: 'text' });
  }

  deleteRoom(id: number): Observable<string> {
    return this.http.delete(`${this.currentUrl}/${id}`, { responseType: 'text' });
  }

  getInputs(): Inputs {
    return {
      id: 0,
      floor: '',
      ward: '',
      room: '',
      bedNo: '',
      rent: 0,
      occupied: false
    }
  }
}
