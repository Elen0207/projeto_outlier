from datetime import datetime
from pydantic import BaseModel
from typing import Optional


class Historicos(BaseModel):
  id: Optional[int]
  criado: datetime
  outlier: bool
  nome_arquivo: str
  usuario: int