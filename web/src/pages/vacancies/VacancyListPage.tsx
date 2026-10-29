import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { vacanciesApi } from "@/services/vacancies";
import { Plus, Briefcase, ChevronRight, Trash2 } from "lucide-react"; // Tambah ikon Trash2 jika ingin dipakai
import type { Vacancy } from "@/types";

export default function VacancyListPage() {
  const [vacancies, setVacancies] = useState<Vacancy[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    vacanciesApi.list()
      .then((res) => setVacancies(res.data.vacancies))
      .catch(() => setError(true))
      .finally(() => setLoading(false));
  }, []);

  // Tambahkan fungsi handleDelete di sini
  const handleDelete = async (e: React.MouseEvent, id: number) => {
    e.stopPropagation(); // Mencegah Card ikut ter-klik dan pindah halaman
    
    if (!window.confirm("Are you sure you want to delete this vacancy?")) return;

    try {
      // Panggil API untuk menghapus data
      await vacanciesApi.delete(id); 
      // Update state langsung agar barisnya hilang tanpa perlu refresh browser
      setVacancies(vacancies.filter(v => v.id !== id));
    } catch (err) {
      console.error("Failed to delete vacancy", err);
      alert("Failed to delete vacancy. Please try again.");
    }
  };
  
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-semibold">Vacancies</h1>
        <Button onClick={() => navigate("/vacancies/new")}>
          <Plus className="h-4 w-4 mr-1.5" /> New Vacancy
        </Button>
      </div>

      {error && (
        <div className="border border-destructive/40 rounded-lg p-4 text-sm text-destructive">
          Failed to load vacancies. Please refresh the page.
        </div>
      )}

      {loading ? (
        <div className="space-y-2">
          {[1, 2].map((i) => <Skeleton key={i} className="h-14 w-full" />)}
        </div>
      ) : vacancies.length === 0 ? (
        <div className="border rounded-lg p-12 text-center text-sm text-muted-foreground">
          <p className="mb-3">No vacancies yet.</p>
          <Button variant="outline" onClick={() => navigate("/vacancies/new")}>
            <Plus className="h-4 w-4 mr-1.5" /> Create your first vacancy
          </Button>
        </div>
      ) : (
        <div className="space-y-2">
          {vacancies.map((v) => (
            <Card
              key={v.id}
              className="cursor-pointer hover:border-primary/40 transition-colors"
              onClick={() => navigate(`/vacancies/${v.id}/edit`)}
            >
              <CardContent className="py-3 px-4 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Briefcase className="h-4 w-4 text-muted-foreground" />
                  <p className="font-medium text-sm">{v.role_title}</p>
                </div>
                
                {/* Modifikasi bagian kanan Card untuk tombol Delete */}
                <div className="flex items-center gap-3">
                  <Button 
                    variant="destructive" 
                    size="sm" 
                    onClick={(e) => handleDelete(e, v.id)}
                  >
                    Delete
                  </Button>
                  <ChevronRight className="h-4 w-4 text-muted-foreground" />
                </div>
                
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}