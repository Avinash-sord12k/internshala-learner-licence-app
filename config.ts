import {
  DashboardCustomizeOutlined,
  SupervisedUserCircleOutlined,
  Assignment,
  AccountCircleOutlined,
} from '@mui/icons-material';
import SchoolOutlinedIcon from '@mui/icons-material/SchoolOutlined';

export default {
  Appname: "Learn To Drive",
  PublicPageAppbarLinks: [
    {
      title: 'Home',
      url: '/',
    },
    {
      title: 'About',
      url: '/about',
    },
    {
      title: 'Contact',
      url: '/contact',
    },
    {
      title: 'Login',
      url: '/login',
    },
    {
      title: 'Register',
      url: '/register',
    },
  ],
  AdminPages: [
    {
      title: 'Admin Dashboard',
      icon: DashboardCustomizeOutlined,
      url: '/admin',
    },
    {
      title: 'Users',
      icon: SupervisedUserCircleOutlined,
      url: '/admin/users',
    },
    {
      title: 'Create Test',
      icon: Assignment,
      url: '/admin/create-test',
    },
    {
      title: 'Profile',
      icon: AccountCircleOutlined,
      url: '/admin/profile',
    }
  ],
  UserPages: [
    {
      title: 'User Dashboard',
      icon: DashboardCustomizeOutlined,
      url: '/dashboard',
    },
    {
      title: 'Tests',
      icon: SchoolOutlinedIcon,
      url: '/dashboard/tests',
    },
    {
      title: 'Results',
      icon: Assignment,
      url: '/dashboard/results',
    },
    {
      title: 'Profile',
      icon: AccountCircleOutlined,
      url: '/dashboard/profile',
    }
  ]
}