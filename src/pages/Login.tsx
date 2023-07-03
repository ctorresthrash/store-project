import {
  ActionFunctionArgs,
  Form,
  Link,
  redirect,
  useActionData,
  useSubmit,
} from 'react-router-dom';
import * as z from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Heading } from '@/components/ui/heading';
import { Button } from '@/components/ui/button';
import {
  Form as StateForm,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { createSession } from '@/services/api';
import { SESSION_STORAGE_KEY } from '@/constants';
import { AxiosError } from 'axios';
import { isErrorResponse } from '@/types/typeGuards';

const schema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});


export const action = async ({
  request,
}: ActionFunctionArgs) => {
  try {
    const formData = await request.formData();
    const data = Object.fromEntries(formData) as z.infer<typeof schema>;
    const token = await createSession(data);
    window?.localStorage.setItem(SESSION_STORAGE_KEY, JSON.stringify(token));
    return redirect('/products');
  } catch (error) {
    const axiosError = error as AxiosError;
    return { error: axiosError };
  }
};

const Login = () => {
  const submit = useSubmit();
  const actionData = useActionData();
  const form = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSubmit = (data: z.infer<typeof schema>) => {
    submit(data, { method: 'post' });
  };

  return (
    <>
      <Heading className="mb-4">Login</Heading>
      <StateForm {...form}>
        <Form method="post" onSubmit={form.handleSubmit(onSubmit)}>
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <div className="mb-4 flex flex-col">
                <FormItem>
                  <FormLabel className="mb-2" htmlFor="email">
                    Email
                  </FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      id="email"
                      type="email"
                      placeholder="Email"
                    />
                  </FormControl>
                </FormItem>
                <FormMessage />
              </div>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <div className="mb-4 flex flex-col">
                <FormItem>
                  <FormLabel className="mb-2" htmlFor="password">
                    Password
                  </FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      id="password"
                      type="password"
                      placeholder="Password"
                    />
                  </FormControl>
                </FormItem>
                <FormMessage />
              </div>
            )}
          />
          <div className="mb-4 flex flex-col">
            <Button type="submit">Login</Button>
          </div>
        </Form>
      </StateForm>
      {isErrorResponse(actionData) && actionData?.error && (
        <div className="mb-4 flex flex-col">
          <p className="text-red-500">{actionData?.error?.message}</p>
        </div>
      )}
      <Link className="text-slate-800" to="/">
        Sign Up
      </Link>
    </>
  );
};

export default Login;
