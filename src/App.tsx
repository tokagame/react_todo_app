import React, { useState } from 'react'
import './App.css'

type Todo = {
  value: string;
}

export const App = () => {
  const [text, setText] = useState('');
  const [todos, setTodos] = useState<Todo[]>([]);

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setText(e.target.value);
  }

  // toods ステートを更新
  const handleOnSubmit = () => {
    if (!text) {
      // テキスト欄への入力が無い
      return ;
    }

    const newTodo: Todo = {
      value: text,
    }

    // スプレッド構文を用いて todos ステートのコピーへ newTodo を追加する
    setTodos([newTodo, ...todos]);
    // フォーム欄をクリア
    setText('');
  }

  return (
    <div>
      <form onSubmit={(e) => handleOnSubmit()}>
        <input
          type="text"
          value={text}
          onChange={(e) => handleOnChange(e)}
        />
        <input
          type="submit"
          value="追加"
          onSubmit={handleOnSubmit}
        />
      </form>
    </div>
  )
}