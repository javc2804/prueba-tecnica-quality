import { useState } from "react";
import { useRouter } from "next/navigation";
import { loginSchema } from "@/models/loginSchema";

const useLogin = () => {
  const router = useRouter();
  const [errors, setErrors] = useState<{ email?: string; password?: string }>(
    {}
  );

  const handleLogin = async (
    data: { email: string; password: string },
    setLoading: (loading: boolean) => void
  ) => {
    setLoading(true);

    const result = loginSchema.safeParse(data);
    if (!result.success) {
      const fieldErrors = result.error.flatten().fieldErrors;
      setErrors({
        email: fieldErrors.email?.[0],
        password: fieldErrors.password?.[0],
      });
      setTimeout(() => {
        setLoading(false);
        console.log("Validation failed, setting isLoading to false");
      }, 1000);
      return;
    }

    router.push("/pages/dashboard/characters");
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  };

  return {
    errors,
    handleLogin,
  };
};

export default useLogin;
