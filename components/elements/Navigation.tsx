import { FC } from "react";

interface Props {
  prev: Function;
  next: Function;
}

export const Navigation: FC<Props> = ({ prev, next }) => {
  return (
    <div className="w-full relative lg:absolute lg:mt-[16%] xl:mt-16 z-20 flex flex-row justify-between items-center ">
      <button
        className="fixed left-0 md:sticky rounded-full  bg-neutral-300/80 hover:bg-neutral-300 dark:bg-neutral-600/80 dark:hover:bg-neutral-800 p-2 flex items-center justify-between group/left ml-10"
        onClick={() => prev()}
      >
        <p className="text-xl mx-2 group-hover/left:text-neutral-600 dark:group-hover/left:text-neutral-300 group-hover/left:-translate-x-0.5 transition-translate duration-500">
          &larr;
        </p>{" "}
        <p className="hidden md:block mx-2 group-hover/left:text-neutral-600 dark:group-hover/left:text-neutral-300 group-hover/left:translate-x-1 transition-translate duration-500">
          Previous
        </p>{" "}
      </button>
      &nbsp;
      <button
        className="fixed right-0 md:sticky rounded-full bg-neutral-300/80 hover:bg-neutral-300 dark:bg-neutral-600/80 dark:hover:bg-neutral-800 p-2 flex items-center justify-between group/right mr-10"
        onClick={() => next()}
      >
        <p className="hidden md:block mx-2 group-hover/right:text-neutral-600 dark:group-hover/right:text-neutral-300 group-hover/right:-translate-x-0.5 transition-translate duration-500">
          Next
        </p>{" "}
        <p className="text-xl mx-2 group-hover/right:text-neutral-600 dark:group-hover/right:text-neutral-300 group-hover/right:translate-x-1 transition-translate duration-500">
          &rarr;
        </p>{" "}
      </button>
    </div>
  );
};

