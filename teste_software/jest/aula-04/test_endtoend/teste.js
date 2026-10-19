const {Builder, By} = require('selenium-webdriver') //fazendo a importação do selenium webdriver()
async function playTest () {
    console.log('1. Abrindo o navegador Chrome')
    let driver =  await new Builder().forBrowser('chrome').build() //criando uma instância do navegador Chrome

    try{
        console.log('2 - Acessando o site de testes...')
        await driver.get('https://www.saucedemo.com/') //acessando o site de testes
        await driver.manage().window().maximize(); //maximizando a janela do navegador
    
        console.log('3. Preenchendo login e senha')
        await driver.findElement(By.id('user-name')).sendKeys('standard_user') //preenchendo o campo de login
        await driver.findElement(By.id('password')).sendKeys('secret_sauce') //preenchendo o campo de senha
        await driver.sleep(5000); //esperando 5 segundos
        await driver.findElement(By.id('login-button')).click() //clicando no botão de login

        console.log('4. Validando resposta do sistema')
            let titulo = await drive.findElement(By.className('title')).getText() //pegando o texto do elemento com a classe 'title'
            if(titulo == 'Products'){
                console.log('Teste passou -> Login realizado com sucesso')
                
            }else{
                console.log('Teste falhou -> Login não realizado')
            }
        
    }catch (error){
        console.log('Erro: ', error)
    }finally{
        console.log('5. Fechando o navegador')
        await driver.sleep(5000); //esperando 5 segundos
        await driver.quit()//fechando o navegador
    }
}
playTest()
