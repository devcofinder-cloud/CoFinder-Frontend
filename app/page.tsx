import Image from "next/image";
import LoginPage from "./(auth)/login/page";
import SplashScreen from "./components/SplashScreen/SplashScreen";

export default function Home() {
  return (
   <div>
    {/* <LoginPage/> */}
    <SplashScreen/>
   </div>
  );
}
