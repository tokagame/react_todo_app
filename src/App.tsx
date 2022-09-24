import { useState } from 'react'
import './App.css'

import GlobalStyles from '@mui/material/GlobalStyles'
import { createTheme, ThemeProvider } from '@mui/material/styles'
import { indigo, pink } from '@mui/material/colors'

import { FormDialog } from './FormDialog'
import { TodoItem } from './TodoItem'
import { ToolBar } from './ToolBar';
import { SideBar } from './SideBar';
import { QR } from './QR';
import { AlertDialog } from './AlertDialog';
import { ActionButton } from './ActionButton';

const theme = createTheme({
  palette: {
    primary: {
      main: indigo[500],
      light: '#757de8',
      dark: '#002984',
    },
    secondary: {
      main: pink[500],
      light: '#ff6090',
      dark: '#b0003a',
    },
  }
})

export const App = (): JSX.Element => {
  const [text, setText] = useState('');
  const [todos, setTodos] = useState<Todo[]>([]);
  const [filter, setFilter] = useState<Filter>('all');

  const [drawerOpen, setDrawerOpen] = useState(false);
  const [qrOpen, setQrOpen] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [alertOpen, setAlertOpen] = useState(false);

  const onToggleQR = () => setQrOpen(!qrOpen);
  const onToggleDrawer = () => setDrawerOpen(!drawerOpen);
  const onToggleDialog = () => {
    setDialogOpen(!dialogOpen);
    setText('');
  }
  const onToggleAlert = () => setAlertOpen(!alertOpen);

  const handleOnChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setText(e.target.value);
  }

  // toods ステートを更新
  const handleOnSubmit = () => {
    if (!text) {
      // テキスト欄への入力が無い
      setDialogOpen(false);
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
    setDialogOpen(false);
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

  const handleOnSort = (filter: Filter) => {
    setFilter(filter);
  }


  return (
    <ThemeProvider theme={theme}>
      <GlobalStyles styles={{ body: { margin: 0, padding: 0 } }} />
      <ToolBar
        filter={filter}
        onToggleDrawer={onToggleDrawer}
      />

      <SideBar
        drawerOpen={drawerOpen}
        onSort={handleOnSort}
        onToggleDrawer={onToggleDrawer}
        onToggleQR={onToggleQR}
      />

      <QR
        open={qrOpen}
        onClose={onToggleQR}
      />

      <FormDialog
        text={text}
        onChange={handleOnChange}
        onSubmit={handleOnSubmit}
        dialogOpen={dialogOpen}
        onToggleDialog={onToggleDialog}
      />

      <AlertDialog
        alertOpen={alertOpen}
        onEmpty={handleOnEmpty}
        onToggleAlert={onToggleAlert}
      />

      <TodoItem
        todos={todos}
        filter={filter}
        onEdit={handleOnEdit}
        onCheck={handleOnCheck}
        onRemove={handleOnRemove}
      />

      <ActionButton
        todos={todos}
        filter={filter}
        alertOpen={alertOpen}
        dialogOpen={dialogOpen}
        onToggleAlert={onToggleAlert}
        onToggleDialog={onToggleDialog}
      />
    </ThemeProvider>
  )
}