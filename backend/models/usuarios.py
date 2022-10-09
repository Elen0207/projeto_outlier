from config.db import meta
from sqlalchemy import Table, Column
from sqlalchemy.sql.sqltypes import Integer, String


tab_users=Table(
    'tab_users',meta,
    Column('id', Integer, primary_key=True),
    Column('nome', String(100)),
    Column('email', String(100), unique=True),
    Column('senha', String(50)),
    Column('departamento', String(50))
  )