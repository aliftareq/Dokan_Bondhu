import { Link } from "react-router-dom";
import errorImag from "../../asset/others/404.gif";

const ErrorPage = () => {
  return (
    <div className="flex flex-col justify-center items-center">
      <div className="flex justify-center items-center mt-10">
        <Link to="/">
          <button className="btn w-full mx-auto uppercase text-white bg-gradient-to-l from-[#B58130] to-[#835D23] hover:opacity-90 py-2 mt-[-10]">
            Go Back Home
          </button>
        </Link>
      </div>
      <img src={errorImag} alt="ErrorPage Image" />
    </div>
  );
};

export default ErrorPage;
