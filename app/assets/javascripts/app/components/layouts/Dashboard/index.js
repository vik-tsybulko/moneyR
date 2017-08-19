import React, { Component } from "react";
import { Grid, Row, Col } from 'react-bootstrap';
import {AppBar, Drawer, MenuItem, IconButton} from 'material-ui';
import { logout } from '../../../services/sessions';
import { LogoutIcon, DashboardIcon, EmailSettingsIcon } from '../../common/icons';
import { ActionOpenInNew } from 'material-ui/svg-icons';

class HomePage extends Component {
  state = { open: false };

  handleToggle = () => this.setState({open: !this.state.open});

  render() {
    return (
        <div className="dashboard-page">
          <AppBar title="Urhqbackend"
                  onLeftIconButtonTouchTap={ this.handleToggle }
                  iconElementRight={<IconButton onTouchTap={logout}><LogoutIcon /></IconButton>}

          />
          <Drawer
            docked={false}
            width={300}
            open={this.state.open}
            onRequestChange={(open) => this.setState({open})}
          >
            <MenuItem onTouchTap={this.handleToggle} href='#/' leftIcon={<DashboardIcon />}>
              Dashboard
            </MenuItem>
            <MenuItem onTouchTap={this.handleToggle} href='#/email_sender' leftIcon={<EmailSettingsIcon />}>
              Email Settings
            </MenuItem>
            {/*generated routes:*/}
            <MenuItem onTouchTap={this.handleToggle} href='#/activities' leftIcon={<ActionOpenInNew />}>
              Activities
            </MenuItem>
            <MenuItem onTouchTap={this.handleToggle} href='#/athlets'>
              Athlets
            </MenuItem>
            <MenuItem onTouchTap={this.handleToggle} href='#/admins'>
              Admins
            </MenuItem>
          </Drawer>
          <Grid>
            <Row>
              <Col md={12}>
                <br/>
                {this.props.children}
              </Col>
            </Row>
          </Grid>
        </div>
    );
  }

}

export default HomePage;
