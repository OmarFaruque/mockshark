import { CartProvider } from "@/CartContext";
import Alloneplace from "./components/Allinoneplace";
import Footer from "./components/Footer";
import JustDrop from "./components/JustDrop";
import { Navbar } from "./components/Navbar";
import NewsLetter from "./components/NewsLetter";
import Payment from "./components/Payment";

export default function Home() {
  return (
  <CartProvider>
     <div>
    <Navbar/>
    <div>
      <JustDrop/>
    </div>
    <div>
      <Alloneplace/>
    </div>
    <div className="bg-white">
      <section className="bg-slate-900 text-white py-16 text-center p-4">
        <h2 className="text-3xl font-extrabold mb-2 text-cyan-400">Our Bundle Packages</h2>
        <p>Get high-quality mockups at unbeatable prices — choose a bundle and save up to 70%!</p>

        <div className="flex flex-col sm:flex-row justify-center items-center gap-6 mt-10 ">
          <Payment title="Essential Pack" price="$24.99" regularPrice="$49.99" savings="$24.91" mockups="10" color="bg-cyan-500"/>
          <Payment title="Designer Pack" price="$44.99" regularPrice="$99.80" savings="$54.81" mockups="20" color="bg-[#7CB84D]" savingsColor='text-white' licenseColor="text-white" />
          <Payment title="Agency Pack" price="$84.99" regularPrice="$240.60" savings="$154.61" mockups="50" color="bg-[#F42A40]" titleColor="text-white" priceColor="text-white"/>
        </div>

        <a href="#" className="mt-20 block"><span className="text-cyan-400 underline">Click Here</span> to see full details</a>
      </section>
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
