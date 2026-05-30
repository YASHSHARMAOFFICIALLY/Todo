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
