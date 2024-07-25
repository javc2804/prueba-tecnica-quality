import { redirect } from "next/navigation";

const Home = () => {
  redirect("/pages/Login");
  return null;
};

export default Home;
