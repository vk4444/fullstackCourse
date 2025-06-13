import ReactDOM from "react-dom/client";
import App from "./App";
import { UserContextProvider } from "./contexts/UserContext";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter as Router } from "react-router-dom";

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")).render(
  <QueryClientProvider client={queryClient}>
    <UserContextProvider>
      <Router>
        <App />
      </Router>
    </UserContextProvider>
  </QueryClientProvider>,
);
