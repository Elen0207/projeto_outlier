from fastapi import File, UploadFile
from io import BytesIO
from sklearn.cluster import DBSCAN
import warnings
import pandas as pd
import matplotlib.pyplot as plt
import seaborn as sns
plt.rcParams.update({'font.size': 12})
warnings.filterwarnings('ignore')


def grafico_dispersao(ft1, ft2, file: UploadFile = File(...)):
  contents = file.file.read()
  df = pd.read_csv(BytesIO(contents))
  
  sns.scatterplot(data=df, x=ft2, y=ft1)
  plt.title('Gráfico de Dispersão - Outliers')
  plt.xlabel(ft1, fontsize=12)
  plt.ylabel(ft2, fontsize=12)
  plt.grid(True)
  plt.show()
  
  return True

def grafico_boxplot(ft, ft2, file: UploadFile = File(...)):
  contents = file.file.read()
  df = pd.read_csv(BytesIO(contents))
  
  plt.figure(figsize=(10, 5))
  sns.boxplot(x=ft, y=ft2, data=df)
  plt.xlabel(ft, fontsize=12)
  plt.ylabel(ft2, fontsize=12)
  plt.grid()
  plt.title("Gráfico de Boxplot - Outliers")
  plt.show()

  return True

def graficos_barras(ft1, ft2, file: UploadFile = File(...)):
  contents = file.file.read()
  df = pd.read_csv(BytesIO(contents))
    
  df.groupby([ft2]).max().plot(y=ft1, kind='bar', figsize=(12, 7.5))
  plt.rcParams['xtick.labelsize'] = 9
  plt.rcParams['xtick.labelsize'] = 9
  plt.title('Gráfico de Barras - Outliers')
  plt.xlabel(ft2, fontsize=12)
  plt.ylabel(ft1, fontsize=12)
  plt.grid(True)
  plt.show()
  
  return True

def grafico_dbscan(var, var2, file: UploadFile = File(...)):
  contents = file.file.read()
  df = pd.read_csv(BytesIO(contents))
  data = df[[var, var2]]
  model = DBSCAN(eps = 0.5, min_samples = 5)
  model.fit(data)

  # visualize outputs
  colors = model.labels_
  plt.scatter(data[var], data[var2], c= colors)
  plt.title('Gráfico DBSCAN')
  # plt.xlabel(var, fontsize=12)
  # plt.ylabel(var2, fontsize=12)
  # plt.grid(True)
  plt.show()
   
  return True