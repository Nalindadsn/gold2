import { headers } from 'next/headers';
import { redirect } from 'next/navigation';

import { auth } from '_helpers/server';
import { Alert, NavB } from '_components';

export default Layout;

function Layout({ children }: { children: React.ReactNode }) {
    // if not logged in redirect to login page
    if (!auth.isAuthenticated()) {
        const returnUrl = encodeURIComponent(headers().get('x-invoke-path') || '/');
        redirect(`/account/login?returnUrl=${returnUrl}`);
    }
    const au:any=auth

    return (
        <div className="app-container bg-light">
            <NavB />
            
            <Alert />
            <div className="p-4">
                <div className="container">
                    {children}
                </div>
            </div>
        </div>
    );
}
