// @flow
import * as React from 'react';
import { observer, inject } from 'mobx-react';
import {
  ProfileIcon,
  SettingsIcon,
  CodeIcon,
  UserIcon,
  LinkIcon,
  TeamIcon,
} from 'outline-icons';

import Flex from 'shared/components/Flex';
import Sidebar, { Section } from './Sidebar';
import Scrollable from 'components/Scrollable';
import Header from './components/Header';
import SidebarLink from './components/SidebarLink';
import HeaderBlock from './components/HeaderBlock';
import AuthStore from 'stores/AuthStore';

type Props = {
  history: Object,
  auth: AuthStore,
};

@observer
class SettingsSidebar extends React.Component<Props> {
  returnToDashboard = () => {
    this.props.history.push('/');
  };

  render() {
    const { team, user } = this.props.auth;
    if (!team || !user) return;

    return (
      <Sidebar>
        <HeaderBlock
          subheading="◄ Return to App"
          teamName={team.name}
          logoUrl={team.avatarUrl}
          onClick={this.returnToDashboard}
        />

        <Flex auto column>
          <Scrollable shadow>
            <Section>
              <Header>Account</Header>
              <SidebarLink to="/settings" icon={<ProfileIcon />}>
                Profile
              </SidebarLink>
              <SidebarLink to="/settings/tokens" icon={<CodeIcon />}>
                API Tokens
              </SidebarLink>
            </Section>
            <Section>
              <Header>Team</Header>
              {user.isAdmin && (
                <SidebarLink to="/settings/details" icon={<TeamIcon />}>
                  Details
                </SidebarLink>
              )}
              <SidebarLink to="/settings/people" icon={<UserIcon />}>
                People
              </SidebarLink>
              <SidebarLink to="/settings/shares" icon={<LinkIcon />}>
                Share Links
              </SidebarLink>
              {user.isAdmin && (
                <SidebarLink
                  to="/settings/integrations/slack"
                  icon={<SettingsIcon />}
                >
                  Integrations
                </SidebarLink>
              )}
            </Section>
          </Scrollable>
        </Flex>
      </Sidebar>
    );
  }
}

export default inject('auth')(SettingsSidebar);
