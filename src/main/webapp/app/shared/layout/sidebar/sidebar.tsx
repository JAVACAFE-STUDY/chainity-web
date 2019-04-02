import React from 'react';
import List from '@material-ui/core/List';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import AnnounceIcon from '@material-ui/icons/Announcement';
import AssessmentIcon from '@material-ui/icons/Assessment';
import SortIcon from '@material-ui/icons/Sort';
import FaceIcon from '@material-ui/icons/Face';
import PanTool from '@material-ui/icons/PanTool';
import CompareArrows from '@material-ui/icons/CompareArrows';
import UpdateIcon from '@material-ui/icons/Update';
import Divider from '@material-ui/core/Divider';
import ListItemLink from 'app/shared/layout/sidebar/list-item-link';

// Material UI Icon list - https://material.io/tools/icons/?icon=announcement&style=baseline

class Sidebar extends React.Component {
  render() {
    return (
      <div>
        <List>
          <ListItemLink button key={'announce'} to={'/announce'}>
            <ListItemIcon>
              <AnnounceIcon />
            </ListItemIcon>
            <ListItemText primary={'공지사항'} />
          </ListItemLink>
        </List>
        <Divider />
        <List>
          <ListItemLink button key={'event'} to={'/event'}>
            <ListItemIcon>
              <AssessmentIcon />
            </ListItemIcon>
            <ListItemText primary={'이벤트'} />
          </ListItemLink>
          <ListItemLink button key={'rank'} to={'/rank'}>
            <ListItemIcon>
              <SortIcon />
            </ListItemIcon>
            <ListItemText primary={'랭킹'} />
          </ListItemLink>
          <ListItemLink button key={'profile'} to={'/profile'}>
            <ListItemIcon>
              <FaceIcon />
            </ListItemIcon>
            <ListItemText primary={'프로필'} />
          </ListItemLink>
        </List>
        <Divider />
        <List>
          <ListItemLink button key={'hello'} to={'/demo/hello'}>
            <ListItemIcon>
              <PanTool />
            </ListItemIcon>
            <ListItemText primary={'Hello world'} />
          </ListItemLink>
          <ListItemLink button key={'sendProps'} to={'/demo/sendProps'}>
            <ListItemIcon>
              <CompareArrows />
            </ListItemIcon>
            <ListItemText primary={'send props'} />
          </ListItemLink>
          <ListItemLink button key={'sendState'} to={'/demo/sendState'}>
            <ListItemIcon>
              <UpdateIcon />
            </ListItemIcon>
            <ListItemText primary={'state 작업중'} />
            {/*<ListItemText primary={'send State'} />*/}
          </ListItemLink>
        </List>
      </div>
    );
  }
}

export default Sidebar;
