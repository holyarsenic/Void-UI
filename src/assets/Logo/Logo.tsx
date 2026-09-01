import type { SVGProps } from "react";

export default function Logo({
  className = "h-auto w-full",
  ...props
}: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 500 500"
      preserveAspectRatio="xMidYMid slice"
      className={className}
      {...props}
    >
      <path
        d="
          M 30,50
          L 170,50
          L 250,220
          L 330,50
          L 470,50
          L 270,450
          L 230,450
          Z

          M 140,110
          L 250,330
          L 360,110
          L 300,110
          L 250,210
          L 200,110
          Z

          M 210,50
          L 290,50
          L 250,130
          Z
        "
        fill="currentColor"
        fillRule="evenodd"
      />
    </svg>
  );
}