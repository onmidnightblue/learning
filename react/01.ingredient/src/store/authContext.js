import React, { useState } from 'react';

// 전역으로 사용할 상태값 설정
export const AuthContext = React.createContext({
  isAuth: false, // login state를 관리하는 값
  login: () => { } // 이렇게 먼저 적어두면 자동 완성을 사용할 수 있음
})

// 내용물을 감싸기 위한 컴포넌트
const AuthContextProvider = props => {
  const [isAuthenticated, setIsAuthenticated] = useState(false)

  const loginHandler = () => {
    setIsAuthenticated(true)
  }

  return (
    <AuthContext.Provider
      value={{ login: loginHandler, isAuth: isAuthenticated }}
    >
      {props.children}
    </AuthContext.Provider>
  )
}

export default AuthContextProvider
