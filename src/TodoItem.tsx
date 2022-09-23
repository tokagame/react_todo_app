type Props = {
  todos: Todo[];
  filter: Filter;
  onEdit: (id: number, text: string) => void;
  onCheck: (id: number, checked: boolean) => void;
  onRemove: (id: number, removed: boolean) => void;
};

export const TodoItem = (props: Props) => {
  const filtereTodos = props.todos.filter((todo) => {
    switch (props.filter) {
      case 'all':
        return !todo.removed;
      case 'checked':
        return todo.checked && !todo.removed;
      case 'unchecked':
        return !todo.checked && !todo.removed;
      case 'removed':
        return todo.removed;
      default:
        return todo;
    }
  });

  return (
    <ul>
      {filtereTodos.map((todo) => {
        return (
          <li key={todo.id}>
            <input
              type="checkbox"
              disabled={todo.removed}
              checked={todo.checked}
              onChange={() => props.onCheck(todo.id, todo.checked)}
            />
            <input
              type="text"
              disabled={todo.checked || todo.removed}
              value={todo.value}
              onChange={(e) => props.onEdit(todo.id, e.target.value)}
            />
            <button onClick={() => props.onRemove(todo.id, todo.removed)}>
              {todo.removed ? '復元' : '削除'}
            </button>
          </li>
        );
      })}
    </ul>
  );
};