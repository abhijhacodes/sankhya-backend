#### SETUP POSTGRESQL WITH DOCKER:

-   Create and start DB

```bash
docker run -p 5432:5432 -d \
    --name sankhya \
    -e POSTGRES_PASSWORD=admin123 \
    -e POSTGRES_USER=admin \
    -e POSTGRES_DB=sankhyadb \
    -v pgdata:/var/lib/postgresql/data \
    postgres
```

-   To connect to DB using terminal, to execute queries, alternatively you can use any GUI tool like [TablePlus](https://tableplus.com/) to interact with your DB

```bash
docker exec -it {container_id} psql -U admin sankhyadb
```

<br/>

#### SETUP REDIS WITH DOCKER:

-   Create and start redis

```bash
docker run -p 6379:6379 -d \
    --name sankhya-redis \
    -v redisdata:/data \
    redis
```

-   You can use a GUI tool like [Redis Insight](https://redis.com/redis-enterprise/redis-insight/) to interact with your redis instance

<br/>

#### QUERIES TO CREATE TABLES ON POSTGRESQL:

```bash
CREATE TABLE customers (
    customer_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    email TEXT UNIQUE NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
)
```

```bash
CREATE TABLE projects (
    project_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    project_name TEXT NOT NULL,
    api_key UUID DEFAULT gen_random_uuid(),
    customer_id UUID NOT NULL REFERENCES customers(customer_id),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
)
```

```bash
CREATE TABLE events (
    event_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    project_id UUID NOT NULL REFERENCES projects(project_id),
    city TEXT NOT NULL,
    state TEXT NOT NULL,
    country TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
)
```
