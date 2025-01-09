import { Link } from "react-router-dom";

const Logo = () => {
  return (
    <Link to={'/'}>
      <svg
        width="250"
        height="80"
        viewBox="0 0 250 80"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
      >
        {/* New Logo Design */}
        <g id="logo-icon">
          {/* Abstract Icon: Two interconnected arrows to symbolize jobs and connections */}
          <path
            d="M30 20 L50 40 L30 60"
            stroke="#4F46E5"
            strokeWidth="5"
            strokeLinecap="round"
            fill="none"
          />
          <path
            d="M50 20 L30 40 L50 60"
            stroke="#FF9800"
            strokeWidth="5"
            strokeLinecap="round"
            fill="none"
          />
        </g>

        {/* Brand Name */}
        <text
          x="70"
          y="48"
          fontFamily="Arial, sans-serif"
          fontSize="30"
          fontWeight="bold"
          letterSpacing="1.5"
          fill="#4F46E5"
        >
          Job<tspan fill="#FF9800">Stream</tspan>
        </text>
      </svg>
    </Link>
  );
};

export default Logo;
