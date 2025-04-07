import { BtnType } from "@/index";

const Button = ({
  variant,
  children,
  classname,
  type = "button",
  onClick,
  dissabled = false,
}: BtnType) => {
  const btnStyles =
    variant === "outline"
      ? "border-green bg-white text-green hover:bg-green hover:text-white"
      : "border-green bg-green text-white hover:bg-white hover:text-green";

  return (
    <button
      type={type}
      className={`border py-2 px-3 cursor-pointer rounded-lg text-[16px] transition ${btnStyles} ${classname} `}
      onClick={onClick}
      disabled={dissabled}
    >
      {children}
    </button>
  );
};

export default Button;
