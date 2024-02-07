import { useEffect, useState } from "react";
import "./App.css";

import { getAllPokemon, getPokemon } from "./utils/pokemon";

function App() {
  const initialURL = "https://pokeapi.co/api/v2/pokemon";

  // ローディング用
  const [loading, setLoading] = useState(true);
  const [pokemonData, setPokemonData] = useState([]);

  useEffect(() => {
    const fetchPokemonData = async () => {
      // 全てのポケモンのデータを取得
      let res = await getAllPokemon(initialURL);

      // 各ポケモンの詳細なデータを取得
      loadPokemon(res.results);

      setLoading(false);
    };

    fetchPokemonData();
  }, []);

  const loadPokemon = async (data) => {
    // Promise.all(配列): 全ての配列の処理の完了を待つ
    let _pokemonData = await Promise.all(
      data.map((pokemon) => {
        let pokemonRecord = getPokemon(pokemon.url);
        return pokemonRecord;
      })
    );

    setPokemonData(_pokemonData);
  };

  return (
    <div className="App">
      {loading ? <h1>ロード中…</h1> : <h1>ポケモンデータを取得しました。</h1>}
    </div>
  );
}

export default App;
