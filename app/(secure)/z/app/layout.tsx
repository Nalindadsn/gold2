"use client";

import { FormProvider } from "../components/FormContext";

export default Layout;

function Layout({ children }: { children: React.ReactNode }) {

    return (
        <div>
              <div >
        <FormProvider>{children}</FormProvider>
    </div>
        </div>

    );
}

