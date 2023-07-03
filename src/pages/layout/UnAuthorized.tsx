import { Card, CardContent } from '@/components/ui/card';
import { Outlet } from 'react-router-dom';

const UnAuthorized = () => {
  return (
    <div className="flex h-screen w-screen items-center justify-center bg-slate-900">
      <Card className="h-fit w-2/6 py-2">
        <CardContent>
          <Outlet />
        </CardContent>
      </Card>
    </div>
  );
};

export default UnAuthorized;
