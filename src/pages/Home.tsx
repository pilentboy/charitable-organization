import { Link } from "react-router";

const Home = () => {
  return (
    <div className="gap-5 flex ">
      <Link to={"login"}>login</Link>
      <Link to={"register"}>register</Link>
    </div>
  );
};

export default Home;
