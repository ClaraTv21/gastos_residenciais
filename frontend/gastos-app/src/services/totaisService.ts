import api from "./api";
import type { TotaisGerais } from "../types";

export const totaisService = {
  obter: () => api.get<TotaisGerais>("/totais").then(r => r.data),
};