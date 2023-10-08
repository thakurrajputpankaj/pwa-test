if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
      navigator.serviceWorker.register('/service-worker.js')
        .then(registration => {
          console.log('Service Worker registered Successfully:', registration.scope);
        })
        .catch(error => {
          console.error('Service Worker registration failed:', error);
        });
    });
  }

  window.addEventListener('load', ()=>{
    loadPosts();
  })
  
  function loadPosts(){
    fetch('https://jsonplaceholder.typicode.com/posts')
    .then(res => res.json())
    .then(json => renderPosts(json))
  }

  function renderPosts(posts) {
    const output = document.getElementById('_container');
    output.innerHTML = '';
    

    posts.forEach(element => {
      output.innerHTML += `
        <h3>${element.title}</h3>
        <div class="text">${element.body}</div>
      `;
    });
  }
  