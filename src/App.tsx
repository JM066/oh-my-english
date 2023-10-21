import { Suspense } from 'react';
import { Route, Routes } from 'react-router-dom';

import Loading from './view/components/Loading';
import Layout from '@/view/layout/Layout';
import Home from '@/view/pages/Home';
import './App.css';

const loading = () => <Loading />;

function App() {
    return (
        <Suspense fallback={loading()}>
            <Layout>
                <Routes>
                    <Route>
                        <Route path="/" element={<Home />} />
                    </Route>
                </Routes>
            </Layout>
        </Suspense>
    );
}

export default App;
