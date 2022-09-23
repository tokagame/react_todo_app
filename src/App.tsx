import { useState } from 'react'
import './App.css'
import { FormDialog } from './FormDialog'
import { TodoItem } from './TodoItem'

export const App = () => {
  const [text, setText] = useState('');
  const [todos, setTodos] = useState<Todo[]>([]);
  const [filter, setFilter] = useState<Filter>('all');

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
      id: new Date().getTime(),
      checked: false,
      removed: false,
    }

    // スプレッド構文を用いて todos ステートのコピーへ newTodo を追加する
    setTodos([newTodo, ...todos]);
    // フォーム欄をクリア
    setText('');
  }

  const handleOnEdit = (id: number, value: string) => {
    const deepCopy = todos.map((todo) => ({ ...todo }));

    const newTodos = deepCopy.map((todo) => {
      if (todo.id === id) {
        todo.value = value;
      }

      return todo;
    })

    setTodos(newTodos);
  }

  const handleOnCheck = (id: number, checked: boolean) => {
    const deepCopy = todos.map((todo) => ({ ...todo }));

    const newTodos = deepCopy.map((todo) => {
      if (todo.id === id) {
        todo.checked = !checked;
      }

      return todo
    })

    setTodos(newTodos)
  }

  const handleOnRemove = (id: number, removed: boolean) => {
    const deepCopy = todos.map((todo) => ({ ...todo }));

    const newTodos = deepCopy.map((todo) => {
      if (todo.id === id) {
        todo.removed = !removed;
      }

      return todo;
    })

    setTodos(newTodos);
  }

  const handleOnEmpty = () => {
    const newTodos = todos.filter((todo) => !todo.removed);
    setTodos(newTodos);
  }

  return (
    <div>
      <FormDialog
        text={text}
        onChange={handleOnChange}
        onSubmit={handleOnSubmit}
      />

      <TodoItem
        todos={todos}
        filter={filter}
        onEdit={handleOnEdit}
        onCheck={handleOnCheck}
        onRemove={handleOnRemove}
      />
    </div>
  )
}