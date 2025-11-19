import { Header } from "./header/header";
type Props = {
  children?: React.ReactNode;
};


export function Layout({children}:Props) {
  return (
   <div className="min-h-screen  flex flex-col  text-white  bg-black ">
      <Header />

      <main className="flex-1 flex flex-col items-center pt-20 md:pt-24">
       <div className="w-full  ">{children}</div>
      </main>

      
    </div>
  );
}