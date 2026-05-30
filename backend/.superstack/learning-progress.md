# Learning Progress

## SeaORM Entities (Rust)

### Understood (answered correctly under grill)
- `use sea_orm::entity::prelude::*` — wildcard import, brings all SeaORM types into scope
- Compile-time vs runtime errors — Rust catches missing imports at compile time
- `Serialize` / `Deserialize` — struct to JSON and back, used when sending API responses
- `Clone` — explicit duplication for complex types, needed when value used in two places
- `Debug` — enables `{:?}` printing for inspecting struct values during development
- `PartialEq` + `Eq` — enables `==` comparison; Eq requires PartialEq
- `pub` — makes types visible to other modules
- `string_value` in SeaORM enum — maps Rust variant to exact string stored in database
- Foreign key naming — `user_id` not `todoid`, field name should reflect what it stores
- `impl TraitName for TypeName {}` — implementing a trait for a type

### Shaky (needed hints or got partially wrong)
- `EnumIter` vs `DeriveActiveEnum` — confused which derives go on enum vs struct
- `DeriveEntityModel` — needed prompting to arrive at correct name for struct derive
- `Copy` trait — knew it existed but unsure when it applies
- Prelude concept — partial understanding, needed first principles explanation

### Not Yet Covered
- Database URL and connection setup
- SeaORM migrations
- Relations between User and Todo (belongs_to, has_many)
- Query building (find, insert, update, delete)
- API handlers
- Authentication / password hashing

### Errors Made in Code
- 2026-05-27 | todo.rs | `EmumIter` typo (x3) | Fixed after pointing out
- 2026-05-27 | todo.rs | `DeriveActionEnum` wrong name | Fixed after prompting
- 2026-05-27 | todo.rs | Missing `)` in db_type string | Fixed after bracket counting exercise
- 2026-05-27 | todo.rs | `in_progrss` typo | Fixed after prompting
- 2026-05-27 | todo.rs | `todoid` as primary key instead of `id` + `user_id` | Understood after Socratic questioning
- 2026-05-27 | todo.rs | Wrong derives on struct (EnumIter, DeriveActiveEnum) | Fixed after prompting
- 2026-05-27 | user.rs | Same wrong derives on struct | Fixed independently second time
- 2026-05-27 | user.rs | Extra comma in derives | Fixed independently

## TypeScript Todo Backend (Express + Prisma)

### Understood (answered correctly under grill)
- Default vs named imports — `import x from` vs `import { x } from`
- Relative paths — `./` for same level, `../` for parent, no prefix = node_modules
- `app.use(path, router)` — mounting a router at a prefix
- Express route prefix + router path combination (e.g. `/api/auth` + `/signup`)
- `getUserId(req)` — calling a plain function vs Zod `.safeParse()`
- Spread syntax `{ ...obj, key: value }` to merge objects
- `parseInt()` — global function, not a string method
- `updateTodo(id, userid, data)` — passing 3 separate args vs one object
- HTTP methods: POST for create, GET for read, PUT for update, DELETE for delete
- Status codes: 201 for created, 200 for success
- `return` vs `throw` — different control flow mechanisms
- JWT type consistency — sign a number, decode as number

### Shaky (needed hints or got partially wrong)
- Import paths — tried `@routes/...` (alias without config), `"routes/..."` (missing `./`), included `.ts` extension
- `app.use()` — first tried `app.use(api/auth/signin)` without string quotes or router arg
- `parseInt` — tried `req.params.id.parseInt()` (method syntax instead of global function)
- `getUserId` — tried `.safeParse(req.id)` (confused with Zod pattern), then `req.body`, then `req.header`
- Object spread — needed the pattern shown before writing it
- `getTodoController` — added unnecessary Zod-style `.success` check on userId

### Not Yet Covered
- Running the app and testing endpoints
- Error handling edge cases (e.g. NaN userid from JWT)
- TypeScript types for Express middleware (NextFunction)
- Environment variables setup (.env)
- Prisma schema field naming conventions (Description vs description)

### Errors Made in Code
- 2026-05-30 | index.ts | Incomplete `import` statement (line 2) | Fixed after prompting
- 2026-05-30 | todo.controller.ts | Import from wrong path `../lib/schema` | Fixed after pointing out
- 2026-05-30 | todo.controller.ts | Name collision — function and import both `createTodo` | Fixed to `createTodoController`
- 2026-05-30 | todo.controller.ts | `res.json(400)` instead of `res.status(400)` | Fixed after pointing out (missed once on second occurrence)
- 2026-05-30 | todo.controller.ts | Mixed `async function name() =>` syntax | Fixed after explaining two styles
- 2026-05-30 | todo.controller.ts | `unKnown` instead of `unknown` | Fixed
- 2026-05-30 | todo.controller.ts | `res.staus(500)` typo | Fixed
- 2026-05-30 | todo.controller.ts | `return throw new Error()` — mixed return and throw | Fixed after explanation
- 2026-05-30 | auth.middleware.ts | `@lib/jwt` alias without tsconfig | Fixed to `./jwt`
- 2026-05-30 | auth.middleware.ts | `startWith` instead of `startsWith` | Fixed
- 2026-05-30 | jwt.ts | `userId: string` return type instead of `number` | Fixed after explanation
