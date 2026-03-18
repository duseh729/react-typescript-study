import { useState } from 'react';
import ContextApiExample from './examples/ContextApiExample';
import ZustandExample from './examples/ZustandExample';

type ExampleType = 'zustand' | 'context';

function App() {
  const [currentExample, setCurrentExample] = useState<ExampleType>('zustand');

  return (
    <div style={{ maxWidth: '800px', margin: '0 auto', padding: '20px' }}>
      <h1>React 상태 관리 학습 📚</h1>

      {/* 탭 네비게이션 */}
      <nav style={{ marginBottom: '30px', borderBottom: '2px solid #eee', paddingBottom: '10px' }}>
        <button
          onClick={() => setCurrentExample('zustand')}
          style={{
            fontSize: '16px', padding: '10px 20px', cursor: 'pointer', marginRight: '10px',
            backgroundColor: currentExample === 'zustand' ? '#3b82f6' : '#f3f4f6',
            color: currentExample === 'zustand' ? 'white' : 'black',
            border: 'none', borderRadius: '4px'
          }}
        >
          🐻 Zustand 예제
        </button>
        <button
          onClick={() => setCurrentExample('context')}
          style={{
            fontSize: '16px', padding: '10px 20px', cursor: 'pointer',
            backgroundColor: currentExample === 'context' ? '#3b82f6' : '#f3f4f6',
            color: currentExample === 'context' ? 'white' : 'black',
            border: 'none', borderRadius: '4px'
          }}
        >
          ⚛️ Context API 예제
        </button>
      </nav>

      {/* 현재 선택된 예제 렌더링 */}
      <main>
        {currentExample === 'zustand' && <ZustandExample />}
        {currentExample === 'context' && <ContextApiExample />}
      </main>

    </div>
  );
}

export default App;