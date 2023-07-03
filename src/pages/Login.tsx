import { Heading } from "@/components/ui/heading";
import { Input } from '@/components/ui/input';
import { Link } from "react-router-dom";

const Login = () => {
  return (
    <>
      <Heading className="mb-4">Login</Heading>
      <Input className='mb-4' placeholder='Email' />
      <Link className="text-slate-800" to="/">
        Sign Up
      </Link>
    </>
  );
};

export default Login;
