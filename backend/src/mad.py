import time
import warnings
import pandas as pd
from fastapi import File, UploadFile
from io import BytesIO
import json
import matplotlib.pyplot as plt
plt.rcParams.update({'font.size': 12})
warnings.filterwarnings('ignore')


def outlier_MAD(ft, file: UploadFile = File(...)):
  contents = file.file.read()
  df = pd.read_csv(BytesIO(contents))
  df.sort_values(by=[ft])
  mediana_valor = df[ft].median()
  df['MAD_Valor'] = df[ft] - mediana_valor
  MAD_Sup = mediana_valor + (4.45 * df['MAD_Valor'].mean())
  MAD_Inf = mediana_valor - (4.45 * df['MAD_Valor'].mean())
  df['Outlier'] = ' '
  df.loc[df['MAD_Valor'] >= MAD_Sup, 'Outlier'] = 'True'
  df.loc[df['MAD_Valor'] <= MAD_Inf, 'Outlier'] = 'True'
  df_Out = df[df['Outlier'] == 'True']

  file.file.close()
  return df_Out 


def get_mediana_valor(ft, file: UploadFile = File(...)):
  df_outlier_MAD = outlier_MAD(ft, file)
  df_outlier_MAD.head()
  result = df_outlier_MAD.to_json(orient="values")
  response = json.loads(result)

  return response


def download_csv_mad(ft, file: UploadFile = File(...)):
  df_outlier_MAD = outlier_MAD(ft, file)
  agora = time.ctime()
  agora = agora.split()
  nome_arquivo = "~/result_mad_" + agora[3]
  path = nome_arquivo + "_" + file.filename

  return df_outlier_MAD.to_csv(path, index=False, sep=';')