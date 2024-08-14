import Nav from "./Nav";

interface Props {
  children: JSX.Element;
  heading: string;
}

export default function Layout({ children, heading }: Props) {
  return (
    <main className="max-w-screen-2xl px-4 md:px-12 mt-4 m-auto">
      <Nav heading={heading} />
      <div>{children}</div>
    </main>
  );
}
