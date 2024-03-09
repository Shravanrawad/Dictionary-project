let wrapper = document.querySelector('.wrapper'),
  searchinput = wrapper.querySelector('input'),
  infotext = wrapper.querySelector('.info-text'),
  synonyms = wrapper.querySelector('.synonyms .list'),
  valumeicon = wrapper.querySelector('.word i'),
  searchbtn = wrapper.querySelector('button');
  let audio;

  
  function data(result,inputword){
   if(result.title){
      infotext.innerHTML = `Can't find the meaning of <span>"${inputword}"</span> Please try another word.`; 
      wrapper.classList.remove('active')
   }
   else {
      
      console.log(result)
      wrapper.classList.add('active')
      searchinput.value = '';
      let definitions = result[0].meanings[0].definitions[0],
      phonetics = `${result[0].meanings[0].partOfSpeech} /${result[0].phonetics[0].text}/`;

      document.querySelector('.word p').innerText = result[0].word;
      document.querySelector('.word span').innerText = phonetics;
      document.querySelector('.meaning span').innerText = definitions.definition;
      document.querySelector('.example span').innerText = definitions.example;
      audio = new Audio("https:" + result[0].phonetics[0].audio);

      synonyms.innerHTML = '';
      if(definitions.synonyms[0] == undefined){
         synonyms.parentElement.style.display = 'none';
      }
      else {         
         synonyms.parentElement.style.display = 'block';

         for(let i=0; i<5; i++){
         let tag = `<span onclick=search('${definitions.synonyms[i]}')>${definitions.synonyms[i]}</span>`
         synonyms.insertAdjacentHTML('beforeend', tag)
       }
   }

   }
}

function search(word){
   searchinput.value = word;
   callapi(word);
}


  function callapi(inputword){
   infotext.innerHTML = `Searching the meaning of <span>"${inputword}"</span>`;
   let url = `https://api.dictionaryapi.dev/api/v2/entries/en/${inputword}`
   fetch(url)
   .then(response => response.json())
   .then(result => data(result,inputword))
  }


  searchbtn.addEventListener('click', function(){
      callapi(searchinput.value);
  });

  valumeicon.addEventListener('click', () => {
   audio.play();
  })
