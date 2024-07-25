import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "../stores/authStore";

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { isAuthenticated } = useAuthStore();
  const router = useRouter();
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (isClient && !isAuthenticated) {
      router.push("/pages/Login");
    }
  }, [isAuthenticated, router, isClient]);

  if (!isClient) {
    return null;
  }

  return <>{isAuthenticated ? children : null}</>;
};

export default ProtectedRoute;
