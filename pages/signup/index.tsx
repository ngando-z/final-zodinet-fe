import { NextPage } from 'next';
import { useAppSelector } from './../../app/hooks';
import { selectorUser } from './../../app/user/userSlice';
import NotFound from '@/components/common/NotFound/NotFound';
import Signup from '@/components/user/Signup';

const SignupPage: NextPage = () => {
  const user = useAppSelector(selectorUser);

  return user.isLoggedIn ? <NotFound /> : <Signup />;
};

export default SignupPage;
