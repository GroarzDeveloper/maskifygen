import Navbar from "@/components/Navbar";
import MaskGenerator from "@/components/MaskGenerator";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main>
        <section className="container py-10 text-center">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-3">CSS mask-image Generator (Black & White)</h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">Design smooth reveals and cutouts using gradients. Toggle the navbar icon to switch between black and white themes.</p>
        </section>
        <MaskGenerator />
      </main>
      <footer className="border-t">
        <div className="container py-6 text-sm text-muted-foreground">© {new Date().getFullYear()} Maskify. Built with Lovable.</div>
      </footer>
    </div>
  );
};

export default Index;
