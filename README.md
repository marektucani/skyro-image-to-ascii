# Skyro: Image to ASCII

Vytvor textovú podobu PNG obrázka v termináli.

## Spustenie

```bash
npm install
npm start
npm start -- --image assets/pixel-invader.png
npm run typecheck
```

Zoznam obrázkov je v [assets/README.md](assets/README.md). Obrázok sa načítava v pôvodných rozmeroch.

## Úloha

V `src/student.ts` implementuj `renderImage(rows: Pixel[][]): string`.

- Navrhni si vlastné malé pomocné funkcie.
- Funkcie majú vracať hodnoty, nie vypisovať do konzoly.
- Premeň dáta obrázka na znaky tak, aby bol výsledok rozpoznateľný.
- Použi aspoň jeden jednoduchý a jeden väčší obrázok.

`starter/` nemeň. Obsahuje načítanie súboru a výpis výsledku.

## Hotovo

- `npm run typecheck` prejde.
- Výstup sa podobá na vybraný obrázok.
- Riešenie je v commite.
