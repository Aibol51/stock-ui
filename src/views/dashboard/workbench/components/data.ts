interface NavItem {
  title: string;
  icon: string;
  color: string;
  redirect?: string;
}

export const navItems: NavItem[] = [
  {
    title: 'routes.system.stock',
    icon: 'ant-design:fire-outlined',
    color: '#bf0c2c',
    redirect: '/stock',
  },
  // {
  //   title: 'routes.system.userManagementTitle',
  //   icon: 'ant-design:user-outlined',
  //   color: '#bf0c2c',
  //   redirect: '/user',
  // },
  // {
  //   title: 'routes.system.roleManagementTitle',
  //   icon: 'eos-icons:role-binding-outlined',
  //   color: '#e18525',
  //   redirect: '/role',
  // },
  // {
  //   title: 'routes.system.menuManagementTitle',
  //   icon: 'ep:menu',
  //   color: '#3fb27f',
  //   redirect: '/menu',
  // },
  // {
  //   title: 'routes.system.apiManagementTitle',
  //   icon: 'ant-design:api-outlined',
  //   color: '#4daf1bc9',
  //   redirect: '/api',
  // },
  // {
  //   title: 'routes.system.dictionaryManagementTitle',
  //   icon: 'ant-design:book-outlined',
  //   color: '#cc00ff',
  //   redirect: '/dictionary',
  // },
  // {
  //   title: 'routes.system.oauthManagement',
  //   icon: 'ant-design:unlock-filled',
  //   color: '#0099ff',
  //   redirect: '/oauth',
  // },
  // {
  //   title: 'routes.system.fileManagementTitle',
  //   icon: 'akar-icons:folder',
  //   color: '#00d8ff',
  //   redirect: '/file',
  // },
];

export const systemInfoData = [
  ['sys.sys.Name', '牛股网后台管理系统'],
  ['sys.sys.version', 'V 1.0'],
];
