import 'bootstrap/dist/css/bootstrap.min.css';
import 'globals.css';

export const metadata = {
    title: 'Gold Pro'
}

export default Layout;

function Layout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="en">
            <body>
                {children}

                {/* credits */}
                <div className="text-center mt-4">
                    
                </div>
            </body>
        </html>
    );
}
