import { Card, CardContent } from '@/components/ui/card';
import { SESSION_STORAGE_KEY } from '@/constants';
import { Outlet, redirect } from 'react-router-dom';

export const loader = () => {
  const token = window?.localStorage.getItem(SESSION_STORAGE_KEY);
  console.log('loader UnAuthorized', token);
  if (token) {
    return redirect('/products');
  }
  return null;
};

const UnAuthorized = () => {
  return (
    <div className="flex h-screen w-screen items-center justify-center bg-slate-100">
      <Card className="h-fit w-10/12 py-2 sm:w-4/6 lg:w-2/6 ">
        <CardContent>
          <Outlet />
        </CardContent>
      </Card>
    </div>
  );
};

export default UnAuthorized;
