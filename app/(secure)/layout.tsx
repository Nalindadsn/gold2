import { headers } from 'next/headers';
import { redirect } from 'next/navigation';

import { auth } from '_helpers/server';
import { Alert, NavB,Sidebar } from '_components';
export default Layout;

function Layout({ children }: { children: React.ReactNode }) {
    // if not logged in redirect to login page
    if (!auth.isAuthenticated()) {
        const returnUrl = encodeURIComponent(headers().get('x-invoke-path') || '/');
        redirect(`/account/login?returnUrl=${returnUrl}`);
    }
    const au:any=auth

    return (
        <div>

<Sidebar/>
{/* <Sidebarmain /> */}
        <div className=" md:ml-64">
                <NavB />
           <div className="  bg-white   mt-2">
            
                 <Alert />
                 <div className="p-0 md:p-4">
                     <div className="container">
                         {children}
                     </div>
                 </div>
           {/* <Button variant="primary" onClick={handleShow} className="sm:hidden">
                Launch
              </Button>
              <Offcanvas show={show} onHide={handleClose}>
                <Offcanvas.Header closeButton>
                  <Offcanvas.Title>Offcanvas</Offcanvas.Title>
                </Offcanvas.Header>
                <Offcanvas.Body>
                  Some text as placeholder. In real life you can have the elements you
                  have chosen. Like, text, images, lists, etc.
                </Offcanvas.Body>
              </Offcanvas> */}
           </div>
        </div>
            </div>
        // <div className="app-container bg-light">


            
        //     <NavB />
            
        //     <Alert />
        //     <div className="p-0 md:p-4">
        //         <div className="container">
        //             {children}
        //         </div>
        //     </div>
        // </div>
    );
}
