from fastapi import File, UploadFile
from io import BytesIO
import matplotlib.pyplot as plt
import warnings
import pandas as pd
import json
import time

plt.rcParams.update({'font.size': 12})
warnings.filterwarnings('ignore')


def calcular_boxplot(ft, file: UploadFile = File(...)):
    contents = file.file.read()
    df = pd.read_csv(BytesIO(contents))
    Q1 = df[ft].quantile(0.25)
    Q3 = df[ft].quantile(0.75)
    IQR = Q3 - Q1
    Lower_Band = Q1 - 1.5 * IQR
    Upper_Band = Q3 + 1.5 * IQR
    df.loc[df[ft] > Upper_Band, 'Outlier'] = 'True'
    df.loc[df[ft] < Lower_Band, 'Outlier'] = 'True'
    df_Out = df[df['Outlier'].notna()]

    file.file.close()
    return df_Out


def get_result_boxplot(ft, file: UploadFile = File(...)):
    df_outlier_boxplot = calcular_boxplot(ft, file)
    df_outlier_boxplot.head()

    result = df_outlier_boxplot.to_json(orient="values")
    response = json.loads(result)

    return response

def download_csv_boxplot(ft, file: UploadFile = File(...)):
    df_outlier_boxplot = calcular_boxplot(ft, file)
    agora = time.ctime()
    agora = agora.split()
    nome_arquivo = "~/result_boxplot_" + agora[3]
    path = nome_arquivo + "_" + file.filename
    
    return df_outlier_boxplot.to_csv(path, index=False, sep=';')
