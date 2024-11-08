import { useState, useEffect, useRef } from "react";
import axios from "axios";
import "./announcementGrid.scss";
import { AnnouncementCard } from "../announcementCard/AnnouncementCard";

interface Announcement {
  id: number;
  file_path: string;
  title: string;
  description: string;
  price: number;
  type: 'en ligne' | 'présentiel';
  city: string;
}

export const AnnouncementGrid = () => {
  const [announcements, setAnnouncements] = useState<Announcement[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState<string[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 4;
  const gridRef = useRef<HTMLDivElement>(null);

  // Fetch announcements from the API
  useEffect(() => {
    const fetchAnnouncements = async () => {
      try {
        const response = await axios.get("http://127.0.0.1:8000/api/urgent-ads-all");
        // Map data to match Announcement interface
        const fetchedData = response.data.map((item: any) => ({
          id: item.id,
          file_path: item.file_path,
          title: item.title,
          description: item.description,
          price: parseFloat(item.price), // Convert price to number
          type: item.type,
          city: item.city,
        }));
        setAnnouncements(fetchedData);
      } catch (error) {
        console.error("Error fetching announcements:", error);
      }
    };
    fetchAnnouncements();
  }, []);

  // Search and filter logic
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1);
  };

  const handleFilterChange = (type: string) => {
    setFilters((prevFilters) =>
      prevFilters.includes(type) ? prevFilters.filter((t) => t !== type) : [...prevFilters, type]
    );
    setCurrentPage(1);
  };

  const filteredProducts = announcements.filter((product) => {
    const matchesSearch = product.title.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = filters.length === 0 || filters.includes(product.type);
    return matchesSearch && matchesType;
  });

  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
  const currentProducts = filteredProducts.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  const scroll = (direction: "left" | "right") => {
    if (gridRef.current) {
      const scrollAmount = direction === "left" ? -300 : 300;
      gridRef.current.scrollBy({ left: scrollAmount, behavior: "smooth" });
    }
  };

  return (
    <div className="announcementGrid">
      <aside className="sidebar">
        <input
          type="text"
          placeholder="Rechercher..."
          value={searchTerm}
          onChange={handleSearchChange}
        />
        <div className="filter-options">
          <h3>Filtrer par type</h3>
          <label>
            <input type="checkbox" onChange={() => handleFilterChange('en ligne')} /> En ligne
          </label>
          <label>
            <input type="checkbox" onChange={() => handleFilterChange('présentiel')} /> Présentiel
          </label>
        </div>
      </aside>

      <div className="grid-wrapper">
        {currentProducts.length > itemsPerPage && (
          <>
            <button className="scroll-button left" onClick={() => scroll("left")}>❮</button>
            <button className="scroll-button right" onClick={() => scroll("right")}>❯</button>
          </>
        )}

        <main className="grid-container" ref={gridRef}>
          {currentProducts.map((product) => (
            <a key={product.id} href="login">
              <AnnouncementCard
                id={product.id}
                image={product.file_path}
                title={product.title}
                description={product.description}
                price={product.price}
                type={product.type}
                city={product.city}
              />
            </a>
          ))}
        </main>

        <div className="pagination">
          <button onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))} disabled={currentPage === 1}>
            Précédent
          </button>
          <span>Page {currentPage} sur {totalPages}</span>
          <button onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))} disabled={currentPage === totalPages}>
            Suivant
          </button>
        </div>
      </div>
    </div>
  );
};
