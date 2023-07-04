import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { QueryClientProvider } from '@tanstack/react-query';
import SignUp, { action as signUpAction } from '@/pages/SignUp';
import Login, { action as loginAction } from '@/pages/Login';
import UnAuthorized, {
  loader as unauthorizedLoader,
} from '@/pages/layout/UnAuthorized';
import Products, { loader as productsLoader } from '@/pages/Products';
import { loader as authenticateLoader } from '@/pages/Authenticate';
import queryClient from './services/queryClient';


const router = createBrowserRouter([
  {
    children: [
      {
        path: '/',
        element: <UnAuthorized />,
        children: [
          {
            element: <SignUp />,
            index: true,
            action: signUpAction,
            loader: unauthorizedLoader,
          },
          {
            path: 'login',
            element: <Login />,
            action: loginAction,
            loader: unauthorizedLoader,
          },
        ],
      },
      {
        loader: authenticateLoader,
        children: [
          { path: 'products', element: <Products />, loader: productsLoader },
        ],
      },
    ],
  },
]);

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />;
    </QueryClientProvider>
  );
}

export default App;
