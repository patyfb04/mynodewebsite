import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class LocalStorageService {
  constructor() { }

  set(key: any, value: any){
    localStorage.setItem(key, value)
  }

  get(key: any){
    return localStorage.getItem(key) ?? null
  }

  removeKey(key: any){
    return localStorage.removeItem(key)
  }
}
