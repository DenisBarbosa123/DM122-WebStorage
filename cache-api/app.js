const CACHE_KEY = 'poke-cache';

async function addToCache(requestUrl, response){
    const cache = await caches.open(CACHE_KEY);
    cache.put(requestUrl, response);
}

async function fetchFromNetwork(requestUrl) {
    const response = await fetch(requestUrl);
    addToCache(requestUrl, response.clone());
    return response;
}

async function fetchFromCache(requestUrl){
    const cache = await caches.open(CACHE_KEY);
    const cachedResponse = await cache.match(requestUrl);
    return cachedResponse || null;
}

async function showPokeData(){
    const pre = document.querySelector('pre');
    const img = document.querySelector('img');
    const details = document.querySelector('details');
    const requestUrl = 'https://pokeapi.co/api/v2/pokemon/282';
    const pokeDataResponse = (await fetchFromCache(requestUrl)) || (await fetchFromNetwork(requestUrl));
    const pokeData = await pokeDataResponse.json();
    pre.textContent = JSON.stringify(pokeData, null, 2);
    img.src = pokeData.sprites.other["official-artwork"].front_default;
    img.alt = pokeData.name;
    img.title = pokeData.name;
    details.hidden = false;
}