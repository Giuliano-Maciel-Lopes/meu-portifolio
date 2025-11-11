import { Header } from "./header/header";
type Props = {
  children?: React.ReactNode;
};


export function Layout({children}:Props) {
  return (
    <div>
      <Header/>
      {children}
    </div>
  );
}