"use client";

import { useEffect, useState, useRef } from "react";
import { useRouter } from "next/navigation";
import {
  Leaf,
  LayoutDashboard,
  LogOut,
  ExternalLink,
  ShoppingBag,
  Plus,
  Pencil,
  Trash2,
  Upload,
  X
} from "lucide-react";

interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  images: string[];
  amazonLink: string;
}

export default function ProductsAdmin() {
  const router = useRouter();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  
  // Form State
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState(399);
  const [amazonLink, setAmazonLink] = useState("");
  const [images, setImages] = useState<string[]>([]);
  const [uploading, setUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    // Mock auth guard
    const isAuth = sessionStorage.getItem("el_admin");
    if (!isAuth) {
      router.replace("/admin");
      return;
    }

    fetchProducts();
  }, [router]);

  const fetchProducts = async () => {
    try {
      const res = await fetch("/api/products");
      const data = await res.json();
      setProducts(data);
      setLoading(false);
    } catch {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    sessionStorage.removeItem("el_admin");
    router.replace("/admin");
  };

  const openModal = (product?: Product) => {
    if (product) {
      setEditingId(product.id);
      setName(product.name);
      setDescription(product.description);
      setPrice(product.price);
      setAmazonLink(product.amazonLink);
      setImages(product.images || []);
    } else {
      setEditingId(null);
      setName("");
      setDescription("");
      setPrice(399);
      setAmazonLink("");
      setImages([]);
    }
    setIsModalOpen(true);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const payload = {
      id: editingId,
      name,
      description,
      price,
      amazonLink,
      images,
    };

    const method = editingId ? "PUT" : "POST";
    
    try {
      const res = await fetch("/api/products", {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      
      if (res.ok) {
        setIsModalOpen(false);
        fetchProducts();
      }
    } catch (err) {
      console.error("Save failed", err);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this product?")) return;
    
    try {
      const res = await fetch(`/api/products?id=${id}`, { method: "DELETE" });
      if (res.ok) {
        fetchProducts();
      }
    } catch (err) {
      console.error("Delete failed", err);
    }
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files?.length) return;
    setUploading(true);
    
    const newImageUrls: string[] = [];
    
    for (let i = 0; i < e.target.files.length; i++) {
        const formData = new FormData();
        formData.append("file", e.target.files[i]);

        try {
            const res = await fetch("/api/upload", {
                method: "POST",
                body: formData,
            });
            const data = await res.json();
            if (data.url) {
                newImageUrls.push(data.url);
            }
        } catch (err) {
            console.error("Upload failed", err);
        }
    }
    
    setImages(prev => [...prev, ...newImageUrls]);
    setUploading(false);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const removeImage = (index: number) => {
    setImages(prev => prev.filter((_, i) => i !== index));
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-cream flex items-center justify-center">
        <div className="w-10 h-10 border-3 border-forest/20 border-t-forest rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-cream flex">
      {/* Sidebar - Replicated from Dashboard */}
      <aside className="hidden lg:flex flex-col w-72 bg-forest min-h-screen fixed left-0 top-0 bottom-0 z-40">
        <div className="px-7 py-8 border-b border-cream/8">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gold/15 flex items-center justify-center">
              <Leaf className="w-5 h-5 text-gold" />
            </div>
            <div>
              <h2 className="font-[var(--font-playfair)] text-cream font-semibold text-lg tracking-wide">
                Essenzae Laux
              </h2>
              <p className="text-cream/30 text-[11px] tracking-wider uppercase">
                Admin Panel
              </p>
            </div>
          </div>
        </div>

        <nav className="flex-1 px-4 py-6 space-y-1">
          <a
            href="/admin/dashboard"
            className="flex items-center gap-3 px-4 py-3 rounded-xl text-cream/50 hover:text-cream hover:bg-cream/5 text-sm transition-colors"
          >
            <LayoutDashboard className="w-5 h-5" />
            Dashboard
          </a>
          <a
            href="/admin/products"
            className="flex items-center gap-3 px-4 py-3 rounded-xl bg-cream/8 text-cream font-medium text-sm transition-colors"
          >
            <ShoppingBag className="w-5 h-5 text-gold" />
            Products
          </a>
          <a
            href="/"
            target="_blank"
            className="flex items-center gap-3 px-4 py-3 rounded-xl text-cream/50 hover:text-cream hover:bg-cream/5 text-sm transition-colors"
          >
            <ExternalLink className="w-5 h-5" />
            View Landing Page
          </a>
        </nav>

        <div className="px-4 py-6 border-t border-cream/8">
          <button
            onClick={handleLogout}
            className="flex items-center gap-3 px-4 py-3 rounded-xl text-cream/50 hover:text-red-400 hover:bg-red-500/5 w-full text-sm transition-colors"
          >
            <LogOut className="w-5 h-5" />
            Sign Out
          </button>
        </div>
      </aside>

      {/* Main content */}
      <main className="flex-1 lg:ml-72">
        <header className="sticky top-0 z-30 bg-cream/80 backdrop-blur-md border-b border-cream-dark/50 px-6 lg:px-10 py-5">
          <div className="flex items-center justify-between">
            <h1 className="font-[var(--font-playfair)] text-2xl lg:text-3xl font-bold text-forest">
              Products Management
            </h1>
            <button
              onClick={() => openModal()}
              className="bg-forest text-cream hover:bg-forest-light px-4 py-2 rounded-xl text-sm font-semibold flex items-center gap-2 transition-colors"
            >
              <Plus className="w-4 h-4" />
              Add Product
            </button>
          </div>
        </header>

        <div className="px-6 lg:px-10 py-8 space-y-8">
          <div className="dashboard-card overflow-hidden p-0">
            <div className="overflow-x-auto">
              <table className="w-full text-sm text-left">
                <thead className="bg-forest/5 border-b border-cream-dark/50">
                  <tr>
                    <th className="py-4 px-6 text-charcoal/40 font-semibold text-xs uppercase tracking-wider">Product</th>
                    <th className="py-4 px-6 text-charcoal/40 font-semibold text-xs uppercase tracking-wider">Price</th>
                    <th className="py-4 px-6 text-charcoal/40 font-semibold text-xs uppercase tracking-wider">Amazon Link</th>
                    <th className="py-4 px-6 text-charcoal/40 font-semibold text-xs uppercase tracking-wider text-right">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {products.map((p) => (
                    <tr key={p.id} className="border-b border-cream-dark/30 hover:bg-forest/3 transition-colors">
                      <td className="py-4 px-6">
                        <div className="flex items-center gap-4">
                            <div className="w-12 h-12 bg-white rounded-lg border border-cream-dark/30 p-1 flex items-center justify-center overflow-hidden">
                                {p.images && p.images[0] ? (
                                    <img src={p.images[0]} width={40} height={40} className="object-cover rounded" alt={p.name} />
                                ) : (
                                    <span className="text-[10px] text-charcoal/30">N/A</span>
                                )}
                            </div>
                            <div>
                                <p className="font-semibold text-forest">{p.name}</p>
                                <p className="text-charcoal/50 text-xs truncate max-w-[200px]">{p.description}</p>
                            </div>
                        </div>
                      </td>
                      <td className="py-4 px-6 font-medium text-forest">₹{p.price}</td>
                      <td className="py-4 px-6 text-charcoal/60 truncate max-w-[200px]">
                          <a href={p.amazonLink} target="_blank" className="hover:text-gold transition-colors">{p.amazonLink}</a>
                      </td>
                      <td className="py-4 px-6 text-right">
                        <button onClick={() => openModal(p)} className="p-2 text-forest/50 hover:text-blue-600 transition-colors mx-1">
                          <Pencil className="w-4 h-4" />
                        </button>
                        <button onClick={() => handleDelete(p.id)} className="p-2 text-forest/50 hover:text-red-600 transition-colors mx-1">
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </td>
                    </tr>
                  ))}
                  {products.length === 0 && (
                    <tr>
                      <td colSpan={4} className="py-12 text-center text-charcoal/40">No products configured yet.</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </main>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-forest/80 backdrop-blur-sm">
          <div className="bg-cream rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto shadow-2xl animate-fade-in-up">
            <div className="sticky top-0 bg-cream z-10 px-6 py-4 border-b border-cream-dark flex items-center justify-between">
              <h2 className="font-[var(--font-playfair)] text-xl font-bold text-forest">
                {editingId ? "Edit Product" : "Add New Product"}
              </h2>
              <button onClick={() => setIsModalOpen(false)} className="text-forest/50 hover:text-forest">
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <form onSubmit={handleSave} className="p-6 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-xs font-semibold text-charcoal/60 uppercase tracking-wider mb-2">Product Name</label>
                    <input type="text" required value={name} onChange={e => setName(e.target.value)} className="w-full bg-white border border-cream-dark rounded-xl px-4 py-2.5 text-forest focus:outline-none focus:border-gold transition-colors" />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-charcoal/60 uppercase tracking-wider mb-2">Price (₹)</label>
                    <input type="number" required min="0" value={price} onChange={e => setPrice(Number(e.target.value))} className="w-full bg-white border border-cream-dark rounded-xl px-4 py-2.5 text-forest focus:outline-none focus:border-gold transition-colors" />
                  </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-charcoal/60 uppercase tracking-wider mb-2">Description / Notes</label>
                <textarea required value={description} onChange={e => setDescription(e.target.value)} className="w-full bg-white border border-cream-dark rounded-xl px-4 py-2.5 text-forest focus:outline-none focus:border-gold transition-colors min-h-[100px]" />
              </div>

              <div>
                <label className="block text-xs font-semibold text-charcoal/60 uppercase tracking-wider mb-2">Amazon Product Link</label>
                <input type="url" required value={amazonLink} onChange={e => setAmazonLink(e.target.value)} placeholder="https://www.amazon.in/dp/..." className="w-full bg-white border border-cream-dark rounded-xl px-4 py-2.5 text-forest focus:outline-none focus:border-gold transition-colors" />
              </div>

              <div className="border border-cream-dark rounded-xl p-4 bg-white/50">
                <div className="flex items-center justify-between mb-4">
                    <label className="block text-xs font-semibold text-charcoal/60 uppercase tracking-wider">Product Images</label>
                    <div>
                        <input type="file" ref={fileInputRef} multiple accept="image/*" onChange={handleFileUpload} className="hidden" id="image-upload" />
                        <label htmlFor="image-upload" className="cursor-pointer bg-forest/5 hover:bg-forest/10 text-forest text-xs font-bold px-3 py-1.5 rounded-lg flex items-center gap-1.5 transition-colors">
                            {uploading ? <div className="w-3 h-3 border-2 border-forest border-t-transparent rounded-full animate-spin" /> : <Upload className="w-3 h-3" />}
                            Upload Images
                        </label>
                    </div>
                </div>
                
                <div className="grid grid-cols-4 sm:grid-cols-6 gap-3">
                    {images.map((img, i) => (
                        <div key={i} className="group relative aspect-square bg-cream rounded-lg overflow-hidden border border-cream-dark">
                            <img src={img} alt="Product image" className="absolute inset-0 w-full h-full object-cover" />
                            <button type="button" onClick={() => removeImage(i)} className="absolute top-1 right-1 bg-red-500 text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity shadow-md hover:scale-110">
                                <X className="w-3 h-3" />
                            </button>
                        </div>
                    ))}
                    {images.length === 0 && !uploading && (
                        <p className="col-span-full text-charcoal/30 text-xs text-center py-4">No images added</p>
                    )}
                </div>
              </div>

              <div className="pt-4 flex justify-end gap-3 border-t border-cream-dark">
                <button type="button" onClick={() => setIsModalOpen(false)} className="px-5 py-2.5 rounded-xl text-forest font-semibold hover:bg-forest/5 transition-colors">
                  Cancel
                </button>
                <button type="submit" className="bg-forest text-cream hover:bg-forest-light px-6 py-2.5 rounded-xl font-semibold transition-colors">
                  Save Product
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
