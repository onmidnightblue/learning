import { useRef } from "react";
import classes from './NewTodo.module.css'

const NewTodo: React.FC<{onAddTodo: (text: string) => void }> = (props) => {
  const todoTextInputRef = useRef<HTMLInputElement>(null)

  const submitHandler = (event: React.FormEvent) => {
    event.preventDefault()

    const enteredText = todoTextInputRef.current!.value

    if (enteredText.trim().length === 0) {
      return
    }

    props.onAddTodo(enteredText)
  }

  return (
    <form onSubmit={submitHandler} className={classes.form}>
      <label htmlFor="text">Todo</label>
      <input type='text' id="text" ref={todoTextInputRef}/>
      <button>add todo</button>
    </form>
  );
};

export default NewTodo;

/**
 * event: React.FormEvent : form 제출 타입
 * event: React.MouseEvent : 마우스 이벤트
 */

/**
 * const enteredText = todoTextInputRef.current?.value
 * 자동으로 ?. 이렇게 물음표가 붙는데 
 * 타입스크립트에게 일단 값에 접근해보고 접근이 가능하면 그 때 입력된 값을 가져오라는 뜻
 * 레퍼런스와 요소가 연결되었다는 것을 알고 있다면 !. 이렇게 사용할 수도 있다.
 * null이 아니라는 걸 100% 알고 있을 때 사용해야 한다.
 */
