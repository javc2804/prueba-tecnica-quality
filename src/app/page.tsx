import { redirect } from "next/navigation";

const Home = () => {
  redirect("/Login");
  return null;
};

export default Home;
