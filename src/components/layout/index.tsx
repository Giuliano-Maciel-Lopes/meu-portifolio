import { Header } from "./header/header";
type Props = {
  children?: React.ReactNode;
};


export function Layout({children}:Props) {
  return (
   <div className="min-h-screen  flex flex-col  text-white  bg-black ">
      <Header />

      <main className="flex-1 flex flex-col items-center mt-20 md:mt-24">
       <div className="w-full max-w-7xl ">{children}</div>
      </main>

      
    </div>
  );
}