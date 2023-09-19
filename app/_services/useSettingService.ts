import { create } from "zustand";
import { useRouter, useSearchParams } from "next/navigation";

import { useAlertService } from "_services";
import { useFetch } from "_helpers/client";

export { useSettingService };

// setting state store
const initialState = {
  settings: undefined,
  summary: undefined,
  setting: undefined,
  currentSetting: undefined,
};
const settingStore = create<ISettingStore>(() => initialState);

function useSettingService(): ISettingService {
  const alertService = useAlertService();
  const fetch = useFetch();
  const router = useRouter();
  const searchParams = useSearchParams();
  const { settings,summary, setting, currentSetting } = settingStore();

  return {
    settings,
    summary,
    setting,
    currentSetting,
    getAll: async () => {
      settingStore.setState({ settings: await fetch.get("/api/settings") });
    },
    getById: async (id) => {
      settingStore.setState({ setting: undefined });
      try {
        settingStore.setState({ setting: await fetch.get(`/api/settings/${id}`) });
      } catch (error: any) {
        alertService.error(error);
      }
    },
    create: async (setting) => {
      await fetch.post("/api/settings", setting);
    },
    update: async (id, params) => {
      settingStore.setState({ setting: undefined });
      try {
        
        await fetch.put(`/api/settings/${id}`, params);

        if (id === currentSetting?.id) {
          settingStore.setState({ currentSetting: { ...currentSetting, ...params } });
        }
        settingStore.setState({ setting: await fetch.get(`/api/settings/${id}`) });
      } catch (error: any) {
        alertService.error(error);
      }
    },
    updateItem: async (id, params) => {
      // console.log(params)
            try {
        // console.log(params.estimated_price_old);
        await fetch.put(`/api/setting-item/${id}`, params);        
        // settingStore.setState({ setting: await fetch.get(`/api/setting-item/${id}`) });
      } catch (error: any) {
        alertService.error(error);
      }
    }
    ,
    delete: async (id) => {
      // set isDeleting prop to true on setting
      settingStore.setState({
        settings: settings!.map((x) => {
          if (x.id === id) {
            x.isDeleting = true;
          }
          return x;
        }),
      });

      // delete setting
      const response = await fetch.delete(`/api/settings/${id}`);

      // remove deleted setting from state
      settingStore.setState({ settings: settings!.filter((x) => x.id !== id) });

      // logout if the setting deleted their own record
      if (response.deletedSelf) {
        router.push("/account/login");
      }
    },
    deleteItem: async (id, params) => {
      const response = await fetch.put(`/api/setting-item-del/${id}?id=${params}`,params);
    },
  };
}

// interfaces

interface ISetting {
  id: string;
  estimated_price_old: string;
  user_id: any;
  customer:any;
  officer:any;
  setting_price_old: string;
  interest_old: string;
  expected_price_old: string;
  form_number: string;
  createdAt:any,
  isDeleting?: boolean;
  mortgage_branch?:any

}
interface ISettingItem {

  id: string;
  name: string;
  karat: string;
  net_weight: string;
  total_weight: string;
  pound: string;
  isDeleting?: boolean;

}

interface ISettingStore {
  settings?: ISetting[];
  summary?: any;
  setting?: ISetting;
  currentSetting?: ISetting;
}

interface ISettingService extends ISettingStore {
  getAll: () => Promise<void>;
  getById: (id: string) => Promise<void>;
  create: (setting: ISetting) => Promise<void>;
  update: (id: string, params: Partial<ISetting>) => Promise<void>;
  updateItem: (id: string, params: Partial<ISettingItem>) => Promise<void>;
  delete: (id: string) => Promise<void>;
  deleteItem: (id: string, params: Partial<ISettingItem>) => Promise<void>;
}
