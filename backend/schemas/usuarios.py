from pydantic import BaseModel
from typing import Optional


class Usuarios(BaseModel):
  id: Optional[int]
  nome: str
  email: str
  senha: str
  departamento: str