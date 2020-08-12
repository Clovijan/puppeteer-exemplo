const puppeteer = require('puppeteer');
const fs = require('fs');

(async () =>{
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto('https://www.github.com/clovijan');
  await page.screenshot({path:'github.png'});

  const repoList = await page.evaluate( () => {
     //toda essa função executará no browser 

     // pegar todas as informações que precisamos na página
    const nodeList = document.querySelectorAll('ol a');
     //transfrmar nodeList em array
    const repoArray = [...nodeList];

    // transformar os nodes(elementos html) em objetos JS
    const list = repoArray.map(({href}) => ({
      href
    }));

     //colocar para fora da função 
    return list;
  });
  
  fs.writeFile('repositorios.json', JSON.stringify(repoList, null, 2), error =>{
    if(error) throw new Error('😭 something went wrong');

    console.log('🔥 well done!');
  })

  await browser.close();
})(); 

