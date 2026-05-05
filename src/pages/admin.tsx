import { Link } from 'react-router-dom';
import AdminCarForm from '@/components/AdminCarForm';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';

const AdminPage = () => {
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <Link to="/">
          <Button variant="outline" className="mb-8">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Home
          </Button>
        </Link>
        <AdminCarForm />
      </div>
    </div>
  );
};

export default AdminPage;

