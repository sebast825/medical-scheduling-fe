import { BrowserRouter as Router } from "react-router-dom";
import { Suspense } from "react";
import { Spinner } from "./Components/statics/Spinner";
import "./App.scss";
import { UserProvider } from "./context/authContext";
import AppContent from "./pages/AppContent";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <UserProvider>
        <div className="App">
          <Router>
            {/* suspense es para usar el lazy loading
      y el fallback se le pasa un componente que muestra mientras se carga la app */}
            <Suspense fallback={<Spinner />}>
              <AppContent />
            </Suspense>
          </Router>
        </div>
      </UserProvider>
    </QueryClientProvider>
  );
}

export default App;
