(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))a(e);new MutationObserver(e=>{for(const s of e)if(s.type==="childList")for(const y of s.addedNodes)y.tagName==="LINK"&&y.rel==="modulepreload"&&a(y)}).observe(document,{childList:!0,subtree:!0});function n(e){const s={};return e.integrity&&(s.integrity=e.integrity),e.referrerPolicy&&(s.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?s.credentials="include":e.crossOrigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function a(e){if(e.ep)return;e.ep=!0;const s=n(e);fetch(e.href,s)}})();const h=window.axios,g="45354600-161e9d8fd3bcf6ec49a0bc2e6",m="https://pixabay.com/api/";async function u(r,t=1,n=15){const a=`${m}?key=${g}&q=${encodeURIComponent(r)}&image_type=photo&orientation=horizontal&safesearch=true&page=${t}&per_page=${n}`;try{return(await h.get(a)).data}catch(e){throw console.error(e),new Error("Failed to fetch images")}}let p;function f(r,t=!1){const n=document.querySelector(".gallery"),a=r.map(e=>`
    <a href="${e.largeImageURL}" class="gallery-item" data-caption="${e.tags}">
      <img src="${e.webformatURL}" alt="${e.tags}" loading="lazy" class="g-image">
      <div class="info">
        <p class="i-text"><span class="fat-el">Likes</span> ${e.likes}</p>
        <p class="i-text"><span class="fat-el">Views</span> ${e.views}</p>
        <p class="i-text"><span class="fat-el">Comments</span> ${e.comments}</p>
        <p class="i-text"><span class="fat-el">Downloads</span> ${e.downloads}</p>
      </div>
    </a>
  `).join("");t?n.insertAdjacentHTML("beforeend",a):n.innerHTML=a,p?p.refresh():p=new SimpleLightbox(".gallery a",{captions:!0,captionsData:"alt",captionDelay:250})}function i(r){iziToast.error({title:"Error",message:r})}const w=document.querySelector("#search-form"),b=document.querySelector(".gallery"),o=document.querySelector("#load-more"),d=document.querySelector("#loader");let c="",l=1;w.addEventListener("submit",async r=>{if(r.preventDefault(),c=r.target.elements.searchQuery.value.trim(),!c){i("Please enter a search query.");return}b.innerHTML="",l=1,o.style.display="none",d.style.display="block";try{const t=await u(c,l);t.hits.length===0?(i("Sorry, there are no images matching your search query. Please try again!"),o.style.display="none"):(f(t.hits),t.hits.length<15||l*15>=t.totalHits?o.style.display="none":o.style.display="flex")}catch{i("Failed to fetch images. Please try again later."),o.style.display="none"}finally{d.style.display="none"}});o.addEventListener("click",async()=>{l+=1,d.style.display="block";try{const r=await u(c,l);if(r.hits.length===0||l*15>=r.totalHits)o.style.display="none",iziToast.info({title:"Info",message:"We're sorry, but you've reached the end of search results."});else{f(r.hits,!0);const{height:t}=document.querySelector(".gallery").firstElementChild.getBoundingClientRect();window.scrollBy({top:t*2,behavior:"smooth"})}}catch{i("Failed to fetch images. Please try again later.")}finally{d.style.display="none"}});
//# sourceMappingURL=commonHelpers.js.map
