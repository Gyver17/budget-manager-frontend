import "./App.css";
import AppRouter from "./routes/AppRouter";
import AuthProvider from "./context/AuthProvider.context";
import { QueryClient, QueryClientProvider } from "react-query";

const queryClient = new QueryClient();

function App() {
	return (
		<div className="App">
			<QueryClientProvider client={queryClient}>
				<AuthProvider>
					<AppRouter />
				</AuthProvider>
			</QueryClientProvider>
		</div>
	);
}

export default App;
