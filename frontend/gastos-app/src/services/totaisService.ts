import api from "./api";
import { TotaisGerais } from "../types";

export const totaisService = {
  obter: () => api.get<TotaisGerais>("/totais").then(r => r.data),
};