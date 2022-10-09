from sqlalchemy import create_engine, MetaData

engine=create_engine('mysql+pymysql://***:***6@localhost:3306/tcc_outlier')
meta=MetaData()
con=engine.connect()