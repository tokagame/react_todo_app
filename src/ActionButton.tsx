import Fab from '@mui/material/Fab';
import CreateIcon from '@mui/icons-material/CreateRounded';
import DeleteIcon from '@mui/icons-material/DeleteRounded';

import { styled } from '@mui/material/styles';

type Props = {
  alertOpen: boolean;
  dialogOpen: boolean;
  todos: Todo[];
  filter: Filter;
  onToggleAlert: () => void;
  onToggleDialog: () => void;
}

const FabButton = styled(Fab)({
  position: 'fixed',
  right: 15,
  bottom: 15,
})

export const ActionButton = (props: Props) => {
  const removed = props.todos.filter((todo) => todo.removed).length !== 0

  return (
    <>
      {props.filter === 'removed' ? (
        <FabButton
          aria-label="delete-button"
          color="secondary"
          onClick={props.onToggleAlert}
          disabled={!removed || props.alertOpen}
        >
          <DeleteIcon />
        </FabButton>
      ) : (
        <FabButton
          aria-label="add-button"
          color="secondary"
          onClick={props.onToggleDialog}
          disabled={props.filter === 'checked' || props.dialogOpen}
        >
          <CreateIcon />
        </FabButton>
      )}
    </>
  )
}

