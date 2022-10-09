# para rodar primeiro precisa ativar o env com o comando => source env/bin/activate
# e depois rodar o comando => uvicorn main:app --reload
# no link http://127.0.0.1:8000/docs# é possível testar a api

from fastapi import FastAPI, File, UploadFile, status, HTTPException
from fastapi.middleware.cors import CORSMiddleware

import src.mad as mad
import src.dbscan as dbscan
import src.graficos as graficos
import src.boxplot as boxplot

from schemas.usuarios import Usuarios
from schemas.historicos import Historicos
from config.db import con
from models.usuarios import tab_users
from models.historicos import tab_historic

app=FastAPI()

origins = [
    "http://localhost.tiangolo.com",
    "https://localhost.tiangolo.com",
    "http://localhost",
    "http://localhost:8080",
    "http://localhost:3000",
    "*"
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

## Api's database
## Usuarios
@app.post('/usuarios')
async def create_usuario(usuario: Usuarios):
  data=con.execute(tab_users.insert().values(                                       
      nome=usuario.nome,
      email=usuario.email,
      senha=usuario.senha,
      departamento=usuario.departamento
    ))
  if data.is_insert: 
    return {
      "sucesso": True,
      "usuario": data
    }
  else:
    return {
      "sucesso": False,
      "msg": data
    }
    
    
@app.get('/usuarios/{email}')  
async def get_usuarios(email: str):
    data = con.execute(tab_users.select().where(tab_users.c.email == email)).fetchall() 
    if data: 
      return {
        "sucesso": True,
        "usuario": data
      }
    else:
      return {
        "sucesso": False,
        "msg": "Usuario não localizado"
      }
   
      
@app.patch('/usuarios/{email}')  
async def update_usuarios(email:str, usuario:Usuarios):
  data = con.execute(tab_users.update().values(
      nome=usuario.nome,
      email=usuario.email,
      senha=usuario.senha,
      departamento=usuario.departamento
    ).where(tab_users.c.email == email))
                     
  if data: 
    return {
      "sucesso": True,
      "usuario": data
    }
  else:
    return {
      "sucesso": False,
      "msg": "Usuario não localizado"
    }
    

@app.delete('/usuarios/{email}')  
async def delete_usuarios(email: str):
    data = con.execute(tab_users.delete().where(tab_users.c.email == email))
    if data: 
      return {
        "sucesso": True,
        "usuario": data
      }
    else:
      return {
        "sucesso": False,
        "msg": "Usuario não localizado"
      }
      

## Api's database
## Historicos      
@app.post('/historicos')
async def create_historic(hiscoricos: Historicos):
  data=con.execute(tab_historic.insert().values(                                       
      criado=hiscoricos.criado,
      outlier=hiscoricos.outlier,
      nome_arquivo=hiscoricos.nome_arquivo,
      usuario=hiscoricos.usuario,
    ))
  if data.is_insert: 
    return {
      "sucesso": True,
      "historicos": data
    }
  else:
    return {
      "sucesso": False,
      "msg": data
    }
    
    
@app.get('/historicos')  
async def get_histories():
    data = con.execute(tab_historic.select()).fetchall() 
    if data: 
      return {
        "sucesso": True,
        "histories": data
      }
    else:
      return {
        "sucesso": False,
        "msg": "Históricos não localizado"
      }
      
      
# Api's calculos
@app.post('/outlier/boxplot')
async def calculate_boxplot(ft, file: UploadFile = File(...)):
    try:
        result = boxplot.get_result_boxplot(ft, file)
        return result
    except:
        raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
                            detail=f"Ocorreu um erro no cálculo")


@app.post('/outlier/mad')
async def calculate_mad(ft, file: UploadFile = File(...)):
    try:
        result = mad.get_mediana_valor(ft, file)
        return result
    except:
        raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
                            detail=f"Ocorreu um erro no cálculo")


@app.post('/outlier/dbscan')
async def calculate_dbscan(ft, ft2, file: UploadFile = File(...)):
    try:
        result = dbscan.get_result_dbscan(ft, ft2, file)
        return result
    except:
        raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
                            detail=f"Ocorreu um erro no cálculo")


# Api download csv
@app.post('/outlier/csv_boxplot')
async def get_csv_boxplot(ft, file: UploadFile = File(...)):
    try:
      boxplot.download_csv_boxplot(ft, file)
      return True
    except:
      raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
                            detail=f"Ocorreu um erro no cálculo")


@app.post('/outlier/csv_mad')
async def get_csv_mad(ft, file: UploadFile = File(...)):
    try:
      mad.download_csv_mad(ft, file)
      return True
    except:
      raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
                            detail=f"Ocorreu um erro no cálculo")


@app.post('/outlier/csv_dbscan')
async def get_csv_dbscan(ft, ft2, file: UploadFile = File(...)):
    try:
      dbscan.download_csv_dbscan(ft, ft2, file)
      return True
    except:
      raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
                            detail=f"Ocorreu um erro no cálculo")


# Api Graficos
@app.post('/outlier/grafico_barras')
async def get_grafico_barras(ft, ft2, file: UploadFile = File(...)):
    try:
      result = graficos.graficos_barras(ft, ft2, file)
      return result
    except:
      raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
                            detail=f"Ocorreu um erro no cálculo")


@app.post('/outlier/grafico_dispersao')
async def get_grafico_dispersao(ft, ft2, file: UploadFile = File(...)):
    try:
      result = graficos.grafico_dispersao(ft, ft2, file)
      return result
    except:
      raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
                            detail=f"Ocorreu um erro no cálculo")


@app.post('/outlier/grafico_boxplot')
async def get_grafico_boxplot(ft, ft2, file: UploadFile = File(...)):
    try:
      result = graficos.grafico_boxplot(ft, ft2, file)
      return result
    except:
      raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
                            detail=f"Ocorreu um erro no cálculo")


@app.post('/outlier/grafico_dbscan')
async def get_grafico_dbscan(ft, ft2, file: UploadFile = File(...)):
    try:
        result = graficos.grafico_dbscan(ft, ft2, file)
        return result
    except:
        raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
                            detail=f"Ocorreu um erro no cálculo")
