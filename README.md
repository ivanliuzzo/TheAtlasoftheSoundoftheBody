# Web Documentation Process — Ivan Liuzzo

Sito statico, nessun software richiesto oltre a un editor di testo e GitHub.

## Struttura

```
index.html       pagina iniziale (titolo, cliccabile)
archive.html      pagina archivio (colonne R / T / S)
schede.html       catalogo grezzo (le 34 schede / immagini non editate) — apertura esterna
data.js           tutti i contenuti dell'archivio: didascalie, note, riferimenti immagine
schede-data.js    dati del catalogo grezzo, generati dal tuo Excel
style.css         aspetto (bianco/nero, monospace, piccolo)
script.js         logica archivio (colonne, pannelli affiancati)
images/           TUTTE le immagini già rinominate e pronte, incluse
```

Le immagini sono già dentro `images/` con i nomi corretti — non devi rinominare nulla, il sito funziona subito.

## Come scrivere le note

Ogni voce in `data.js` ha:

```js
note: ""
```

Scrivi il tuo testo dentro le virgolette. Puoi farlo anche direttamente su GitHub: apri `data.js` nel repository, clicca la matita (edit), scrivi, fai commit. Non serve scaricare nulla.

## Come vedere il sito prima di caricarlo

Doppio click su `index.html`, si apre nel browser, funziona anche offline.

## Come metterlo online con GitHub Pages

1. Crea un repository nuovo su GitHub
2. Carica dentro tutti i file e cartelle di questo pacchetto
3. Settings → Pages → Source: branch `main`, cartella `/ (root)`
4. Dopo un minuto il sito è online

## Video di Wilkens (agosto)

Non sono una sezione a parte: quando li recuperi, aggiungili come normali voci dentro il nucleo T giusto (o uno nuovo, se serve), con `date: "2026-08"` — si posizioneranno naturalmente in coda alla sequenza cronologica di T. Aggiungi un campo:

```js
video: "videos/nome-file.mp4"
```

e crea una cartella `videos/` accanto a `images/`.

## Catalogo grezzo (schede.html)

Generato automaticamente dal file Excel del corpus (28 schede, 198 immagini). Se aggiungi materiale nuovo al corpus, va aggiornato l'Excel e poi rigenerato `schede-data.js` — chiedimelo quando serve. Le immagini di questa pagina vanno in `images/schede/`, con lo stesso nome della colonna "FILE ORIGINALE" nel tuo Excel.

## Aggiungere nuovo materiale all'archivio

In `data.js`, dentro l'array `items` del nucleo giusto (o creando un nuovo nucleo copiando la struttura), aggiungi:

```js
{ id:"#141", date:"2026-08", caption:"descrizione breve", note:"", img:"nome-file.jpg" }
```

