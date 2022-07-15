// todo의 형태를 정의

class Todo {
  id: string;
  text: string;

  constructor(todoText: string) {
    this.text = todoText
    this.id = new Date().toISOString()
  }
}

export default Todo;



/**
 * type keyword를 사용해도 되고
 * interface keyword도 있음
 * class를 생성해 객체를 만들어 사용해도 됨
 */
