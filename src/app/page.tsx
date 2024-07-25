import { redirect } from "next/navigation";

const Home = () => {
  redirect("/auth/Login");
  return null;
};

export default Home;
