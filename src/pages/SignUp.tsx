import {
  Link,
  Form,
  useSubmit,
  ActionFunctionArgs,
  redirect,
} from 'react-router-dom';
import * as z from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/components/ui/button';
import { Heading } from '@/components/ui/heading';
import {
  Form as StateForm,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { createSession, createUser } from '@/services/api';
import { SESSION_STORAGE_KEY } from '@/constants';

export const action = async ({ request }: ActionFunctionArgs) => {
  const formData = await request.formData();
  const data = Object.fromEntries(formData) as z.infer<typeof schema>;
  const user = await createUser({
    name: data.name,
    email: data.email,
    password: data.password,
    avatar: data.avatar,
    role: 'customer',
  });
  const token = await createSession(user);
  window?.localStorage.setItem(SESSION_STORAGE_KEY, JSON.stringify(token));
  return redirect('/products');
};

const schema = z
  .object({
    name: z.string().nonempty(),
    email: z.string().email(),
    password: z.string().min(8),
    confirmPassword: z.string().min(8),
    avatar: z.string().url(),
  })
  .refine((_schema) => _schema.password === _schema.confirmPassword, {
    message: 'Passwords do not match',
    path: ['confirmPassword'],
  });

const SignUp = () => {
  const submit = useSubmit();
  const form = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues: {
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
      avatar: '',
    },
  });

  const onSubmit = (data: z.infer<typeof schema>) => {
    submit(data, { method: 'post' });
  };

  return (
    <>
      <Heading className="mb-4">Sign Up</Heading>
      <StateForm {...form}>
        <Form method="post" onSubmit={form.handleSubmit(onSubmit)}>
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <div className="mb-4 flex flex-col">
                <FormItem>
                  <FormLabel className="mb-2" htmlFor="name">
                    Name
                  </FormLabel>
                  <FormControl>
                    <Input
                      className="mb-4"
                      type="text"
                      placeholder="Name"
                      id="name"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              </div>
            )}
          />
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
                      type="email"
                      placeholder="Email"
                      id="email"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
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
                      type="password"
                      placeholder="Password"
                      id="password"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              </div>
            )}
          />
          <FormField
            control={form.control}
            name="confirmPassword"
            render={({ field }) => (
              <div className="mb-4 flex flex-col">
                <FormItem>
                  <FormLabel className="mb-2" htmlFor="confirmPassword">
                    Confirm Password
                  </FormLabel>
                  <FormControl>
                    <Input
                      type="password"
                      placeholder="Confirm Password"
                      id="confirmPassword"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              </div>
            )}
          />
          <FormField
            control={form.control}
            name="avatar"
            render={({ field }) => (
              <div className="mb-4 flex flex-col">
                <FormItem>
                  <FormLabel className="mb-2" htmlFor="avatar">
                    Avatar
                  </FormLabel>
                  <FormControl>
                    <Input
                      type="url"
                      placeholder="Avatar"
                      id="avatar"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              </div>
            )}
          />
          <div className="mb-4 flex flex-col">
            <Button type="submit">Sign Up</Button>
          </div>
        </Form>
      </StateForm>
      <Link className="text-slate-800" to="/login">
        Login
      </Link>
    </>
  );
};

export default SignUp;
