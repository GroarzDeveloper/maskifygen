import Navbar from "@/components/Navbar";
import MaskGenerator from "@/components/MaskGenerator";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main>
        <h1 className="sr-only">Mask Generator</h1>
        <MaskGenerator />
      </main>
      <footer className="border-t">
        <div className="container py-6 text-sm text-muted-foreground">© {new Date().getFullYear()} Maskify. Built with Lovable.</div>
      </footer>
    </div>
  );
};

export default Index;
