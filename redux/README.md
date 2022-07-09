## 리덕스를 사용하는 이유

대형 애플리케이션을 구축할 때, 전역 상태를 관리하기 위해 context를 사용할 경우 심하게 중첩된 Provider 코드가 생길 수 있다.

```jsx
return (
	<FirstProvider>
		<SecondProvider>
			<ThirdProvider>
				<Home />
			</ThirdProvider>
		</SecondProvider>
	</FirstProvider>
)
```

큰 컨텍스트 하나에 코드를 몽땅 넣어둘 수도 있는데, 추후 유지하고 관리하기가 어려워질 수 있다는 단점이 있다. 장점은 리덕스보다 가볍다는 것이다.

리덕스를 사용하면 데이터가 자주 변경되는 경우와 유동적인 상태를 관리할 수 있다.

사용자가 어떤 action을 했고, 어떤 데이터가 변경되었는지 기록된다. 개발자는 이전의 상태로 타임리프해 테스트를 해볼 수 있다.

다른 상태관리 라이브러리에는 mobX, recoil 등이 있다.
<br />
<br />

## 리덕스를 사용할 때 지켜야 하는 엄격한 규칙

- 모든 데이터는 텍스트로 설명되어야 한다.
- action은 dispatch에 의해 실행되어야 하고 reducer는 항상 같은 출력을 반환해야 한다.
- store는 오로지 하나다.
- 기존의 객체는 건드리지 않고 새로운 객체를 생성해서 사용하여야 한다.
<br />
<br />

## 작동 방식

component > action > reducer > store > component
<br />

### store

리덕스는 무조건 하나의 저장소를 갖고, 여기에 전체 애플리케이션의 모든 상태를 저장한다.

인증 상태, 테마, 저장하려는 입력 상태 등을 저장한다.
<br />

### component


store에 저장한 데이터를 가져와 컴포넌트 안에서 사용할 수 있고, 데이터가 변경되면 그걸 인지해서 UI를 업데이트한다. 

이걸 위해 컴포넌트는 store를 구독(subscribe)하는데, 저장소가 컴포넌트에게 데이터가 변경되었음을 알리고 필요한 데이터를 건네준다.
<br />

### reducer

저장소에 있는 데이터를 변경하는 것을 담당한다. 입력을 받아 새로운 결과를 뱉어낸다.

바꾸기 전 상태와 action을 받아 새로운 상태 객체를 출력해야 한다.

항상 정확히 같은 출력이 산출되어야 하기 때문에 reducer는 순수한 함수가 되어야 한다.

```jsx
const reducer = (state, action) = {
	if (action.type === 'ADD') {
		return {
			// code
		}
	}
}
```
<br />

### action

component에서 발송(dispatch)된 사용자의 행동을 reducer에게 전달한다.
<br />
<br />

## 설치 및 시작

```jsx
npm i redux // 리액트 뿐만 아니라 자바스크립트에서 다 사용할 수 있다.
npm i react-redux // 리액트 앱과 리덕스 스토어에 접속하게 한다.
npm i @reduxjs/toolkit // react 18보다 낮은 버전에서 사용 가능하다. (선택)
```
<br />

### store 생성 및 reducer에서의 action 함수 정의

action 함수를 정의한 reducer를 생성하고 store에서 reducer를 포인팅시킨다.

```jsx
import { createStore } from 'redux';

// reducer
const counterReducer = (state, action) => {
  if (action.type === 'increment') {
    return {
      counter: state.counter + 1,
    };
  }

  if (action.type === 'incrementByClient') {
    return {
      counter: state.counter + action.payload,
    };
  }

  if (action.type === 'decrement') {
    return {
      counter: state.counter - 1,
    };
  }

  return state;
};

// store
const store = createStore(counterReducer);

export default store;
```
<br />

### store를 react에 제공

export한 store를 provider의 value로 설정해 리덕스 스토어를 제공할 수 있다.

이렇게  `<App />`에 있는 component들은 store에 구독 설정을 하거나 액션을 dispatch 할 수 있게 된다.

```jsx
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { Provider } from 'react-redux';
import store from './store/index';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
    <App />
  </Provider>
);
```
<br />

### component에서 상황에 따라 보낼 action handler 작성

redux 팀이 만든 custom hook인 `useSelector` 를 임포트해 자동으로 store가 관리하는 상태의 일부를 선택할 수 있다.

`useDispatch`를 사용해 store에 대한 action을 보낼 수 있다.

```jsx
import { useSelector, useDispatch } from 'react-redux';

const Counter = () => {

	// 바로 실행할 수 있게끔 상수에 저장한다.
  const dispatch = useDispatch();

	// useSelector로 state를 보내고, 새로운 값을 받아 return해 상수에 저장한다.
  const counter = useSelector(state => state.counter);

  const incrementHandler = () => {
    dispatch({ type: 'increment' });
  };

	const incrementByTenHandler = () => {
    dispatch({ type: 'incrementByClient', amount: 10 }); // { payload: 10 }
  };

  const decrementHandler = () => {
    dispatch({ type: 'decrement' });
  };

  return (
    <main>
      <div>{counter}</div>
      <div>
        <button onClick={incrementHandler}>Increment</button>
				<button onClick={incrementByTenHandler}>Increment by ten</button>
        <button onClick={decrementHandler}>Decrement</button>
      </div>
    </main>
  );
};

export default Counter;
```

- useSelector를 사용하면 redux가 자동으로 구독을 설정한다. 
그러면 리덕스 스토어에서 데이터가 바뀔 때마다 가장 최신의 데이터를 받을 수 있다.
- useDispatch로 type을 선택해 사용할 수도 있고, payload를 추가할 수도 있다.
<br />
<br />

# redux toolkit

redux toolkit에는 이미 redux가 포함되어 있기 때문에 프로젝트에 포함시키지 않아도 괜찮다.

redux store의 환경 설정이 너무 복잡하고, 보일러 플레이트 코드가 너무 많다는 문제로 redux toolkit(RTK)이 나오게 되었다.
<br />

### createSlice

`createSlice` 를 사용해 더 가독성이 좋은 코드를 구현할 수 있다.

`createSlice`는 이름, 초깃값, reducer를 필수로 작성하면 된다.

toolkit의 장점 중 하나는 immer를 내부적으로 사용해서 불변성을 지켜주기 때문에 이전의 원래 상태를 자동으로 복제해 따로 작성해주지 않아도 괜찮다.

```jsx
import { createSlice } from '@reduxjs/toolkit';

const counterSlice = createSlice({
  name: 'counter',
  initialState: { counter: 0 },
  reducers: {
    increment(state) {
      state.counter++;
    },
    decrement(state) {
      state.counter--;
    },
    increase(state, action) {
      state.counter = state.counter + action.payload;
    }
  },
});

// 액션 객체 생성
export const counterActions = counterSlice.actions;

export default counterSlice.reducer;
```
<br />

### configureStore

`configureStore`는 redux의 `createStore`와 동일하게 store을 만든다.

다른 점은 여러 개의 reducer를 하나의 reducer로 쉽게 합칠 수 있다는 것이다.

```jsx
import { configureStore } from '@reduxjs/toolkit';

import counterReducer from './counter';
import authReducer from './auth';

const store = configureStore({
  reducer: { 
		counter: counterReducer, 
		auth: authReducer 
	},
	middleware: [...middlewares], 
	devTools: process.env.NODE_ENV !== 'production',
});

export default store;
```
<br />

### component에서 사용

```jsx
import { useSelector, useDispatch } from 'react-redux';
import { counterActions } from '../store/counter';

const Counter = () => {
  const dispatch = useDispatch();
  const counter = useSelector((state) => state.counter.counter); // state.counter는 store의 reducer에서 내가 정의한 이름

  const incrementHandler = () => {
    dispatch(counterActions.increment());
  };

  const increaseHandler = () => {
    dispatch(counterActions.increase(10)); // { payload: 10 }
  };

  const decrementHandler = () => {
    dispatch(counterActions.decrement());
  };

  return (
    <main>
      {show && <div>{counter}</div>}
      <div>
        <button onClick={incrementHandler}>Increment</button>
        <button onClick={increaseHandler}>Increase by 10</button>
        <button onClick={decrementHandler}>Decrement</button>
      </div>
    </main>
  );
};

export default Counter;
```
<br />

### combineReducer가 아닌 configureStore를 사용하는 이유

기존 리덕스에서 사용하는 `combineReducer`도 여러 개의 reducer를 하나로 합칠 수 있다.

`configureStore`는 Redux 라이브러리의 `createStore` 와 `combineReducers` 를 감싸고,

대부분의 저장소 설정을 자동으로 처리한다.

`configureStore` 는 store의 생성과 여러 개의 reducer를 합친다는 두 가지 모두를 한 번에 구현할 수 있다.

- combineReducers
    
    ```jsx
    import { combineReducers } from 'redux'
    import todos from './todos'
    import counter from './counter'
    
    export default combineReducers({
      todos,
      counter
    })
    ```

<br />
<br />

# redux에서의 http 통신


### 문제점

store에서 사용하는 reducer는 순수한 함수여야 한다는 조건이 있다.

그래서 side effect가 있는 경우거나 http 요청을 보내야 하는데, 이러한 코드는 리듀서 함수에 들어갈 수 없다.
<br />

### 해결할 수 있는 두 가지 방법

1. redux를 무시하고 컴포넌트 안에서 useEffect 를 사용해 실행한다.
2. action creator를 생성해 실행한다.
<br />

### 코드를 어디에 두어야 더 효율적인가 ?


- fat reducer
- fat component
- fat work

동기식이면서 side effect가 없는 코드 > fat reducer

비동기식이면서 side effect가 있는 코드 > fat component or action creators
<br />

### 작성 방법

늘 쓰던 것과 같이 사용하면 된다.

http 통신의 로딩, 성공, 실패를 나타내는 notification 상태를 하나 만들었다.

```jsx
import { createSlice } from "@reduxjs/toolkit";

const uiSlice = createSlice({
  name: "ui",
  initialState: { cartIsVisible: false, notification: null },
  reducers: {
    toggle(state) {
      state.cartIsVisible = !state.cartIsVisible;
    },
    showNotification(state, action) {
      state.notification = {
        status: action.payload.status,
        title: action.payload.title,
        message: action.payload.message,
      };
    },
  },
});

export const uiActions = uiSlice.actions;

export default uiSlice;
```

```jsx
useEffect(() => {
    const sendCartData = async () => {

			// redux slice에서 showNotification를 사용해 메세지를 전달한다. 여긴 loading
      dispatch(
        uiActions.showNotification({
          status: "pending",
          title: "sending...",
          message: "sending cart data",
        })
      );
      const response = await fetch(
        "https://redux-start-4c276-default-rtdb.firebaseio.com/cart.json",
        {
          method: "PUT",
          body: JSON.stringify(cart),
        }
      );

      if (!response.ok) {
        throw new Error("sending cart data failed.");
      }
			
			// success
      dispatch(
        uiActions.showNotification({
          status: "success",
          title: "success!",
          message: "sending cart data successfully",
        })
      );
    };

    if (isInitial) {
      isInitial = false;
      return;
    }

    sendCartData().catch((error) => {

			// error
      dispatch(
        uiActions.showNotification({
          status: "error",
          title: "error!",
          message: "sending cart data failed",
        })
      );
    });
  }, [cart, dispatch]);
```
<br />

### thunk

액션 객체가 아닌 함수를 디스패치 할 수 있다.

```jsx
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import Cart from "./components/Cart/Cart";
import Layout from "./components/Layout/Layout";
import Products from "./components/Shop/Products";
import Notification from "./components/UI/Notification";
import { fetchCartData, sendCartData } from "./store/cart-actions";

let isInitial = true;

function App() {
  const dispatch = useDispatch();
  const showCart = useSelector((state) => state.ui.cartIsVisible);
  const cart = useSelector((state) => state.cart);
  const notification = useSelector((state) => state.ui.notification);

  useEffect(() => {
    dispatch(fetchCartData());
  }, [dispatch]);

  useEffect(() => {
    if (isInitial) {
      isInitial = false;
      return;
    }

    if (cart.changed) {
      dispatch(sendCartData(cart));
    }
  }, [cart, dispatch]);

  return (
    <>
      {notification && (
        <Notification
          status={notification.status}
          title={notification.title}
          message={notification.message}
        />
      )}
      <Layout>
        {showCart && <Cart />}
        <Products />
      </Layout>
    </>
  );
}

export default App;
```

```jsx
import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    items: [],
    totalQuantity: 0,
    changed: false,
  },
  reducers: {
    replaceCart(state, action) {
      state.totalQuantity = action.payload.totalQuantity;
      state.items = action.payload.items;
    },
    addItemToCart(state, action) {
      const newItem = action.payload;
      const existingItem = state.items.find((item) => item.id === newItem.id);
      state.totalQuantity++;
      state.changed = true;
      if (!existingItem) {
        state.items.push({
          id: newItem.id,
          price: newItem.price,
          quantity: 1,
          totalPrice: newItem.price,
          name: newItem.title,
        });
      } else {
        existingItem.quantity++;
        existingItem.totalPrice = existingItem.totalPrice + newItem.price;
      }
    },
    removeItemFromCart(state, action) {
      const id = action.payload;
      const existingItem = state.items.find((item) => item.id === id);
      state.totalQuantity--;
      state.changed = true;
      if (existingItem.quantity === 1) {
        state.items = state.items.filter((item) => item.id !== id);
      } else {
        existingItem.quantity--;
        existingItem.totalPrice = existingItem.totalPrice - existingItem.price;
      }
    },
  },
});

export const cartActions = cartSlice.actions;

export default cartSlice;
```

```jsx
import { uiActions } from "./ui-slice";
import { cartActions } from "./cart-slice";

export const fetchCartData = () => {
  return async (dispatch) => {
    const fetchData = async () => {
      const response = await fetch(
        "https://redux-start-4c276-default-rtdb.firebaseio.com/cart.json"
      );

      if (!response.ok) {
        throw new Error("Could not fetch cart data!");
      }

      const data = await response.json();

      return data;
    };

    try {
      const cartData = await fetchData();
      dispatch(
        cartActions.replaceCart({
          items: cartData.items || [],
          totalQuantity: cartData.totalQuantity,
        })
      );
    } catch (error) {
      dispatch(
        uiActions.showNotification({
          status: "error",
          title: "Error!",
          message: "Fetching cart data failed!",
        })
      );
    }
  };
};

export const sendCartData = (cart) => {
  return async (dispatch) => {
    dispatch(
      uiActions.showNotification({
        status: "pending",
        title: "Sending...",
        message: "Sending cart data!",
      })
    );

    const sendRequest = async () => {
      const response = await fetch(
        "https://redux-start-4c276-default-rtdb.firebaseio.com/cart.json",
        {
          method: "PUT",
          body: JSON.stringify({
            items: cart.items,
            totalQuantity: cart.totalQuantity,
          }),
        }
      );

      if (!response.ok) {
        throw new Error("Sending cart data failed.");
      }
    };

    try {
      await sendRequest();

      dispatch(
        uiActions.showNotification({
          status: "success",
          title: "Success!",
          message: "Sent cart data successfully!",
        })
      );
    } catch (error) {
      dispatch(
        uiActions.showNotification({
          status: "error",
          title: "Error!",
          message: "Sending cart data failed!",
        })
      );
    }
  };
};
```
