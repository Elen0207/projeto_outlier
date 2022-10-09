from fastapi import File, UploadFile
from io import BytesIO
from sklearn.cluster import DBSCAN
import pandas as pd
import json
import time

def calcular_dbscan(file, var1, var2):
  contents = file.file.read()
  df = pd.read_csv(BytesIO(contents))
  data = df[[var1, var2]]
  model = DBSCAN(eps = 0.5, min_samples = 5)
  model.fit(data)
  df['Outlier'] = 'True'
  df_Out = df[model.labels_ == -1]

  return df_Out


def get_result_dbscan(var1, var2, file: UploadFile = File(...)):
    outlier_dbscan = calcular_dbscan(file, var1, var2)
    result = outlier_dbscan.to_json(orient="values")
    response = json.loads(result)

    return response


def download_csv_dbscan(var1, var2, file: UploadFile = File(...)):
    outlier_dbscan = calcular_dbscan(file, var1, var2)
    agora = time.ctime()
    agora = agora.split()
    nome_arquivo = "~/result_dbscan_" + agora[3]
    path = nome_arquivo + "_" + file.filename

    return outlier_dbscan.to_csv(path, index=False, sep=';')