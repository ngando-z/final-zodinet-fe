import { useAppDispatch, useAppSelector } from 'app/hooks';
import { selectorUser, updateIsBank } from 'app/user/userSlice';
import { useState, useLayoutEffect } from 'react';
import * as api from '../../api/index';
import ModalCreateBank from '../user/ModalCreateBank';
import EventDetail from './EventDetail';
// import EventDetail from './EventDetail';

const CreateEvent: React.FC = () => {
  const user = useAppSelector(selectorUser);
  const dispatch = useAppDispatch();

  const [isBankAccount, setIsBankAccount] = useState(false);

  useLayoutEffect(() => {
    const getBank = async (id: string) => {
      try {
        const result = await api.userApi.findBankByUserId(id);
        setIsBankAccount(!!result);
        dispatch(updateIsBank({ isBankAccount: !!result }));
      } catch (error) {
        dispatch(updateIsBank({ isBankAccount: false }));
      }
    };

    getBank(user.id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user.id]);

  return (
    <>
      {!isBankAccount && <ModalCreateBank />}
      {isBankAccount && <EventDetail />}
    </>
  );
};

export default CreateEvent;
