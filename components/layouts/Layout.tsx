import { FC } from "react";

import Head from "next/head";

import { Navbar } from "../elements";

interface Props {
  children?: React.ReactNode;
  title?: string;
}

export const Layout: FC<Props> = ({ children, title }) => {
  return (
    <>
      <Head>
        <title>{title || "Pokedex App"}</title>
        <meta name="author" content="Fernando Araujo" />
        <meta name="description" content="Información sobre pokemon ..." />
        <meta name="keywords" content="xxxx, pokemon, pokedex" />
      </Head>

      <Navbar />

      <main className="w-full h-full min-h-max overflow-y-auto ">{children}</main>
    </>
  );
};
