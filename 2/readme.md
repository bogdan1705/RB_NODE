```markdown
# Minimal Node.js CRUD — Controller / Service / Model

> Чистий Node.js (без Express) + `database.json` у ролі бази даних  
> Стек поділено на **Model → Service → Controller** для демонстрації шарової архітектури.

---

## 📂 Структура проєкту

```

my-crud/
├─ package.json              # "type": "module"
├─ index.js                  # HTTP-вхід (маршрути)
├─ controllers/
│   └─ users.controller.js   # HTTP-шар
├─ services/
│   └─ users.service.js      # бізнес-логіка
├─ models/
│   └─ users.model.js        # робота з файлом-БД
└─ database.json             # спочатку \[]

``` bash
 npm start          # node index.js
````


#### Створити
```bash
curl.exe -X POST -d '{"name":"Alice"}' http://localhost:3000/rest/users
```

#### Отримати всіх
```bash
curl http://localhost:3000/rest/users
```

#### Отримати одного
```bash
curl http://localhost:3000/rest/users/<id>
```

#### Оновити
```bash
curl -X POST -d '{"name":"Bob"}' http://localhost:3000/rest/users/<id>
```

#### Видалити
```bash
curl -X DELETE http://localhost:3000/rest/users/<id>
```

#### Отримати каунт
```bash
curl http://localhost:3000/rest/users/count
```

---
