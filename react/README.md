## :speech_balloon: hook

### 정의

옛날에 함수형 컴포넌트는 화면에 무언가를 출력하기 위해서만 사용되었고, 
클래스형 컴포넌트만 state를 변경할 수 있었다.
그러나 클래스형 컴포넌트는 작업량이 많다는 단점이 있다. 
state를 초기화하려면 생성자도 필요하고, 컴포넌트 생명주기 메서드도 추가해야 한다.
이후 react hook이 추가되면서 함수형 컴포넌트에서도 state를 변경할 수 있게 되었다.

- react js에서 제공하는 조금 특별한 함수이고, 직접 만들 수도 있다.
- 함수형 컴포넌트에서만 사용할 수 있다.
- 이름은 모두 ‘use’로 시작해야 한다.
- 반복문이나 조건문, 다른 함수 안에서 사용할 수 없다.


### 종류
- useState
- useEffect
- useRef
- useCallback
- useMemo
<br />
<br />

## :speech_balloon: useState

### 문법

함수형 컴포넌트에서 state를 관리하고 싶을 때 사용한다.

```jsx
const [state, setState] = useState(initial value);
// const [포인터, 상태 업데이트 함수] = useState(초깃값);
```

- 초깃값에는 배열, 객체, string, number, null, undefined 등이 들어간다.
<br />

### 사용자에게 데이터 받기

```jsx
import React from 'react';
import { useState } from 'react';

const Form = (props) => {
  const [enteredTitle, setEnteredTitle] = useState('');

  const submitHandler = event => {
    event.preventDefault();
    // code
  };

	const titleChangeHandler = event => {
		setEnteredTitle(event.target.value);
	}

  return (
		<>
	    <form onSubmit={submitHandler}>
		    <label htmlFor="title">Name</label>
        <input
	        type="text"
          id="title"
          value={enteredTitle}
          onChange={titleChangeHandler}
        />
        <button type="submit">Submit</button>
      </form>
	  </>
  );
});

export default Form;
```
<br />

### 부모로 데이터를 올려보내기

```jsx
const submitHandler = event => {
	event.preventDefault();
	props.onAddIngredient({ title: enteredTitle, amount: enteredAmount });
};
```

```jsx
const Ingredients = () => {
  const [userIngredients, setUserIngredients] = useState([]);

  const addIngredientHandler = ingredient => {
    setUserIngredients(prevIngredients => [
      ...prevIngredients, // 예전 배열을 가져옴
      { id: Math.random().toString(), ...ingredient } 
			// 새로운 요소 추가
			// id: Math.random().toString() > id가 없어서 랜덤한 값으로 임의 생성
			// ...ingredient > 모든 키-값 쌍을 가져와서 같은 형태로 새로운 객체에 추가
    ]);
  };

	const removeIngredientHandler = ingredientId => {
    setUserIngredients(prevIngredients =>
      prevIngredients.filter(ingredient => ingredient.id !== ingredientId)
    );
  };

  return (
    <>
      <IngredientForm onAddIngredient={addIngredientHandler} />
      <IngredientList
	      ingredients={userIngredients}
        onRemoveItem={removeIngredientHandler}
      />
    </>
  );
};

export default Ingredients;
```
<br />

### 데이터 가져와서 뿌리기

```jsx
const IngredientList = props => {
  return (
    <Styles.IngredientList>
      <h2>Loaded Ingredients</h2>
      <ul>
        {props.ingredients.map(ig => (
          <li 
						key={ig.id} 
						onClick={props.onRemoveItem.bind(this, ig.id)}
					>
            <span>{ig.title}</span>
            <span>$ {ig.amount}</span>
          </li>
        ))}
      </ul>
    </Styles.IngredientList>
  );
};

export default IngredientList;
```
<br />
<br />

## :speech_balloon: props.children

### to use

중복 사용될 수 있는 Card나 Button component에서 사용 빈도가 높다.

```jsx
const Card = props => {
  return <Styles.Card>{props.children}</Styles.Card>;
};

export default Card;
```

이후 사용하고 싶은 곳에서 import해 사용하면 된다.

```jsx
import Card from '../UI/Card';

const Item = () => {
	return (
		<Card>
			<label>title</label>
		  <input type="text" />
		</Card>
	);
}
```
<br />
<br />


## :speech_balloon: firebase

### 정의

- 구글이 만들었고, 테스트용 백엔드로 사용할 수 있다.
- url을 입력할 때 제일 마지막에 “.json”을 붙여주어야 한다.
- property 이름으로 ‘name’을 사용한다.
<br />

### url 매개변수 필터링

firebase는 매개변수 필터링을 지원한다.

```jsx
const query =
      enteredFilter.length === 0
        ? ''
        : `?orderBy="title"&equalTo="${enteredFilter}"`;
axios.get('https://applestore-1478e-default-rtdb.firebaseio.com/ingredients.json' + query)
```
<br />
<br />


## :speech_balloon: fetch

### get

```jsx
useEffect(() => {
	fetch('https://react-hooks-update.firebaseio.com/ingredients.json')
		.then(response => response.json())
    .then(responseData => {
	    const loadedIngredients = [];
      for (const key in responseData) {
	      loadedIngredients.push({
	        id: key,
          title: responseData[key].title,
          amount: responseData[key].amount
        });
      }
      setUserIngredients(loadedIngredients);
    });
}, []);
```
<br />

### post

```jsx
const addIngredientHandler = ingredient => {
    fetch('https://react-hooks-update.firebaseio.com/ingredients.json', {
      method: 'POST',
      body: JSON.stringify(ingredient),
      headers: { 'Content-Type': 'application/json' }
    })
      .then(response => {
        return response.json();
      })
      .then(responseData => {
        setUserIngredients(prevIngredients => [
          ...prevIngredients,
          { id: responseData.name, ...ingredient }
        ]);
      });
  };
```
<br />

### delete

```jsx
const removeIngredientHandler = ingredientId => {
    fetch(
      `https://react-hooks-update.firebaseio.com/ingredients/${ingredientId}.json`,
      {
        method: 'DELETE'
      }
    ).then(response => {
      setUserIngredients(prevIngredients =>
        prevIngredients.filter(ingredient => ingredient.id !== ingredientId)
      );
    })
  };
```
<br />
<br />

## :speech_balloon: axios

### get

```jsx
useEffect(() => {
    axios.get('https://applestore-1478e-default-rtdb.firebaseio.com/ingredients.json')
      .then(response => {
        const loadedIngredients = [];
        const data = response.data;
        for (const key in data) {
          loadedIngredients.push({
            id: key,
            title: data[key].title,
            amount: data[key].amount
          })
        }
        setUserIngredients(loadedIngredients)
      })
  }, [])
```
<br />

### post

```jsx
const addIngredientHandler = ingredient => {
	axios.post('https://applestore-1478e-default-rtdb.firebaseio.com/ingredients.json', {
	  id: ingredient.id,
	    ...ingredient
    })
      .then(response => {
        const data = response.data;
        setUserIngredients(prevIngredients => [
          ...prevIngredients,
          { id: data.name, ...ingredient }
        ]);
      });
  };
```
<br />

### delete

```jsx
const removeIngredientHandler = ingredientId => {
    axios.delete(`https://applestore-1478e-default-rtdb.firebaseio.com/ingredients/${ingredientId}.json`)
      .then(response => {
        setUserIngredients(prevIngredients =>
          prevIngredients.filter(ingredient => ingredient.id !== ingredientId)
        );
      })
  };
```
<br />
<br />


## :speech_balloon: useEffect

### 문법

mount될 때마다 실행하고 싶은 함수가 있을 때 사용한다.
side effect를 관리하기 때문에 useEffect라는 이름이 붙여졌다.
useEffect 안에 작성한 코드는 렌더링 이후, 렌더링될 때마다 실행된다.

<aside>
💡 side effect
: 어떤 로직이 실행되어 응용 프로그램에 예상치 못한 영향을 주는 것
</aside>

```jsx
useEffect(() => {
	// code

	return () => {} // clear function
}, [])
```

- 빈 배열 ([]) : 컴포넌트가 처음 렌더링될 때만 실행된다.
- 생략 : 렌더링될 때마다 실행된다.
- 작성 : 처음 렌더링될 때와 의존성 값이 변경될 때 실행된다.
- clear function은 동일한 useEffect() 함수가 다시 실행되기 직전에 실행된다.
<br />

### http 통신 무한 루프 막기

데이터를 렌더링 함수 안에서 가져오게 되면, 렌더링될 때마다 http 요청을 전송한다.
http 요청을 보낸 뒤 state를 업데이트 하고, state를 업데이트하면 다시 컴포넌트가 리렌더링 되는데
그럼 또 다시 http 요청을 보내게 되는 무한 루프에 빠진다.

```jsx
useEffect(() => {
    axios.get('https://applestore-1478e-default-rtdb.firebaseio.com/ingredients.json')
      .then(response => {
        const loadedIngredients = [];
        const data = response.data;
        for (const key in data) {
          loadedIngredients.push({
            id: key,
            title: data[key].title,
            amount: data[key].amount
          })
        }
        setUserIngredients(loadedIngredients)
      })
  }, [])
```
<br />
<br />

## :speech_balloon: useCallback

### 문법

컴포넌트가 리렌더링되더라도 useCallback 안의 함수는 다시 실행하지 않는다.

```jsx
const handler = useCallback(parameter => {
	// code
}, [])
```

- 첫 번째 인자는 함수이고, 두 번째 인자는 함수의 의존성 값을 담은 배열이다.
<br />

### useEffect의 의존성 배열로 인한 무한 루프 막기

```jsx
import axios from 'axios';
import React, { useState, useCallback } from 'react';
import IngredientForm from './IngredientForm';
import IngredientList from './IngredientList';
import Search from './Search';

const Ingredients = () => {
  const [userIngredients, setUserIngredients] = useState([]);

  const filteredIngredientsHandler = useCallback(filteredIngredients => {
    setUserIngredients(filteredIngredients)
  }, [])

  const addIngredientHandler = ingredient => {
    axios.post('https://applestore-1478e-default-rtdb.firebaseio.com/ingredients.json', {
      id: ingredient.id,
      ...ingredient
    })
      .then(response => {
        const data = response.data;
        console.log(data)
        setUserIngredients(prevIngredients => [
          ...prevIngredients,
          { id: data.name, ...ingredient }
        ]);
      });
  };

  const removeIngredientHandler = ingredientId => {
    setUserIngredients(prevIngredients =>
      prevIngredients.filter(ingredient => ingredient.id !== ingredientId)
    );
  };

  return (
    <div className="App">
      <IngredientForm onAddIngredient={addIngredientHandler} />

      <section>
        <Search onLoadIngredients={filteredIngredientsHandler} />
        <IngredientList
          ingredients={userIngredients}
          onRemoveItem={removeIngredientHandler}
        />
      </section>
    </div>
  );
};

export default Ingredients;
```

```jsx
import React from 'react';
import { useEffect, useState } from 'react';
import axios from 'axios';
import Card from '../UI/Card';

const Search = React.memo(props => {
  const { onLoadIngredients } = props;
  const [enteredFilter, setEnteredFilter] = useState('')

  const inputChangeHandler = e => {
    setEnteredFilter(e.target.value)
  }

	useEffect(() => {
    // setTimeout > 입력할 때마다 요청을 보내지 않기 위해 사용
    const timer = setTimeout(() => {
      if (enteredFilter === inputRef.current.value) {
        const query =
          enteredFilter.length === 0
            ? ''
            : `?orderBy="title"&equalTo="${enteredFilter}"`;
        axios.get('https://applestore-1478e-default-rtdb.firebaseio.com/ingredients.json' + query)
          .then(response => {
            const loadedIngredients = [];
            const data = response.data;
            for (const key in data) {
              loadedIngredients.push({
                id: key,
                title: data[key].title,
                amount: data[key].amount
              })
            }
            onLoadIngredients(loadedIngredients)
          })
      }
    }, 500)
    return () => {
      clearTimeout(timer)
    }
  }, [enteredFilter, onLoadIngredients, inputRef])

  return (
    <Styles.Search>
      <Card>
        <div className="search-input">
          <label>Filter by Title</label>
          <input type="text"
            value={enteredFilter}
            onChange={inputChangeHandler}
            ref={inputRef}
          />
        </div>
      </Card>
    </Styles.Search>
  );
});

export default Search;
```

1. 하위 컴포넌트에서 처음 렌더링될 때 useEffect 실행해 데이터를 가져온다.
2. useEffect의 의존성 배열 값인 enteredFilter가 변경될 때마다 함수를 실행한다.
3. 근데 얘는 검색창에 뭔가를 입력할 때 바뀌는 애라서 무한 루프에 영향이 없다.
4. onLoadIngredients는 props에서 가져온 거라 부모 컴포넌트가 리렌더링 되면 바뀔 수 있다.
5. 얘가 문젠데 useEffect에서 처음 데이터 로딩 후 부모 컴포넌트로 데이터를 넘기기 위해  onLoadIngredients를 호출한다.
6. 이후 부모 컴포넌트에서 filteredIngredientsHandler가 호출되어 하위 컴포넌트에서 올라온 데이터를 받는다.
7. filteredIngredientsHandler 안의 코드인 setUserIngredients()로 state를 변경시킨다.
8. 부모 컴포넌트는 다시 리렌더링 된다.
9. 그러면 하위 컴포넌트도 다시 리렌더링된다.
10. 그래서 리렌더링되더라도 처음 값 그대로 남아있게 하기 위해 useCallback을 사용했다.
    
    ```jsx
    const filteredIngredientsHandler = useCallback(filteredIngredients => {
    	setUserIngredients(filteredIngredients)
    }, [])
    ```
<br />
<br />

### loading, error state를 만들어서 UX 상승시키기

```jsx
import axios from 'axios';
import React, { useState, useCallback } from 'react';
import IngredientForm from './IngredientForm';
import IngredientList from './IngredientList';
import Search from './Search';
import ErrorModal from '../UI/ErrorModal'

const Ingredients = () => {
  const [userIngredients, setUserIngredients] = useState([]);
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(false)

  const filteredIngredientsHandler = useCallback(filteredIngredients => {
    setUserIngredients(filteredIngredients)
  }, [])

  console.log("rendering")

  const addIngredientHandler = ingredient => {
    setIsLoading(true)
    axios.post('https://applestore-1478e-default-rtdb.firebaseio.com/ingredients.json', {
      id: ingredient.id,
      ...ingredient
    })
      .then(response => {
        setIsLoading(false)
        const data = response.data;
        console.log(data)
        setUserIngredients(prevIngredients => [
          ...prevIngredients,
          { id: data.name, ...ingredient }
        ]);
      })
      .catch(error => {
        // 모든 error 객체에는 message 프로퍼티가 존재한다.
        // setError(error.message)
        setError('error!')
        setIsLoading(false)
      })
  };

  const removeIngredientHandler = ingredientId => {
    setIsLoading(true)
    axios.delete(`https://applestore-1478e-default-rtdb.firebaseio.com/ingredients/${ingredientId}.json`)
      .then(response => {
        setIsLoading(false)
        setUserIngredients(prevIngredients =>
          prevIngredients.filter(ingredient => ingredient.id !== ingredientId)
        );
      })
      .catch(error => {
        setError('error!')
        setIsLoading(false)
      })
  };

  const clearError = () => {
    setError(null)
  }

  return (
    <>
      {error && <ErrorModal onClose={clearError}>{error}</ErrorModal>}
      <IngredientForm
        onAddIngredient={addIngredientHandler}
        loading={isLoading}
      />

      <section>
        <Search onLoadIngredients={filteredIngredientsHandler} />
        <IngredientList
          ingredients={userIngredients}
          onRemoveItem={removeIngredientHandler}
        />
      </section>
    </>
  );
};

export default Ingredients;
```
<br />

### error modal

```jsx
import React from 'react';
import styled from 'styled-components';

const Styles = {
  ErrorModal: styled.div`
    position: fixed;
    top: 30vh;
    left: calc(50% - 15rem);
    width: 30rem;
    background: white;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.26);
    z-index: 100;
    border-radius: 7px;
    h2 {
      margin: 0;
      padding: 1rem;
      background: #ff2058;
      color: white;
      border-radius: 7px 7px 0 0;
      text-align: center;
    }
    p {
      padding: 1rem;
    }
    .error-modal__actions {
      display: flex;
      justify-content: center;
      align-items: center;
      padding: 0 0.5rem;
    }
  `,
  Backdrop: styled.div`
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100vh;
    background: rgba(0, 0, 0, 0.75);
    z-index: 50;
  `
}

const ErrorModal = React.memo(props => {
  return (
    <>
      <Styles.Backdrop onClick={props.onClose} />
      <Styles.ErrorModal>
        <h2>An Error Occurred!</h2>
        <p>{props.children}</p>
        <div className="error-modal__actions">
          <button type="button" onClick={props.onClose}>
            Okay
          </button>
        </div>
      </Styles.ErrorModal>
    </>
  );
});

export default ErrorModal;
```
<br />
<br />

## :speech_balloon: useReducer

### 문법

예전 state를 사용하거나 다른 state의 새로운 상태를 기반으로 새롭게 state를 업데이트해야 할 경우에 사용한다.
상태를 업데이트할 때 어떤 식으로 상태를 변경할 것인지 정의할 수 있게 해준다.
그리고 해당 state를 관리해준다.

```jsx
const reducer = (state, action) => {
  switch (action.type) {
    case 'SET':
      return action.ingredients;
    default:
			throw new Error('error')
  }
}

const Component = () => {
	const [userIngredients, dispatch] = useReducer(ingredientReducer, [])

	const filteredIngredientsHandler = useCallback(filteredIngredients => {
    dispatch({ type: 'SET', ingredients: filteredIngredients })
  }, [])

	return ()
}
```
<br />

### reducer

여러 개의 입력을 받아 하나의 결과를 반환하는 함수이다. 
보통 컴포넌트 바깥에 정의하는데, 컴포넌트가 렌더링될 때마다 리듀서 함수가 다시 생성되지 않도록 하기 위함이다. 
<br />

### action

보통 객체 형태이며, type을 가진다.
switch문을 이용해 action 타입에 따라 서로 다른 코드를 수행하도록 정의할 수 있다.
<br />

### dispatch

정의했던 reducer에서 원하는 액션 함수를 사용할 수 있다.

```jsx
dispatch({ type: 'SET', ingredients: filteredIngredients })
```
<br />

### 전체 코드

```jsx
import axios from 'axios';
import React, { useCallback, useReducer } from 'react';
import IngredientForm from './IngredientForm';
import IngredientList from './IngredientList';
import Search from './Search';
import ErrorModal from '../UI/ErrorModal'

// data add, delet reducer
const ingredientReducer = (state, action) => {
  switch (action.type) {
    case 'SET':
      return action.ingredients;
    case 'ADD':
      return [...state, action.ingredient]
    case 'DELETE':
      return state.filter(ing => ing.id !== action.id);
    default:
      throw new Error('Should not get there!');
  }
}

// loading, error reducer
const httpReducer = (state, action) => {
  switch (action.type) {
    case 'SEND':
      return { loading: true, error: null }
    case 'RESPONSE':
      return { ...state, loading: false }
    case 'ERROR':
      return { loading: false, error: action.errorMessage }
    case 'CLEAR':
      return { ...state, error: null }
    default:
      throw new Error('Should not get there!');
  }
}

const Ingredients = () => {
  const [userIngredients, dispatch] = useReducer(ingredientReducer, [])
  const [httpState, httpDispatch] = useReducer(httpReducer, { loading: false, error: null })

  const filteredIngredientsHandler = useCallback(filteredIngredients => {
    dispatch({ type: 'SET', ingredients: filteredIngredients })
  }, [])

  const addIngredientHandler = ingredient => {
    httpDispatch({ type: 'SEND' })
    axios.post('https://applestore-1478e-default-rtdb.firebaseio.com/ingredients.json', {
      id: ingredient.id,
      ...ingredient
    })
      .then(response => {
        httpDispatch({ type: 'RESPONSE' })
        const data = response.data;
        dispatch({ type: 'ADD', ingredient: { id: data.name, ...ingredient } })
      })
      .catch(error => {
        httpDispatch({ type: 'ERROR', errorMessage: 'error!' })
      })
  };

  const removeIngredientHandler = ingredientId => {
    httpDispatch({ type: 'SEND' })
    axios.delete(`https://applestore-1478e-default-rtdb.firebaseio.com/ingredients/${ingredientId}.json`)
      .then(response => {
        httpDispatch({ type: 'RESPONSE' })
        dispatch({ type: 'DELETE', id: ingredientId })
      })
      .catch(error => {
        httpDispatch({ type: 'ERROR', errorMessage: 'error!' })
      })
  };

  const clearError = () => {
    httpDispatch({ type: 'CLEAR' })
  }

  return (
    <>
      {httpState.error && <ErrorModal onClose={clearError}>{httpState.error}</ErrorModal>}
      <IngredientForm
        onAddIngredient={addIngredientHandler}
        loading={httpState.loading}
      />

      <section>
        <Search onLoadIngredients={filteredIngredientsHandler} />
        <IngredientList
          ingredients={userIngredients}
          onRemoveItem={removeIngredientHandler}
        />
      </section>
    </>
  );
};

export default Ingredients;
```


- state > 현재 로컬에 저장된 데이터
- action > state를 업데이트하는 데 사용
- add, delete state
    - case SET > 현재 재료 목록을 새로운 재료 목록이 담긴 배열로 덮어씀
    - case ADD > 현재 배열에 새로운 항목을 추가한 배열을 반환
    action.ingredient > 액션을 통해 값을 받음
    - case DELETE > filter를 사용해 모든 항목의 id와 action의 id를 비교
- http state
    - SEND > 요청만 보냈을 때
    - RESPONSE > 원래 있던 state 값을 가져오고, loading 상태만 덮어쓴다.
    - ERROR > error 메세지
    - CLEAR > error modal close
<br />
<br />


## :speech_balloon: useContext

### 전역으로 사용할 상태 설정 설정

```jsx
import React from 'react';

// 전역으로 사용할 상태값 설정
export const AuthContext = React.createContext({
  isAuth: false, // login state를 관리하는 값
  login: () => {} // 이렇게 먼저 적어두면 자동 완성을 사용할 수 있음
})

// 내용물을 감싸기 위한 컴포넌트
const AuthContextProvider = props => {
  return (
    <AuthContext.Provider>
      {props.children}
    </AuthContext.Provider>
  )
}
```
<br />

### 컴포넌트 감싸기

```jsx
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import AuthContextProvider from './store/authContext'

ReactDOM.render(
  <AuthContextProvider>
    <App />
  </AuthContextProvider>,
  document.getElementById('root')
);
```
<br />

### 하위 컴포넌트에서 불러오기

- 처음 페이지에 접속했을 때 로그인 페이지를, 로그인 한 후에는 메인 페이지 출력
    
    ```jsx
    import React, { useContext } from 'react';
    import Auth from './components/Auth';
    import Ingredients from './components/Ingredients/Ingredients';
    import { AuthContext } from './store/authContext';
    
    const App = props => {
      const authContext = useContext(AuthContext)
    
      let content = <Auth />
      if (authContext.isAuth) {
        content = <Ingredients />
      }
    
      return content;
    };
    
    export default App;
    ```
    

- 로그인 페이지에서 context login 함수 꺼내 쓰기
    
    ```jsx
    import React, { useContext } from 'react';
    import { AuthContext } from '../store/authContext';
    
    const Auth = () => {
      const authContext = useContext(AuthContext)
    
      const loginHandler = () => {
        authContext.login()
      };
    
      return (
        <>
            <p>Please log in to continue.</p>
            <button onClick={loginHandler}>Log In</button>
        </>
      );
    };
    
    export default Auth;
    ```
<br />
<br />


## :speech_balloon: React.memo

컴포넌트를 감싸서 불필요한 리렌더링을 막는다.
보고 있는 프로퍼티가 변경되었을 때 다시 렌더링된다.

```jsx
const ReactMemo = React.memo(props => {
	// code
});
```

- props의 변경 여부를 체크하여 이전 props와 동일한 props가 들어온다면 
컴포넌트 렌더링 과정을 스킵하고 마지막에 렌더링 된 결과를 재사용한다.
<br />

## :speech_balloon: useMemo

어떤 데이터든 저장해 컴포넌트가 렌더링 될 때마다 다시 생성되지 않도록 할 수 있다.
자식 컴포넌트에서 컴포넌트 전체를 감싸 React.memo를 사용하는 방법이 있고,
부모 컴포넌트에서 useMemo를 사용해 return값을 저장할 수 있다.

```jsx
const UseMemo = useMemo(() => {
	return (
		// code
	)
}, [])
```
<br />

### 최적화하기

- useReducer는 기존 state에 직접 접근하지 않고 함수의 인자를 받아 새로운 상태를 반환하기 때문에 매번 상태가 변하는 state에 영향을 받지 않고 callback 함수들을 정의할 수 있게 된다.
- 만약 속성값으로 함수를 자식에게 넘겨줄 경우,
함수는 부모가 렌더링 될 때마다 새로 생성되기 때문에 자식 또한 다시 렌더링된다.
이 경우 useCallback을 사용해 부모에 존재하는 함수를 감싼다.
<br />

### useCallback, useReducer, useMemo를 함께 사용해서 최적화하기 (전체 코드)

```jsx
import axios from 'axios';
import React, { useCallback, useMemo, useReducer } from 'react';
import IngredientForm from './IngredientForm';
import IngredientList from './IngredientList';
import Search from './Search';
import ErrorModal from '../UI/ErrorModal'

const ingredientReducer = (state, action) => {
  switch (action.type) {
    case 'SET':
      return action.ingredients;
    case 'ADD':
      return [...state, action.ingredient]
    case 'DELETE':
      return state.filter(ing => ing.id !== action.id);
    default:
      throw new Error('Should not get there!');
  }
}

const httpReducer = (state, action) => {
  switch (action.type) {
    case 'SEND':
      return { loading: true, error: null }
    case 'RESPONSE':
      return { ...state, loading: false }
    case 'ERROR':
      return { loading: false, error: action.errorMessage }
    case 'CLEAR':
      return { ...state, error: null }
    default:
      throw new Error('Should not get there!');
  }
}

const Ingredients = () => {
  const [userIngredients, dispatch] = useReducer(ingredientReducer, [])
  const [httpState, httpDispatch] = useReducer(httpReducer, { loading: false, error: null })

  const filteredIngredientsHandler = useCallback(filteredIngredients => {
    dispatch({ type: 'SET', ingredients: filteredIngredients })
  }, [])

  const addIngredientHandler = useCallback(ingredient => {
    httpDispatch({ type: 'SEND' })
    axios.post('https://applestore-1478e-default-rtdb.firebaseio.com/ingredients.json', {
      id: ingredient.id,
      ...ingredient
    })
      .then(response => {
        httpDispatch({ type: 'RESPONSE' })
        const data = response.data;
        console.log(data)
        dispatch({ type: 'ADD', ingredient: { id: data.name, ...ingredient } })
      })
      .catch(error => {
        httpDispatch({ type: 'ERROR', errorMessage: 'error!' })
      })
  }, [])

  const removeIngredientHandler = useCallback(ingredientId => {
    httpDispatch({ type: 'SEND' })
    axios.delete(`https://applestore-1478e-default-rtdb.firebaseio.com/ingredients/${ingredientId}.json`)
      .then(response => {
        httpDispatch({ type: 'RESPONSE' })
        dispatch({ type: 'DELETE', id: ingredientId })
      })
      .catch(error => {
        httpDispatch({ type: 'ERROR', errorMessage: 'error!' })
      })
  }, [])

	const clearError = useCallback(() => {
		httpDispatch({ type: 'CLEAR' })
	}, [])

  const ingredientList = useMemo(() => {
    return (
      <IngredientList
        ingredients={userIngredients}
        onRemoveItem={removeIngredientHandler}
      />
    )
  }, [userIngredients, removeIngredientHandler])

  return (
    <>
      {httpState.error && <ErrorModal onClose={clearError}>{httpState.error}</ErrorModal>}
      <IngredientForm
        onAddIngredient={addIngredientHandler}
        loading={httpState.loading}
      />

      <section>
        <Search onLoadIngredients={filteredIngredientsHandler} />
        {ingredientList}
      </section>
    </>
  );
};

export default Ingredients;
```
<br />
<br />

## :speech_balloon: custom hook

### custom hook을 사용하는 이유

로직을 함수로 뽑아내어 재사용할 수 있다.
일반 함수로는 해당 로직을 사용하는 컴포넌트의 state에 영향을 줄 수 없다.


### 조건 및 특징

- 반드시 ‘use’로 시작하는 이름이여야 한다.
- state와 관련된 모든 훅을 사용할 수 있다.
- 커스텀 훅을 사용하는 컴포넌트는 커스텀 훅의 코드를 해당 컴포넌트 안에 있는 것처럼 실행할 수 있다.
- 데이터를 공유하는 것이 아니라 로직을 공유하는 것이다.
