import {Injectable} from '@angular/core';

@Injectable()
export class LocalStorageService {
  public getItem<T = unknown>(key: string): T {
    return JSON.parse(localStorage.getItem(key)) as T;
  }

  public setItem(key: string, value: unknown): void {
    localStorage.setItem(key, JSON.stringify(value));
  }

  public removeItem(key: string): void {
    localStorage.removeItem(key);
  }

  public clear(): void {
    localStorage.clear();
  }
}
