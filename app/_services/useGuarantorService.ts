import { create } from 'zustand';
import { useRouter, useSearchParams } from 'next/navigation';

import { useAlertService, useLoanService } from '_services';
import { useFetch } from '_helpers/client';

export { useGuarantorService };

// user state store
const initialState = {
    users: undefined,
    user: undefined,
    currentGuarantor: undefined
};
const userStore = create<IGuarantorStore>(() => initialState);

function useGuarantorService(): IGuarantorService {
    const alertService = useAlertService();
    const loanService = useLoanService();
    const fetch = useFetch();
    const router = useRouter();
    const searchParams = useSearchParams();
    const { users, user, currentGuarantor } = userStore();

    return {
        users,
        user,
        currentGuarantor,
        login: async (username, password) => {
            alertService.clear();
            try {
                const currentGuarantor = await fetch.post('/api/account/login', { username, password });
                userStore.setState({ ...initialState, currentGuarantor });

                // get return url from query parameters or default to '/'
                const returnUrl = searchParams.get('returnUrl') || '/';
                router.push(returnUrl);
            } catch (error: any) {
                alertService.error(error);
            }
        },
        logout: async () => {
            await fetch.post('/api/account/logout');
            router.push('/account/login');
        },
        register: async (user) => {
            try {
                await fetch.post('/api/account/register', user);
                alertService.success('Registration successful', true);
                router.push('/account/login');
            } catch (error: any) {
                alertService.error(error);
            }
        },
        getAll: async () => {
            userStore.setState({ users: await fetch.get('/api/guarantor') });
        },
        getById: async (id) => {
            userStore.setState({ user: undefined });
            try {
                userStore.setState({ user: await fetch.get(`/api/guarantor/${id}`) });
            } catch (error: any) {
                alertService.error(error);
            }
        },
        getCurrent: async () => {
            if (!currentGuarantor) {
                userStore.setState({ currentGuarantor: await fetch.get('/api/guarantor/current') });
            }
        },
        create: async (user) => {
            
            user.username=user.nic
            await fetch.post('/api/guarantor', user);
            
         loanService.getById(user.loan_id)
    // const loanService = useLoanService();
    // const loan = loanService.loan;


        
// const useUserState = create((set, get) => ({
//   userId: undefined,
// }));


    // loanService.setState({ loan: await fetch.get(`/api/loans/${user.loan_id}`) });
    // do something with userId


    //   loanService.setState({ loan: undefined });
    //   try {
    //     loanService.setState({ loan: await fetch.get(`/api/loans/${user.loan_id}`) });
    //   } catch (error: any) {
    //     alertService.error(error);
    //   }
      
        },
        update: async (id, params) => {
            await fetch.put(`/api/guarantor/${id}`, params);

            // update current user if the user updated their own record
            if (id === currentGuarantor?.id) {
                userStore.setState({ currentGuarantor: { ...currentGuarantor, ...params } })
            }
        },
        
    delete: async (id, params) => {
        const response = await fetch.delete(`/api/guarantor/${id}`,params);
      },
    }
};

// interfaces

interface IGuarantor {
    id: string,
    fullName: string,
    gender: string,
    username: string,
    password: string,
    nic: any,
    loan_id: any,
    isDeleting?: boolean
}

interface IGuarantorStore {
    users?: IGuarantor[],
    user?: IGuarantor,
    currentGuarantor?: IGuarantor
}

interface ILoanItem {
    id: string;
  }
interface IGuarantorService extends IGuarantorStore {
    login: (username: string, password: string) => Promise<void>,
    logout: () => Promise<void>,
    register: (user: IGuarantor) => Promise<void>,
    getAll: () => Promise<void>,
    getById: (id: string) => Promise<void>,
    getCurrent: () => Promise<void>,
    create: (user: IGuarantor) => Promise<void>,
    update: (id: string, params: Partial<IGuarantor>) => Promise<void>,
    delete: (id: string,  params: Partial<ILoanItem>) => Promise<void>
}