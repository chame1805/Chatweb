import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private dataSubjet = new BehaviorSubject<any[]>([])
  data$ = this.dataSubjet.asObservable();

  addData(data:any){
    const currenData = this.dataSubjet.value
    this.dataSubjet.next([...currenData,data])
  }

  getData():any[]{
    return this.dataSubjet.value
  }

}
