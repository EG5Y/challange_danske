
function ListItem({ text }: {text: string}) {
  return   <li className=" flex gap-4 p-4 bg-mid-one font-medium rounded-2xl">
    <input type="checkbox"/>
    <input type="text" value={text} className="bg-transparent"/>
  </li>
}

export default async function Index() {
  return (
    <main className="mx-auto w-4/5 flex flex-col gap-4">
      <header className="pt-10">
        <h1 className="text-[2rem]">Danske TODO</h1>
      </header>
      <hr/>
      <section className="   ">
        <ul className=" flex flex-col gap-4 ">
          <ListItem text="Margherita Pizza"/>
          <ListItem text="Margherita Pizza"/>
        </ul>
      </section>
    </main>
  );
}
