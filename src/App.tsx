import React, { createContext, useContext, useMemo, useState } from 'react';

// 1. 방송국 만들기 (기본값은 0)
const CounterContext = createContext(0);

// 2. 소비하는 자식 (중간 컴포넌트를 건너뜀)
function Display() {
  console.log("여기는 Display");
  // 부모를 타고 올라가서 가장 가까운 Provider의 값을 가져옴
  const count = useContext(CounterContext);
  return <h1>카운트: {count}</h1>;
}

// 3. Display를 감싸는 중간 컴포넌트
// props 전달이 필요 없음
// context를 사용하지 않아도 재렌더링 됨.
// 부모의 상태가 바뀌면서 자식이 재렌더링됨.
// function Middle() {
//   console.log("여기는 Middle");
//   return (
//     <>
//       <Display />
//     </>
//   )
// }

// ------------------------------
// ------React.memo로 감싸기------
// ------------------------------
// React.memo로 감싸면 props가 변경되지 않았을 때 재렌더링을 하지 않음.
const Middle = React.memo(function Middle() {
  console.log("여기는 Middle");
  return (
    <>
      <Display />
    </>
  );
});

// 4. 전체를 감싸는 부모 (Provider)
export default function App() {
  const [count, setCount] = useState(0);

  // useMemo를 사용하는 방법.
  const memoizedMiddle = useMemo(() => <Middle />, []);

  return (
    // value에 담긴 데이터가 하위 트리 전체에 공유됨
    <CounterContext.Provider value={count}>
      <div style={{ border: '1px solid black', padding: '20px' }}>
        <button onClick={() => setCount(count + 1)}>증가</button>
        {/* 중간에 Display를 감싸는 다른 컴포넌트가 있어도 props 전달이 필요 없음 */}
        <Middle />
        {/* useMemo를 사용하는 방법 */}
        {memoizedMiddle}
      </div>
    </CounterContext.Provider>
  );
}