import { create } from 'zustand';

// ---------------------------------------------------------
// 1. Counter Store 예제
// ---------------------------------------------------------
interface CounterState {
    count: number;
    increase: () => void;
    decrease: () => void;
    reset: () => void;
}

const useCounterStore = create<CounterState>((set) => ({
    count: 0,
    increase: () => set((state) => ({ count: state.count + 1 })),
    decrease: () => set((state) => ({ count: state.count - 1 })),
    reset: () => set({ count: 0 }),
}));

// ---------------------------------------------------------
// 2. User Store 예제
// ---------------------------------------------------------
interface User {
    id: string;
    name: string;
    email?: string;
}

interface UserState {
    user: User | null;
    setUser: (user: User) => void;
    updateUser: (newData: Partial<User>) => void;
    clearUser: () => void;
}

const useUserStore = create<UserState>((set) => ({
    user: null,

    // 1. 통째로 넣기 (로그인 시)
    setUser: (user) => set({ user }),

    // 2. 일부 수정 (프로필 수정 시)
    updateUser: (newData) =>
        set((state) => ({
            user: state.user ? { ...state.user, ...newData } : null
        })),

    // 3. 비우기 (로그아웃 시)
    clearUser: () => set({ user: null }),
}));

// ---------------------------------------------------------
// 3. View: 상태를 사용하는 컴포넌트
// ---------------------------------------------------------
export default function ZustandExample() {
    const { count, increase, decrease, reset } = useCounterStore();
    const { user, setUser, updateUser, clearUser } = useUserStore();

    return (
        <div style={{ fontFamily: 'sans-serif' }}>

            {/* --- Counter 예제 영역 --- */}
            <section style={{ marginBottom: '40px', padding: '20px', border: '1px solid #ccc', borderRadius: '8px' }}>
                <h2>1. Counter Store 테스트</h2>
                <p style={{ fontSize: '20px', fontWeight: 'bold' }}>현재 숫자: {count}</p>
                <div>
                    <button onClick={increase} style={{ marginRight: '8px', padding: '8px 16px' }}>+1 증가</button>
                    <button onClick={decrease} style={{ marginRight: '8px', padding: '8px 16px' }}>-1 감소</button>
                    <button onClick={reset} style={{ padding: '8px 16px' }}>초기화</button>
                </div>
            </section>

            {/* --- User 예제 영역 --- */}
            <section style={{ padding: '20px', border: '1px solid #ccc', borderRadius: '8px' }}>
                <h2>2. User Store 테스트</h2>

                <div style={{ marginBottom: '20px', minHeight: '80px' }}>
                    {user ? (
                        <div style={{ background: '#f0f4f8', padding: '12px', borderRadius: '4px' }}>
                            <p style={{ margin: '4px 0' }}><strong>ID:</strong> {user.id}</p>
                            <p style={{ margin: '4px 0' }}><strong>이름:</strong> {user.name}</p>
                            {user.email && <p style={{ margin: '4px 0' }}><strong>이메일:</strong> {user.email}</p>}
                        </div>
                    ) : (
                        <p style={{ color: '#888' }}>로그인되지 않은 상태입니다.</p>
                    )}
                </div>

                <div>
                    {!user ? (
                        <button
                            onClick={() => setUser({ id: 'user_1', name: '홍길동', email: 'hong@example.com' })}
                            style={{ padding: '8px 16px', background: '#4CAF50', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}
                        >
                            로그인하기 (데이터 넣기)
                        </button>
                    ) : (
                        <>
                            <button
                                onClick={() => updateUser({ name: '홍길동 (이름 수정됨)' })}
                                style={{ marginRight: '8px', padding: '8px 16px', border: '1px solid #ccc', borderRadius: '4px', cursor: 'pointer' }}
                            >
                                이름만 수정하기 (일부 수정)
                            </button>
                            <button
                                onClick={clearUser}
                                style={{ padding: '8px 16px', background: '#f44336', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}
                            >
                                로그아웃 (비우기)
                            </button>
                        </>
                    )}
                </div>
            </section>

        </div>
    );
}
