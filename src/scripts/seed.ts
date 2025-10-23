import { db } from "../db";
import { users } from "../db/schema";

async function main(){
  const seeduser: typeof users.$inferInsert = {
    email: "alice@example.com",
    name: "Alice johnson",
    avatarUrl: "https://api.dicebear.com/9.x/thumbs/svg?seed=alice",
    authId: "auth-uuid-001"
  }
  await db.insert(users).values(seeduser);
  console.log("seeding user successfull--");
  //verify user seeding
  const result = await db.select().from(users);
  console.log("Current users in database");
  console.log(result)
}

main()
  .then(()=> {
    console.log("Seeding completed");
    process.exit(0);
  })
  .catch((err)=> {
    console.error("seeding error:", err);
    process.exit(1);
  })