# Il Lunario

Sito dimostrativo di una libreria immaginaria dedicata a libri, manga, fumetti,
giochi da tavolo e carte collezionabili, realizzato con Next.js 15 e React 19.
Palette blu notte, oro e avorio; homepage con cielo stellato animato, stelle
cadenti, timbro "Lasciati sorprendere", categorie, prodotti in evidenza,
racconto del negozio, invito alla visita e sezione "Dalla stampa" a scomparsa.

## Avvio

```sh
npm ci
npm run dev
```

Per la versione di produzione:

```sh
npm run build
npm start
```

## Contenuti e funzionamento

- Pagine: Home, Prodotti (ricerca, filtri per categoria e ordinamento), schede
  prodotto, Chi siamo, Contatti e pagina 404. I dati sono in `src/data`, i testi
  in `src/components/LanguageProvider.jsx`; non servono CMS né variabili d'ambiente.
- Interfaccia in italiano, inglese e francese: la lingua scelta resta salvata
  nel browser (`localStorage`).
- Nome, logo, borgo di Valfiaba, indirizzo, profilo Instagram e articolo della
  testata "Valfiaba24" sono inventati. La nota dimostrativa è il badge "Demo"
  nel footer (`#nota-demo`), senza banner in testata; il link dell'articolo
  nella sezione "Dalla stampa" porta a questa nota.
- I collegamenti a Instagram e Google Maps aprono le pagine generiche dei
  servizi, senza puntare ad account o luoghi reali.
- Il logo è originale: `public/logo-il-lunario.svg` è il sorgente,
  `public/logo-il-lunario.png` (768×768) è usato in header, footer e favicon.
- Le fotografie sono immagini di repertorio caricate da Unsplash tramite
  `next/image` (dominio consentito in `next.config.mjs`) e non ritraggono il
  negozio immaginario. Le immagini dei prodotti sono illustrative e non
  riproducono necessariamente le copertine o gli articoli descritti. I font
  Google sono gestiti da `next/font`: dev e build richiedono una connessione.
- Il modulo contatti valida i campi e prepara il messaggio solo nel browser,
  con copia negli appunti: non invia email e non salva dati.
- Le animazioni (cielo stellato, stelle cadenti, timbro, cursore a bacchetta
  magica) rispettano `prefers-reduced-motion`.
- I metadati `noindex, nofollow` escludono l'indicizzazione della demo.
