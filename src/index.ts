import { Console, Effect } from "effect";
import { err, ok, Result } from "neverthrow";

// const program = Console.log("Hello, World!");
// Effect.runSync(program);
// console.log({ program });

// chapter6
// smart constructors
// class Person {
//   constructor(readonly name: string, readonly age: number) {}
// }
// ageにありえない値を入れることができる
// const tarou = new Person("Tarou", -20);
// { name: 'Tarou', age: -20 }

// これを防ぐためにsmart constructorsを使う
// class Person2 {
//   private constructor(readonly name: string, readonly age: number) {}

//   static create(name: string, age: number): Effect.Effect<Person2, Error> {
//     if (age < 0 || age > 120 || name.length === 0 || name.length > 100) {
//       return Effect.fail(new Error("Invalid arguments"));
//     }
//     return Effect.succeed(new Person2(name, age));
//   }
// }
// error, valueの取り出し方がよくわからぬ
// Effect.runSync(() => {
//   const ken = Person2.create("ken", -20);
//   console.log({ ken });

//   const dan = Person2.create("Dan", 20);
//   console.log({ dan });

//   return { ken, dan };
// });

type hoge = new () => Person;
class Person {
  // インスタンス生成時に制約を設けるため、private constructorを使う
  private constructor(readonly name: string, readonly age: number) {}

  static create({
    name,
    age,
  }: {
    name: string;
    age: number;
  }): Result<Person, Error> {
    if (age < 0 || age > 120) {
      return err(new Error("Invalid age"));
    }

    if (name.length === 0 || name.length > 100) {
      return err(new Error("Invalid name"));
    }

    return ok(new Person(name, age));
  }
}
//　Result使うだけなら、neverthrowのほうがわかりやすい
const ken = Person.create({ name: "", age: 90 });
console.log(ken.unwrapOr("error"));

if (ken.isOk()) {
  console.log(ken.value);
} else {
  console.log(ken.error.message);
}
