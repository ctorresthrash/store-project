import { Button } from '@/components/ui/button';
import { Heading } from '@/components/ui/heading';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { ActionFunction, Form, Link } from 'react-router-dom';

export const action: ActionFunction = async ({ request }) => {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);
  console.log(data);
  return null;
};

const SignUp = () => {
  return (
    <>
      <Heading className="mb-4">Sign Up</Heading>
      <Form method="post">
        <div className="mb-4 flex flex-col">
          <Label className="mb-2" htmlFor="name">
            Name
          </Label>
          <Input
            className="mb-4"
            type="text"
            placeholder="Name"
            name="name"
            id="name"
          />
        </div>
        <div className="mb-4 flex flex-col">
          <Label className="mb-2" htmlFor="email">
            Email
          </Label>
          <Input
            className="mb-4"
            type="email"
            placeholder="Email"
            name="email"
            id="email"
          />
        </div>
        <div className="mb-4 flex flex-col">
          <Button type="submit">Sign Up</Button>
        </div>
      </Form>
      <Link className="text-slate-800" to="/login">
        Login
      </Link>
    </>
  );
};

export default SignUp;
