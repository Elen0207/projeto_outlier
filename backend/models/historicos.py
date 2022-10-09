from config.db import meta
from sqlalchemy import Table, Column
from sqlalchemy.sql.sqltypes import Integer, String, Boolean, DATETIME


tab_historic=Table(
    'tab_historic',meta,
    Column('id', Integer, primary_key=True),
    Column('criado', DATETIME(timezone=True)),
    Column('outlier', Boolean),
    Column('nome_arquivo', String(100)),
    Column('usuario', Integer),
  )