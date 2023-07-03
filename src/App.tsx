import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import SignUp, { action as signUpAction } from '@/pages/SignUp';
import Login from '@/pages/Login';
import UnAuthorized from './pages/layout/UnAuthorized';

const router = createBrowserRouter([
  {
    path: '/',
    element: <UnAuthorized />,
    children: [
      { element: <SignUp />, index: true, action: signUpAction },
      { path: 'login', element: <Login /> },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
