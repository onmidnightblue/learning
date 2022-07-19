##### table of contents
- [hook](#hook)
  - [정의](#정의)
  - [종류](#종류)
- [useState](#usestate)
  - [문법](#문법)
  - [사용자에게 데이터 받기](#사용자에게-데이터-받기)
  - [부모로 데이터를 올려보내기](#부모로-데이터를-올려보내기)
  - [데이터 가져와서 뿌리기](#데이터-가져와서-뿌리기)
- [props.children](#propschildren)
  - [to use](#to-use)
- [http 통신](#http-통신)
  - [firebase](#firebase)
    - [url 매개변수 필터링](#url-매개변수-필터링)
  - [fetch](#fetch)
    - [get](#get)
    - [post](#post)
    - [delete](#delete)
  - [axios](#axios)
    - [get](#get-1)
    - [post](#post-1)
    - [delete](#delete-1)
- [useEffect](#useeffect)
  - [문법](#문법-1)
  - [http 통신 무한 루프 막기](#http-통신-무한-루프-막기)
- [useCallback](#usecallback)
  - [문법](#문법-2)
  - [useEffect의 의존성 배열로 인한 무한 루프 막기](#useeffect의-의존성-배열로-인한-무한-루프-막기)
  - [loading, error state를 만들어서 UX 상승시키기](#loading-error-state를-만들어서-ux-상승시키기)
  - [error modal](#error-modal)
- [useReducer](#usereducer)
  - [문법](#문법-3)
  - [reducer](#reducer)
  - [action](#action)
  - [dispatch](#dispatch)
  - [전체 코드](#전체-코드)
- [useContext](#usecontext)
  - [전역으로 사용할 상태 설정 설정](#전역으로-사용할-상태-설정-설정)
  - [컴포넌트 감싸기](#컴포넌트-감싸기)
  - [하위 컴포넌트에서 불러오기](#하위-컴포넌트에서-불러오기)
- [React.memo](#reactmemo)
- [useMemo](#usememo)
  - [최적화하기](#최적화하기)
  - [useCallback, useReducer, useMemo를 함께 사용해서 최적화하기 (전체 코드)](#usecallback-usereducer-usememo를-함께-사용해서-최적화하기-전체-코드)
- [custom hook](#custom-hook)
  - [custom hook을 사용하는 이유](#custom-hook을-사용하는-이유)
  - [조건 및 특징](#조건-및-특징)
- [테스트, jest 사용해보기](#테스트-jest-사용해보기)
  - [수동적인 테스팅](#수동적인-테스팅)
  - [자동화된 테스팅](#자동화된-테스팅)
  - [테스트 방법](#테스트-방법)
  - [사용할 수 있는 도구와 설정](#사용할-수-있는-도구와-설정)
  - [App.test.js](#apptestjs)
  - [setupTests.js](#setuptestsjs)
  - [package.json](#packagejson)
  - [하위 컴포넌트의 테스트](#하위-컴포넌트의-테스트)
  - [비동기 코드의 테스트](#비동기-코드의-테스트)
  - [가짜 http 요청을 전송해 테스트하기](#가짜-http-요청을-전송해-테스트하기)
<br />



## hook

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

## useState

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

## props.children

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

## http 통신

### firebase

- 구글이 만들었고, 테스트용 백엔드로 사용할 수 있다.
- url을 입력할 때 제일 마지막에 “.json”을 붙여주어야 한다.
- property 이름으로 ‘name’을 사용한다.
<br />

#### url 매개변수 필터링

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


### fetch

#### get

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

#### post

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

#### delete

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

### axios

#### get

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

#### post

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

#### delete

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


## useEffect

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

## useCallback

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

## useReducer

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


## useContext

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


## React.memo

컴포넌트를 감싸서 불필요한 리렌더링을 막는다.
보고 있는 프로퍼티가 변경되었을 때 다시 렌더링된다.

```jsx
const ReactMemo = React.memo(props => {
	// code
});
```

- props의 변경 여부를 체크하여 이전 props와 동일한 props가 들어온다면 컴포넌트 렌더링 과정을 스킵하고 마지막에 렌더링 된 결과를 재사용한다.
<br />

## useMemo

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

## custom hook

### custom hook을 사용하는 이유

로직을 함수로 뽑아내어 재사용할 수 있다.
일반 함수로는 해당 로직을 사용하는 컴포넌트의 state에 영향을 줄 수 없다.


### 조건 및 특징

- 반드시 ‘use’로 시작하는 이름이여야 한다.
- state와 관련된 모든 훅을 사용할 수 있다.
- 커스텀 훅을 사용하는 컴포넌트는 커스텀 훅의 코드를 해당 컴포넌트 안에 있는 것처럼 실행할 수 있다.
- 데이터를 공유하는 것이 아니라 로직을 공유하는 것이다.
<br />
<br />

## 테스트, jest 사용해보기

### 수동적인 테스팅

코드를 작성해서 특정 속성을 구현하거나 문제를 해결하고 브라우저에서 확인하는 것을 의미한다. 

수동으로는 가능한 모든 조합과 시나리오를 테스트하기 어렵기 때문에 오류 발생이 일어날 가능성이 크다.
<br />
<br />

### 자동화된 테스팅

추가적인 코드를 작성해서 다른 코드를 테스트한다.

- unit Tests (단위 테스트)
    - 애플리케이션의 가장 작은 단위에 대한 테스트를 작성한다.
    - 애플리케이션에서 사용하는 개별 함수들을 테스팅한다.
- integration Tests (통합 테스트)
    - 여러 개의 구성 요소 조합을 테스트한다.
- end-to-end Tests(e2e test, 전 구간 테스트)
    - 전체 워크플로우를 테스트한다.
    - 사용자가 웹 사이트에서 수행하는 작업을 재현하는 것을 목표로 한다.
<br />
<br />

### 테스트 방법

- 무엇을 ?
    - 서로 다른 기본 구성 요소를 테스트한다.
- 어떻게 ?
    - 사용자에게 발생할 수 있는 성공 및 오류 사례를 테스트 한다.
<br />
<br />

### 사용할 수 있는 도구와 설정

- 테스팅 코드를 실행하고 결과를 확인하기 위한 도구
    - jest
- react 앱과 컴포넌트들의 렌더링 시뮬레이팅
    - react testing library

이 두 가지 도구는 CRA로 생성한 리액트 앱에서는 이미 설치 및 설정이 되어 있다.
<br />

<img src="https://s3.us-west-2.amazonaws.com/secure.notion-static.com/86f36d41-8277-4b3c-8a57-35687134b1a2/Untitled.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=AKIAT73L2G45EIPT3X45%2F20220719%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20220719T081648Z&X-Amz-Expires=86400&X-Amz-Signature=763bcd78ad132a5c9e757a6a36ce4ec75d71b4f2d92c7b4f1e9d667696a5a54c&X-Amz-SignedHeaders=host&response-content-disposition=filename%20%3D%22Untitled.png%22&x-id=GetObject">

<img src="https://s3.us-west-2.amazonaws.com/secure.notion-static.com/d690a06c-986a-470e-aa8a-c7f32d5bd683/Untitled.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=AKIAT73L2G45EIPT3X45%2F20220719%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20220719T081704Z&X-Amz-Expires=86400&X-Amz-Signature=8e1f761af2b356008c6829fcb89ac74d4d935e01cffd49dfee1f4190f2f90f4e&X-Amz-SignedHeaders=host&response-content-disposition=filename%20%3D%22Untitled.png%22&x-id=GetObject">
package.json
<br />
<br />

### App.test.js

테스트 코드가 일부 담겨 있으며, 즉시 사용할 수 있다.

App.js를 테스트한다는 의미이다.

다른 파일을 테스트 하고 싶다면 `다른파일.test.js` 이런 식으로 작성하면 된다.

```jsx
import { render, screen } from '@testing-library/react';
import App from './App';

test('renders learn react link', () => {
  render(<App />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});
```

- test 함수는 두 개의 인자를 가진다.
- 첫 번째 인자는 테스트에 대한 설명이고 테스팅 출력 시 테스트를 식별하는 것을 도와준다.
- 두 번째 인자는 실제 테스트 및 코드를 포함하는 익명 함수다.
- `/learn react/i` 대소문자 상관없이 App 컴포넌트에서 learn react이라는 텍스트를 가진 element를 찾으면 테스트는 성공한다.
<br />

```jsx
test('테스트에 대한 설명', 함수 )
```

- 테스트 안의 함수를 작성할 땐 일반적으로 세 가지 과정을 거친다.
    - arrange(준비) > 테스트를 원하는 컴포넌트를 렌더링
    - act(실행) > 버튼 클릭 등을 시뮬레이션
    - assert(단언) > 브라우저에서 예상과 같은지 확인
<br />

```jsx
import { useState } from "react";

const Greeting = () => {
  const [changedText, setChangedText] = useState(false);

  const changeTextHandler = () => {
    setChangedText(true);
  };

  return (
    <div>
      <h3>hello World!</h3>
      {!changedText && <p>see you</p>}
      {changedText && <p>changed!</p>}
      <button onClick={changeTextHandler}>changed</button>
    </div>
  );
};

export default Greeting;
```

```jsx
import { render, screen } from "@testing-library/react";
import Greeting from "./Greeting";
import userEvent from "@testing-library/user-event";

describe("Greeting component", () => {
  test("renders Hello World as a test", () => {
    // Arrange
    render(<Greeting />);

    // Act
    // ... nothing

    // Assert
    const helloWorldElement = screen.getByText("hello World", { exact: false });
    expect(helloWorldElement).toBeInTheDocument();
  });

  test("renders see you as a test", () => {
    render(<Greeting />);
    const seeyouElement = screen.getByText("see you", { exact: false });
    expect(seeyouElement).toBeInTheDocument();
  });

  // 버튼을 클릭했을 때 'changed' 텍스트가 보여야 하는 경우 테스트
  test("button was clicked", () => {
    // Arrange
    render(<Greeting />);

    // Act
    const buttonElement = screen.getByRole("button");
    userEvent.click(buttonElement);

    // Assert
    const changedElement = screen.getByText("changed!");
    expect(changedElement).toBeInTheDocument();
  });

  // 버튼을 클릭했을 때 'see you' 텍스트가 보이지 않아야 하는 경우 테스트
  test("does not render 'see you' button was clicked", () => {
    render(<Greeting />);
    const buttonElement = screen.getByRole("button");
    userEvent.click(buttonElement);
    const changedElement = screen.queryByText("see you", { exact: false });
    expect(changedElement).toBeNull();
  });
});
```

- describe > 비슷한 성격의 test 함수들을 그룹화 할 수 있다.
- screen > 렌더링된 가상 DOM에 접근할 수 있도록 해준다.
- expect > 테스트 결괏값을 전달할 수 있다. 숫자, 문자열 구분 없이 뭐든 될 수 있다.
- toBeInTheDocument() > 문서 안에 있는지 확인한다.
- { exact: false } > 테스트에서는 정확하게 같은 걸 찾는데, 위의 경우에선 느낌표 하나가 다르기 때문에 테스트가 통과되지 않는다. 조금 더 유하게 테스트를 통과시키고 싶을 때 작성하면 된다.
- getByRole : DOM의 엘리먼트를 선택한다.
- userEvent > 실제 화면에서 사용자 이벤트를 작동 시키도록 돕는 객체이다.
- userEvent.click() > click은 요소를 매개변수로 받는다.
- queryByText > 엘리먼트가 찾아지지 않을 경우 null을 반환한다.
- toBeNull > null인지 확인한다.
<br />
<br />

### setupTests.js

설정 작업을 한다.

```tsx
// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import '@testing-library/jest-dom';
```
<br />
<br />

### package.json

test script를 찾을 수 있다.

```jsx
"scripts": {
    "start": "react-scripts start",
    "build": "react-scripts build",
    "test": "react-scripts test",
    "eject": "react-scripts eject"
},
```

- 터미널에 `npm test` 라고 작성하면 이런 화면을 볼 수 있다.
    
  <img src="https://s3.us-west-2.amazonaws.com/secure.notion-static.com/c243a93c-1841-4f35-80f8-a6ac0d26e89b/Untitled.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=AKIAT73L2G45EIPT3X45%2F20220719%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20220719T082107Z&X-Amz-Expires=86400&X-Amz-Signature=0eede58ca689307a74d54febf0c2b0e3e2cae0543d7817aead9c83ac7fbcaa62&X-Amz-SignedHeaders=host&response-content-disposition=filename%20%3D%22Untitled.png%22&x-id=GetObject" />
    
- renders learn react link > 내가 작성했었던 test의 첫 번째 인자이다.
- Test Suites > test.js에서 describe으로 묶었던 test들의 그룹이다.
- Tests > test 함수 각각을 말한다.
- a를 누르면 .test.js로 끝나는 파일을 찾고, 정의된 모든 테스트 함수를 실행한다.
<br />
<br />

### 하위 컴포넌트의 테스트

상태나 별다른 로직이 없는 경우 테스트를 이전과 같이 유지할 수 있다.

그러나 그렇지 않다면 테스트를 분리하는 것이 좋다.
<br />
<br />

### 비동기 코드의 테스트

<img src="https://s3.us-west-2.amazonaws.com/secure.notion-static.com/6d1f17a5-f827-44cc-b732-3256db0b62d8/Untitled.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=AKIAT73L2G45EIPT3X45%2F20220719%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20220719T082150Z&X-Amz-Expires=86400&X-Amz-Signature=873dcb7d9520f99c3492cad7e870a41176f2a328340c0fefb140eae380527152&X-Amz-SignedHeaders=host&response-content-disposition=filename%20%3D%22Untitled.png%22&x-id=GetObject" />

<br />
<br />

```jsx
import { useEffect, useState } from "react";

const Async = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/posts")
      .then((response) => response.json())
      .then((data) => {
        setPosts(data);
      });
  }, []);

  return (
    <div>
      <ul>
        {posts.map((post) => (
          <li key={post.id}>{post.title}</li>
        ))}
      </ul>
    </div>
  );
};

export default Async;
```

```jsx
import { render, screen } from "@testing-library/react";
import Async from "./Async";

describe("Async component", () => {
  test("renders posts if request succeeds", async () => {
    render(<Async />);

    const listItemElements = await screen.findAllByRole("listitem");
    expect(listItemElements).not.toHaveLength(0);
  });
});
```

- 여기서는 queryByText처럼 하나만 선택하는 것을 사용하기 어려운데, li가 하나가 아니라 여러 개이기 때문이다.
- findAllByRole() : find 쿼리들은 프로미스를 반환한다.
    - 첫 번째 인자는 찾을 요소
    - 두 번째 인자는 exact 등을 설정하는 객체
    - 세 번째 인자는 timeout 등을 설정할 수 있는 객체이고, timeout의 default는 1초이다.
    - 프로미스를 반환하기 때문에 async, await을 추가해주어야 한다. 위처럼 작성하면 테스트 러너 jest는 프로미스를(테스트가 끝나기를) 기다린다.
<br />
<br />

### 가짜 http 요청을 전송해 테스트하기
개발 과정에서 테스트를 진행할 때 서버에 http 요청을 전송하진 않는다.

- 많은 네트워크 트래픽을 일으켜서 서버가 과부하될 가능성이 있다.
- 데이터베이스에 테스트로 인한 데이터가 삽입되거나 서버의 내용이 변경될 수 있다.
<br />

위와 같은 이유로 테스트를 작성할 때 보통 진행하는 방식은 두 가지가 있다.

- 요청을 전송하지 않는다.
- 일종의 테스팅 서버로 요청을 전송한다.
<br />

```jsx
import { render, screen } from "@testing-library/react";
import Async from "./Async";

describe("Async component", () => {
  test("renders posts if request succeeds", async () => {
    window.fetch = jest.fn();
    window.fetch.mockResolvedValueOnce({
      json: async () => [{ id: "p1", title: "First post" }],
    });
    render(<Async />);

    const listItemElements = await screen.findAllByRole("listitem");
    expect(listItemElements).not.toHaveLength(0);
  });
});
```

- 내장 fetch 함수를 다른 함수로 덮어씌운다.
- jest 객체는 테스팅 코드 내에서 전역적으로 활용 가능하다.
- fn() > mock 함수(더미 함수)를 만든다.
- mockResolvedValueOnce() > fetch 함수가 호출되었을 때 결정되어야 하는 값을 설정할 수 있게 해준다.
