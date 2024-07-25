import { useState } from "react";
import { useRouter } from "next/navigation";
import { loginSchema } from "@/models/loginSchema";

const useLogin = () => {
  const router = useRouter();
  const [errors, setErrors] = useState<{ email?: string; password?: string }>(
    {}
  );

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const data = {
      email: formData.get("email") as string,
      password: formData.get("password") as string,
    };

    const result = loginSchema.safeParse(data);
    if (!result.success) {
      const fieldErrors = result.error.flatten().fieldErrors;
      setErrors({
        email: fieldErrors.email?.[0],
        password: fieldErrors.password?.[0],
      });
      return;
    }

    router.push("/dashboard/characters");
  };

  return {
    errors,
    handleLogin,
  };
};

export default useLogin;
