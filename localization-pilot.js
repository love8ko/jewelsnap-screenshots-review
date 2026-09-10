(async()=>{
 const $=selector=>document.querySelector(selector);let data;
 try{const response=await fetch('localization-pilot.json',{cache:'no-store'});if(!response.ok)throw Error('load');data=await response.json();}catch{$('#pilot').textContent='Не удалось загрузить пилот. Обновите страницу.';return;}
 const main=$('#pilot');main.textContent='';
 document.documentElement.style.setProperty('--preview','180px');
 for(const rowData of data.rows){
  const section=document.createElement('section');const heading=document.createElement('h2');const tag=document.createElement('span');tag.className='tag';tag.textContent=rowData.tag;heading.append(tag,document.createTextNode(rowData.name));section.append(heading);
  const row=document.createElement('div');row.className='row pilot-row';row.setAttribute('aria-label',rowData.name);
  for(const item of rowData.frames){const figure=document.createElement('figure');const caption=document.createElement('figcaption');caption.textContent=item.id;const button=document.createElement('button');button.className='shot';button.type='button';button.setAttribute('aria-label',`Увеличить ${item.id}`);const image=document.createElement('img');image.src=`${item.preview}?v=${encodeURIComponent(data.version)}`;image.alt=`${item.id} — ${rowData.name}`;image.width=440;image.height=956;button.append(image);figure.append(caption,button);row.append(figure);button.addEventListener('click',()=>{const url=`${item.original}?v=${encodeURIComponent(data.version)}`;$('#viewer-title').textContent=item.id;$('#large').src=url;$('#large').alt=`${item.id} — полный размер`;$('#download').href=url;$('#download').download=item.original.split('/').pop();$('#full').href=url;$('#viewer').showModal();});}
  section.append(row);main.append(section);
 }
 for(const control of document.querySelectorAll('.scale'))control.addEventListener('click',()=>{document.documentElement.style.setProperty('--preview',`${control.dataset.scale}px`);document.querySelectorAll('.scale').forEach(button=>button.classList.toggle('active',button===control));});
 $('#close').addEventListener('click',()=>$('#viewer').close());$('#viewer').addEventListener('click',event=>{if(event.target===$('#viewer'))event.target.close();});window.pilotReady=true;
})();
