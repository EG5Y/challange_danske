
export default async function Index() {
  return (
    <main className="">
      <header className="text-center">
        <h1 className="text-[5rem]">Danske TODO</h1>
      </header>
      <section className="mx-auto w-4/5 border-2 border-blue-500 p-5">
        <ul className="border-2 border-red-500 p-5">
          <li className=" p-4 bg-mid-one font-medium rounded-2xl">
                <input type="checkbox"/>
            <input type="text" value="Margherita Pizza"/>
          </li>
          <li className=" bg-high-one">wow</li>
        </ul>
      </section>
    </main>
  );
}
