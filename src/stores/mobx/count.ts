import { makeAutoObservable } from 'mobx';

class CountStore {
  count = 0;

  constructor() {
    makeAutoObservable(this);
  }

  update = () => this.count++;
}

export const countStore = new CountStore();
