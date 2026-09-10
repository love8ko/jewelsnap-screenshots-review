(async()=>{
 const $=s=>document.querySelector(s);let data;
 try{const r=await fetch('gallery.json');if(!r.ok)throw Error('load');data=await r.json();}catch{$('#gallery').textContent='Не удалось загрузить галерею. Обновите страницу.';return;}
 const valid=id=>/^[VONR]0[1-8]$/.test(id);
 const original=id=>`originals/${id}.${id.startsWith('O')?'jpg':'png'}`;
 const container=$('#gallery');container.textContent='';
 for(const series of data.series){
  const section=document.createElement('section');section.id=series.prefix;
  const heading=document.createElement('h2');const tag=document.createElement('span');tag.className='tag';tag.textContent=series.prefix;heading.append(tag,document.createTextNode(series.name));section.append(heading);
  const row=document.createElement('div');row.className='row';row.setAttribute('aria-label',series.name);row.tabIndex=0;
  for(const id of series.frames){if(!valid(id))continue;const f=document.createElement('figure');const cap=document.createElement('figcaption');cap.textContent=id;const button=document.createElement('button');button.className='shot';button.dataset.id=id;button.setAttribute('aria-label',`Увеличить ${id}`);const img=document.createElement('img');img.src=`previews/${id}.jpg`;img.alt=`${id} — ${series.name}`;img.width=440;img.height=956;img.loading=id.startsWith('V')?'eager':'lazy';button.append(img);f.append(cap,button);row.append(f);
   button.addEventListener('click',()=>{const url=original(id);$('#viewer-title').textContent=id;$('#image-error').hidden=true;$('#large').hidden=false;$('#large').alt=`${id} — полный размер`;$('#large').src=url;$('#download').href=url;$('#download').download=url.split('/').pop();$('#full').href=url;$('#retry-original').href=url;$('#viewer').showModal();});
  }
  section.append(row);container.append(section);
 }
 $('#large').addEventListener('error',()=>{$('#large').hidden=true;$('#image-error').hidden=false;});
 $('#close').addEventListener('click',()=>$('#viewer').close());
 $('#viewer').addEventListener('click',e=>{if(e.target!==$('#viewer'))return;const r=e.target.getBoundingClientRect();if(e.clientX<r.left||e.clientX>r.right||e.clientY<r.top||e.clientY>r.bottom)e.target.close();});
 $('#version').textContent=data.version;window.galleryReady=true;
})();
