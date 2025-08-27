export const ProductCard = () => {
  return (
    <div className="bg-blue-300 flex justify-center">
      <main className="bg-white w-full max-w-xs md:max-w-lg mt-10 p-3 border-rose-400 border-2 md:grid md:grid-cols-2 md:max-w-3lg md:gap-4">
        <img src="https://res.cloudinary.com/dtattw8cd/image/upload/v1755829583/m1jqkb3txfaoy9k5qsau.png" className="row-span-2"/>
        <section>
          <h1 className="font-bold text-2xl">Book Name</h1>
          <p className="text-md">Subtile</p>
          <h2 className="text-5xl font-light my-4">$1<span className="font-light text-lg">.35</span></h2>
          <p className="font-light text-gray-400">Description of book</p>
          <section className="flex items-center py-2">
            <button className="bg-gradient-to-tl from-orange-400 to-cyan-400 rounded-lg text-white font-bold uppercase flex-grow hover:bg-gradient-to-br hover:from-orange-400 hover:to-cyan-400 p-2">Add to cart</button>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="size-6 stroke-orange-400 ml-2">
              <path stroke-linecap="round" stroke-linejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z" />
            </svg>
          </section>

          <h3 className="font-light text-slate-400 uppercase">General information:</h3>
          <ul className="list-disc pl-2 marker:text-amber-400">
            <li className=""><span className="font-bold">Author:</span> Stephen Hawking</li>
            <li className=""><span className="font-bold">Publisher:</span></li>
            <li className=""><span className="font-bold">Year:</span> 1988</li>
          </ul>
        </section>
        
      </main>  

    </div>
  );
};