import axios from "axios";
import { Historics } from "../src/components/HistoricoComponents";
import { UserDataResponse } from "../src/components/LoginComponents";

export const api = axios.create({
  baseURL: "http://127.0.0.1:8000", //import.meta.env.VITE_API_URL
});

const header = {
  headers: {
    Accept: "application/json",
    "Content-type": "application/json;charset=UTF-8",
    "Access-Control-Allow-Origin": "*",
  },
};

const headerFormData = {
  headers: {
    "Content-Type": "multipart/form-data",
    "Access-Control-Allow-Origin": "*",
  },
};

// ************************ APIs calculos ************************
export const calculoBoxplot = async (
  csv: Blob | null | undefined,
  univariavel: string
): Promise<any> => {
  try {
    const formData: FormData = new FormData();
    if (csv != null && csv != undefined) formData.append("file", csv);

    const resp = await api.post(
      "/outlier/boxplot?ft=" + univariavel,
      formData,
      headerFormData
    );

    return resp.data;
  } catch (err) {
    console.log(err);
    return []
  }
};

export const calculoMad = async (
  csv: Blob | null | undefined,
  univariavel: string
): Promise<any> => {
  try {
    const formData: FormData = new FormData();
    if (csv != null && csv != undefined) formData.append("file", csv);

    const resp = await api.post(
      "/outlier/mad?ft=" + univariavel,
      formData,
      headerFormData
    );

    return resp.data;
  } catch (err) {
    console.log(err);
    return []
  }
};

export const calculoDbscan = async (
  csv: Blob | null | undefined,
  var1: string,
  var2: string
): Promise<any> => {
  try {
    const formData: FormData = new FormData();
    if (csv != null && csv != undefined) formData.append("file", csv);

    const resp = await api.post(
      "/outlier/dbscan?ft=" + var1 + "&ft2=" + var2,
      formData,
      headerFormData
    );
    return resp.data;
  } catch (err) {
    console.log(err);
    return []
  }
};

// ************************ APIs downloads ************************
export const downloadBoxplotCSV = async (
  csv: File | Blob,
  univariavel: string
): Promise<any> => {
  const formData: FormData = new FormData();
  if (csv != null && csv != undefined) formData.append("file", csv);

  await api
    .post("/outlier/csv_boxplot?ft=" + univariavel, formData, headerFormData)
    .then(() => {
      return true;
    })
    .catch((err) => {
      console.log(err);
      return err;
    });
};

export const downloadMadCSV = async (
  csv: File | Blob,
  univariavel: string
): Promise<any> => {
  const formData: FormData = new FormData();
  if (csv != null && csv != undefined) formData.append("file", csv);

  await api
    .post("/outlier/csv_mad?ft=" + univariavel, formData, headerFormData)
    .then(() => {
      return true;
    })
    .catch((err) => {
      console.log(err);
      return err;
    });
};

export const downloadDbscanCSV = async (
  csv: File | Blob,
  var1: string,
  var2: string
): Promise<any> => {
  const formData: FormData = new FormData();
  if (csv != null && csv != undefined) formData.append("file", csv);

  await api
    .post(
      "/outlier/csv_dbscan?ft=" + var1 + "&ft2=" + var2,
      formData,
      headerFormData
    )
    .then(() => {
      return true;
    })
    .catch((err) => {
      console.log(err);
      return err;
    });
};

// ************************ APIs gráficos ************************
export const showGrafico = async (
  csv: File,
  var1: string,
  var2: string,
  grafico: string
): Promise<any> => {
  const formData: FormData = new FormData();
  if (csv != null && csv != undefined) formData.append("file", csv);

  await api
    .post(
      "/outlier/" + grafico + "?ft=" + var1 + "&ft2=" + var2,
      formData,
      headerFormData
    )
    .then(() => {
      return true;
    })
    .catch((err) => {
      console.log(err);
      alert("Desculpe, mas não foi possível realizar um gráfico com essas variáveis")
    });
};

// ************************ APIs historico ************************
export const saveHistorics = async (
  outlier: boolean,
  nomeArquivo: string,
  idUser: number,
): Promise<any> => {
  const criado = new Date().toISOString();
  const data = {
    criado: criado,
    outlier: outlier,
    nome_arquivo: nomeArquivo,
    usuario: idUser
  };

  await api
    .post("/historicos", data, header)
    .then(() => {
      return true;
    })
    .catch((err) => {
      console.log(err);
      return false;
    });
};

export const getHistorics = async (): Promise<Historics> => {
  const resp = await api.get("/historicos", header);
  return resp.data;
};

// ************************ APIs users ************************
export const saveUser = async (
  nome: string,
  email: string,
  senha: string,
  departamento: string
): Promise<any> => {
  const data = {
    nome: nome,
    email: email,
    senha: senha,
    departamento: departamento,
  };

  await api
    .post("/usuarios", data, header)
    .then(() => {
      return true;
    })
    .catch((err) => {
      console.log(err);
      return false;
    });
};

export const getUser = async (email: string): Promise<UserDataResponse> => {
  const resp = await api.get<UserDataResponse>("/usuarios/" + email, header);
  return resp.data;
};

export const updateUser = async (
  nome: string,
  email: string,
  senha: string,
  departamento: string
): Promise<any> => {
  const data = {
    nome: nome,
    email: email,
    senha: senha,
    departamento: departamento,
  };

  await api
    .patch("/usuarios/" + email, data, header)
    .then(() => {
      return true;
    })
    .catch((err) => {
      console.log(err);
      return false;
    });
};

export const deleteUser = async (email: string): Promise<any> => {
  await api
    .delete("/usuarios/" + email, header)
    .then(() => {
      return true;
    })
    .catch((err) => {
      console.log(err);
      return false;
    });
};
