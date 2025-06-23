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
│   └─ habit.controller.js   # HTTP-шар
├─ services/
│   └─ habit.service.js      # бізнес-логіка
├─ models/
│   └─ habit.model.js        # робота з файлом-БД
└─ database.json             # спочатку \[]

````

---

## 🚀 Запуск

```bash
npm install        # немає залежностей, але створює lock-файл
npm start          # node index.js
# ⇒ сервер слухає http://localhost:3000
````

---

## 🔌 REST-ендпоїнти

| Метод      | URL          | Тіло / параметри | Опис                     |
| ---------- | ------------ | ---------------- | ------------------------ |
| **GET**    | `/users`     | —                | Список усіх користувачів |
| **GET**    | `/users/:id` | —                | Користувач за `id`       |
| **POST**   | `/users`     | `{ "name":"" }`  | Створити                 |
| **PATCH**  | `/users/:id` | часткові поля    | Оновити                  |
| **DELETE** | `/users/:id` | —                | Видалити                 |

### Приклади `curl`

#### Створити
```bash
curl -X POST -H "Content-Type: application/json" \
     -d '{"name":"Alice"}' http://localhost:3000/users
```

#### Отримати всіх
```bash
curl http://localhost:3000/users
```

#### Отримати одного
```bash
curl http://localhost:3000/users/<id>
```

#### Оновити
```bash
curl -X PATCH -H "Content-Type: application/json" \
     -d '{"name":"Bob"}' http://localhost:3000/users/<id>
```

#### Видалити
```bash
curl -X DELETE http://localhost:3000/users/<id>
```

---

## 🛠️ Деталі реалізації

| Шар                             | Відповідальність                                                          |
| ------------------------------- | ------------------------------------------------------------------------- |
| **Model** (`models/`)           | Читає й пише `database.json` через `fs/promises`. Жодної бізнес-логіки.   |
| **Service** (`services/`)       | Агрегує дані, перевіряє існування, формує об’єкти, **не** займається I/O. |
| **Controller** (`controllers/`) | Парсить HTTP-запит, викликає сервіс, відправляє HTTP-статус/JSON.         |
| **index.js**                    | Робить найпростішу маршрутизацію `"/users"` та `"/users/:id"`.            |

---

## 🤔 Навіщо так дрібнити?

* **Тестованість:** бізнес-логіка (Service) ізольована від HTTP та файлової системи.
* **Замінність «БД»:** достатньо переписати Model на Mongo / PostgreSQL — інші шари не змінюються.
* **Прозорість:** у кожному шарі видно лише свою зону відповідальності.

---
