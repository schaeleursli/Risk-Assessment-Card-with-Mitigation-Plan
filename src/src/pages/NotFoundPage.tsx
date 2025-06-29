import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../ui/Button';
const NotFoundPage = () => {
  return <div className="min-h-screen flex flex-col items-center justify-center p-4 text-center">
      <h1 className="text-6xl font-bold mb-4">404</h1>
      <h2 className="text-2xl font-semibold mb-4">Page Not Found</h2>
      <p className="text-muted-foreground mb-6 max-w-md">
        The page you are looking for doesn't exist or has been moved.
      </p>
      <Link to="/">
        <Button>Return to Dashboard</Button>
      </Link>
    </div>;
};
export default NotFoundPage;