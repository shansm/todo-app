export class TodoModel {
  /*
    ID assignment normally is done on the backend, but for example purposes
    we'll just do it on the frontend
  */
  id: number = Math.floor((Math.random() * 1000000) + 1);
  completed: boolean = false;
  constructor(
    public item = ''
  ) {}
}
