import { CartProvider } from "@/CartContext";
import Alloneplace from "./components/Allinoneplace";
import Footer from "./components/Footer";
import JustDrop from "./components/JustDrop";
import { Navbar } from "./components/Navbar";
import NewsLetter from "./components/NewsLetter";
import Payment from "./components/Payment";
import BundlePackages from "./components/Payment";

export default function Home() {
  return (
  <CartProvider>
     <div>
    <Navbar/>
    <div>
      <JustDrop
      title ='Fresh Mockups Just Dropped'
      paragraph='Explore our newest collection of high-quality mockups designed to bring your creative vision
        to life. Crafted for realism and easy customization.'

      />
    </div>
    <div>
     <JustDrop
     title ='Find the Right Mockup for Any Project — All in One Place!'
     paragraph=' From minimal to bold, our diverse mockup library helps you showcase your work with style. Save time and impress clients — all with one platform.'
     />
    </div>
    <div className="bg-white">
    <BundlePackages/>
    </div>
    <div>
      <NewsLetter/>
    </div>
    <div>
      <Footer/>

    </div>
   </div>
  </CartProvider>
  );
}
