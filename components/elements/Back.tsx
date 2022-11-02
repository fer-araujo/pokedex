import { useRouter } from "next/router";

export const Back = () => {
  const router = useRouter();

  return (
    <button
        onClick={ () => router.back()}
        className="cursor-pointer p-2 flex items-center justify-between group/left"
      >
        <p className="text-xl mx-2  group-hover/left:text-neutral-600 dark:group-hover/left:text-neutral-300 group-hover/left:-translate-x-0.5 transition-translate duration-500">
          &larr;
        </p>{" "}
        <p className="mx-2  group-hover/left:text-neutral-600 dark:group-hover/left:text-neutral-300 group-hover/left:translate-x-1 transition-translate duration-500">
          Go Back
        </p>{" "}
      </button>
  )
}