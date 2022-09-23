import List from '@mui/material/List';
import Avatar from '@mui/material/Avatar';
import Drawer from '@mui/material/Drawer';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';

import DeleteIcon from '@mui/icons-material/Delete';
import SubjectIcon from '@mui/icons-material/Subject';
import CreateIcon from '@mui/icons-material/CreateRounded';
import CheckCircleIcon from '@mui/icons-material/CheckCircleOutline';
import RadioButtonUncheckedIcon from '@mui/icons-material/RadioButtonUnchecked';


import { styled } from '@mui/material/styles'
import { indigo, lightBlue, pink } from '@mui/material/colors'

import pkg from '../package.json';

type Props = {
  drawerOpen: boolean;
  onToggleDrawer: () => void;
  onSort: (filter: Filter) => void;
}

const DrawerList = styled('div')(() => ({
  width: 250,
}))

const DrawerHeader = styled('div')(() => ({
  height: 150,
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  padding: '1em',
  backgroundColor: indigo[500],
  color: '#ffffff',
  fontFamily: '-apple-system, BlinkMacSystemFont, Roboto, sans-serif',
}));

const DrawerAvatar = styled(Avatar)(({ theme }) => ({
  backgroundColor: pink[500],
  width: theme.spacing(6),
  height: theme.spacing(6),
}))

const IconCompleted = styled(CheckCircleIcon)(() => ({
  color: pink.A200,
}));

const IconUnChecked = styled(RadioButtonUncheckedIcon)(() => ({
  color: lightBlue[500],
}))

export const SideBar = (props: Props) => {
  return (
    <Drawer
      variant="temporary"
      open={props.drawerOpen}
      onClose={props.onToggleDrawer}
    >
      <DrawerList
        role="presentation"
        onClick={props.onToggleDrawer}
      >
        <DrawerHeader>
          <DrawerAvatar>
            <CreateIcon />
          </DrawerAvatar>
          <p>TODO v{pkg.version}</p>
        </DrawerHeader>

        <List>
          <ListItem
            button
            onClick={() => props.onSort('all')}
            alia-label="all"
          >
            <ListItemIcon>
              <SubjectIcon />
            </ListItemIcon>
            <ListItemText secondary="全てのタスク" />
          </ListItem>

          <ListItem
            button
            onClick={() => props.onSort('unchecked')}
            alia-label="incomplete"
          >
            <ListItemIcon>
              <SubjectIcon />
            </ListItemIcon>
            <ListItemText secondary="現在のタスク" />
          </ListItem>

          <ListItem
            button
            onClick={() => props.onSort('checked')}
            alia-label="checked"
          >
            <ListItemIcon>
              <SubjectIcon />
            </ListItemIcon>
            <ListItemText secondary="完了したのタスク" />
          </ListItem>

          <ListItem
            button
            onClick={() => props.onSort('removed')}
            alia-label="removed"
          >
            <ListItemIcon>
              <SubjectIcon />
            </ListItemIcon>
            <ListItemText secondary="ごみ箱" />
          </ListItem>
          <Divider />
        </List>
      </DrawerList>
    </Drawer>
  )
}
