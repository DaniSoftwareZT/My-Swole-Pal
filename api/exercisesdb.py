

for key in search.dict():
  if key.value is not None:
    url+= f"{key}={key.value}&"
