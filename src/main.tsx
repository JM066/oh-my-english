import React from 'react';
import ReactDOM from 'react-dom/client';
import { PersistQueryClientProvider } from '@tanstack/react-query-persist-client';
import { createSyncStoragePersister } from '@tanstack/query-sync-storage-persister';
import { QueryClient } from '@tanstack/react-query';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import './index.css';

const persister = createSyncStoragePersister({
    storage: window.localStorage,
});
const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            cacheTime: 1000 * 60 * 60 * 24, // 24 hours
            staleTime: 1000 * 60 * 60,
        },
    },
});

ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <BrowserRouter>
            <PersistQueryClientProvider
                client={queryClient}
                persistOptions={{
                    persister,
                }}
            >
                <App />
            </PersistQueryClientProvider>
        </BrowserRouter>
    </React.StrictMode>,
);
