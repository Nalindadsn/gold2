import { create } from "zustand";
import { useRouter, useSearchParams } from "next/navigation";

import { useAlertService } from "_services";
import { useFetch } from "_helpers/client";

export { useRateService };

// rate state store
const initialState = {
  rates: undefined,
  summary: undefined,
  rate: undefined,
  currentRate: undefined,
};
const rateStore = create<IRateStore>(() => initialState);

function useRateService(): IRateService {
  const alertService = useAlertService();
  const fetch = useFetch();
  const router = useRouter();
  const searchParams = useSearchParams();
  const { rates,summary, rate, currentRate } = rateStore();

  return {
    rates,
    summary,
    rate,
    currentRate,
    getAll: async () => {
      rateStore.setState({ rates: await fetch.get("/api/rates") });
    },
    getById: async (id) => {
      rateStore.setState({ rate: undefined });
      try {
        rateStore.setState({ rate: await fetch.get(`/api/rates/${id}`) });
      } catch (error: any) {
        alertService.error(error);
      }
    },
    create: async (rate) => {
      await fetch.post("/api/rates", rate);
    },
    update: async (id, params) => {
      rateStore.setState({ rate: undefined });
      try {
        
        await fetch.put(`/api/rates/${id}`, params);

        if (id === currentRate?.id) {
          rateStore.setState({ currentRate: { ...currentRate, ...params } });
        }
        rateStore.setState({ rate: await fetch.get(`/api/rates/${id}`) });
      } catch (error: any) {
        alertService.error(error);
      }
    },
    updateItem: async (id, params) => {
      // console.log(params)
            try {
        // console.log(params.estimated_price_old);
        await fetch.put(`/api/rate-item/${id}`, params);        
        // rateStore.setState({ rate: await fetch.get(`/api/rate-item/${id}`) });
      } catch (error: any) {
        alertService.error(error);
      }
    }
    ,
    delete: async (id) => {
      // set isDeleting prop to true on rate
      rateStore.setState({
        rates: rates!.map((x) => {
          if (x.id === id) {
            x.isDeleting = true;
          }
          return x;
        }),
      });

      // delete rate
      const response = await fetch.delete(`/api/rates/${id}`);

      // remove deleted rate from state
      rateStore.setState({ rates: rates!.filter((x) => x.id !== id) });

      // logout if the rate deleted their own record
      if (response.deletedSelf) {
        router.push("/account/login");
      }
    },
    deleteItem: async (id, params) => {
      const response = await fetch.put(`/api/rate-item-del/${id}?id=${params}`,params);
    },
  };
}

// interfaces

interface IRate {
  id: string;
  estimated_price_old: string;
  user_id: any;
  customer:any;
  officer:any;
  rate_price_old: string;
  interest_old: string;
  expected_price_old: string;
  form_number: string;
  createdAt:any,
  isDeleting?: boolean;
  mortgage_branch?:any

}
interface IRateItem {

  id: string;
  name: string;
  karat: string;
  net_weight: string;
  total_weight: string;
  pound: string;
  isDeleting?: boolean;

}

interface IRateStore {
  rates?: IRate[];
  summary?: any;
  rate?: IRate;
  currentRate?: IRate;
}

interface IRateService extends IRateStore {
  getAll: () => Promise<void>;
  getById: (id: string) => Promise<void>;
  create: (rate: IRate) => Promise<void>;
  update: (id: string, params: Partial<IRate>) => Promise<void>;
  updateItem: (id: string, params: Partial<IRateItem>) => Promise<void>;
  delete: (id: string) => Promise<void>;
  deleteItem: (id: string, params: Partial<IRateItem>) => Promise<void>;
}
