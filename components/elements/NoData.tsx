import { FC } from "react";

interface Props {
  message: string;
}

export const NoData: FC<Props> = ({ message }) => {
  return (
    <div className="w-full flex justify-center text-center my-14">
      <p className="text-2xl font-Poppins font-black">{message}</p>
    </div>
  );
};

