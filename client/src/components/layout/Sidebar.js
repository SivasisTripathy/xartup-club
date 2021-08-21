import React from 'react';
import { slide as Menu } from 'react-burger-menu';

const Sidebar = (props) => {
  return (
    <Menu>
      <a className="menu-item" href="/">
        Feed
      </a>
      <a className="menu-item" href="/commingsoon">
        Weekend Mentoring
      </a>
      <a className="menu-item" href="/commingsoon">
        Fellows Profile
      </a>
      <a className="menu-item" href="/commingsoon">
        Company Profiles
      </a>
      <a className="menu-item" href="/commingsoon">
        Current Ranking
      </a>
      <a className="menu-item" href="/commingsoon">
        Build MVP
      </a>
      <a className="menu-item" href="/about">
        About
      </a>
    </Menu>
  );
};

export default Sidebar;