### Start
``` bash
npm start
````


#### Create
```bash
curl.exe -X POST -d '{"name":"Alice"}' http://localhost:3000/rest/users
```

#### get all
```bash
curl http://localhost:3000/rest/users
```

#### get by id
```bash
curl http://localhost:3000/rest/users/<id>
```

#### update
```bash
curl -X POST -d '{"name":"Bob"}' http://localhost:3000/rest/users/<id>
```

#### delete
```bash
curl -X DELETE http://localhost:3000/rest/users/<id>
```

#### get count
```bash
curl http://localhost:3000/rest/users/count
```

---
