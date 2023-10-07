import { create } from "zustand";
import { useRouter, useSearchParams } from "next/navigation";

import { useAlertService } from "_services";
import { useFetch } from "_helpers/client";

export { useLoanService };

// loan state store
const initialState = {
  loans: undefined,
  summary: undefined,
  loan: undefined,
  currentLoan: undefined,
};
const loanStore = create<ILoanStore>(() => initialState);

function useLoanService(): ILoanService {
  const alertService = useAlertService();
  const fetch = useFetch();
  const router = useRouter();
  const searchParams = useSearchParams();
  const { loans,summary, loan, currentLoan } = loanStore();

  return {
    loans,
    summary,
    loan,
    currentLoan,
    login: async (interest_old, expected_price_old) => {
      alertService.clear();
      try {
        const currentLoan = await fetch.post("/api/account/login", {
          interest_old,
          expected_price_old,
        });
        loanStore.setState({ ...initialState, currentLoan });

        // get return url from query parameters or default to '/'
        const returnUrl = searchParams.get("returnUrl") || "/";
        router.push(returnUrl);
      } catch (error: any) {
        alertService.error(error);
      }
    },
    logout: async () => {
      await fetch.post("/api/account/logout");
      router.push("/account/login");
    },
    register: async (loan) => {
      try {
        await fetch.post("/api/account/register", loan);
        alertService.success("Registration successful", true);
        router.push("/account/login");
      } catch (error: any) {
        alertService.error(error);
      }
    },
    getAll: async () => {
      loanStore.setState({ loans: await fetch.get("/api/loans") });
    },
    getSummary: async () => {
      loanStore.setState({ summary: await fetch.get("/api/summary") });

    },
    getById: async (id) => {
      loanStore.setState({ loan: undefined });
      try {
        loanStore.setState({ loan: await fetch.get(`/api/loans/${id}`) });
      } catch (error: any) {
        alertService.error(error);
      }
    },
    getByNic: async (id) => {
      loanStore.setState({ loan: undefined });
      try {
        loanStore.setState({ loan: await fetch.get(`/api/guarantor/nic/${id}`) });
      } catch (error: any) {
        alertService.error(error);
      }
    },
    getCurrent: async () => {
      if (!currentLoan) {
        loanStore.setState({
          currentLoan: await fetch.get("/api/loans/current"),
        });
      }
    },
    create: async (loan) => {
      await fetch.post("/api/loans", loan);
    },
    update: async (id, params) => {
      const paramsData:any=params
      paramsData.payable_in_hand=(paramsData).toString()
console.log(paramsData)
       loanStore.setState({ loan: undefined });

      // try {
      await fetch.put(`/api/loans/${id}`, paramsData);

      // update current user if the user updated their own record
      if (id === currentLoan?.id) {
          loanStore.setState({ currentLoan: { ...currentLoan, ...paramsData } })
      }
      loanStore.setState({ loan: await fetch.get(`/api/loans/${id}`) });

            // } catch (error: any) {
      //   alertService.error(error);
      // }

      // try {
      //   await fetch.put(`/api/loans/${id}`, params);
      //   if (id === currentLoan?.id) {
      //     loanStore.setState({ currentLoan: { ...currentLoan, ...params } });
      //   }
      //   loanStore.setState({ loan: await fetch.get(`/api/loans/${id}`) });
      // } catch (error: any) {
      //   alertService.error(error);
      // }
    },
    updateItem: async (id, params) => {
      // console.log(params)
            try {
        await fetch.put(`/api/loan-item/${id}`, params);        
        // loanStore.setState({ loan: await fetch.get(`/api/loan-item/${id}`) });
      } catch (error: any) {
        alertService.error(error);
      }
    }
    ,
    delete: async (id) => {
      // set isDeleting prop to true on loan
      loanStore.setState({
        loans: loans!.map((x) => {
          if (x.id === id) {
            x.isDeleting = true;
          }
          return x;
        }),
      });

      // delete loan
      const response = await fetch.delete(`/api/loans/${id}`);

      // remove deleted loan from state
      loanStore.setState({ loans: loans!.filter((x) => x.id !== id) });

      // logout if the loan deleted their own record
      if (response.deletedSelf) {
        router.push("/account/login");
      }
    },
    deleteItem: async (id, params) => {
      const response = await fetch.put(`/api/loan-item-del/${id}?id=${params}`,params);
    },
  };
}

// interfaces

interface ILoan {
  id: string;
  estimated_price_old: string;
  user_id: any;
  customer:any;
  officer:any;
  loan_price_old: string;
  interest_old: string;
  expected_price_old: string;
  form_number: string;
  createdAt:any,
  isDeleting?: boolean;
  mortgage_branch?:any

}
interface ILoanItem {

  id: string;
  name: string;
  karat: string;
  net_weight: string;
  total_weight: string;
  pound: string;
  isDeleting?: boolean;

}

interface ILoanStore {
  loans?: ILoan[];
  summary?: any;
  loan?: ILoan;
  currentLoan?: ILoan;
}

interface ILoanService extends ILoanStore {
  login: (interest_old: string, expected_price_old: string) => Promise<void>;
  logout: () => Promise<void>;
  register: (loan: ILoan) => Promise<void>;
  getAll: () => Promise<void>;
  getSummary: () => Promise<void>;
  getById: (id: string) => Promise<void>;
  getByNic: (id: string) => Promise<void>;
  getCurrent: () => Promise<void>;
  create: (loan: ILoan) => Promise<void>;
  update: (id: string, params: Partial<ILoan>) => Promise<void>;
  updateItem: (id: string, params: Partial<ILoanItem>) => Promise<void>;
  delete: (id: string) => Promise<void>;
  deleteItem: (id: string, params: Partial<ILoanItem>) => Promise<void>;
}
