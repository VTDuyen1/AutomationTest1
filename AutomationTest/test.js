let webdriver = require('selenium-webdriver');
let chrome = require('selenium-webdriver/chrome');
let path = require('chromedriver').path;
var wd = require('wd'),
	fs = require('fs');

describe("Selenium Test web", function () {
	this.timeout(2400000);
	var allPassed = true;
	var driver;

	function screenShot(){
		setTimeout(function(){
			return driver
				.takeScreenshot().then(function (png) {
				var stream = fs.createWriteStream(Date.now() + ".png");
				stream.write(Buffer.from(png, 'base64'));
				stream.end();
			});
		}, 25000);
	}

	after(function () {
		console.log(allPassed ? '[PASSED]' : '[FAILED]');
	});

	afterEach(function () {
		allPassed = allPassed && this.currentTest.state === 'passed';
		screenShot();
	});
	before(function () {
		let service = new chrome.ServiceBuilder(path).build();
		chrome.setDefaultService(service);
		driver = new webdriver.Builder()
								.withCapabilities(webdriver.Capabilities.chrome())
								.build();
		driver.get('http://live.demoguru99.com/index.php');
		// driver.get('http://live.demoguru99.com/index.php/mobile.html');
		driver.manage().window().maximize();
	});
	it("Register an account: ", function () {
		// driver.sleep(15000);
		driver.findElement(webdriver.By.xpath('//*[@id="header"]/div/div[2]/div/a')).click();
		driver.findElement(webdriver.By.xpath('//*[@id="header-account"]/div/ul/li[5]/a')).click();

		//Register
		driver.getAllWindowHandles().then(function(handles){
		    driver.switchTo().window(handles[0]).then(function(){
		        driver.findElement(webdriver.By.id('firstname')).sendKeys('Duyen');
				driver.findElement(webdriver.By.id('middlename')).sendKeys('Thuy');
				driver.findElement(webdriver.By.id('lastname')).sendKeys('Vu');
				driver.findElement(webdriver.By.id('email_address')).sendKeys('50duyenvu28021997@gmail.com');
				driver.findElement(webdriver.By.id('password')).sendKeys('1q2w3e4r@D');
				driver.findElement(webdriver.By.id('confirmation')).sendKeys('1q2w3e4r@D');
				driver.findElement(webdriver.By.xpath('//*[@id="form-validate"]/div[2]/button')).click();
				driver.manage().deleteAllCookies();
				//Sign out
				// driver.getAllWindowHandles().then(function(handles){
		  //   		driver.switchTo().window(handles[0]).then(function(){
		  //   			driver.findElement(webdriver.By.xpath('//*[@id="header"]/div/div[2]/div/a')).click();
		  //   			driver.findElement(webdriver.By.xpath('//*[@id="header-account"]/div/ul/li[5]/a')).click();
		  //   			driver.sleep(15000);
		  //   		});
				// });
		    });
		});
		
	});

	it("Sign in: ", function () {
			driver.getAllWindowHandles().then(function(handles){
    		driver.switchTo().window(handles[0]).then(function(){
    			let result = driver.getTitle();
				result.then(function(){
					driver.findElement(webdriver.By.xpath('//*[@id="header"]/div/div[2]/div/a')).click();
					driver.findElement(webdriver.By.xpath('//*[@id="header-account"]/div/ul/li[6]/a')).click();
					driver.getAllWindowHandles().then(function(handles){
					    driver.switchTo().window(handles[0]).then(function(){
							let i=0;
							while (i <= 3){
							 	driver.findElement(webdriver.By.id('email')).sendKeys('duyenvu28021997@gmail.com');
								driver.findElement(webdriver.By.id('pass')).sendKeys('1q2w3e4r@D');
								driver.findElement(webdriver.By.id('send2')).click();
								i++;
							}
					    });
					});
				});
		 	});
		});
		
	});

	it("Verify login success: ", function () {
		driver.getAllWindowHandles().then(function(handles){
    		driver.switchTo().window(handles[0]).then(function(){
				let result = driver.getTitle();
				result.then(function(){
					let actualResult = (result = 'My Account')? 'PASSED' : 'FAILED';
					console.log(actualResult + " : " + result);
				})

    		});
		});
	});

	it("Go to mobile page: ", function () {
		driver.getAllWindowHandles().then(function(handles){
    		driver.switchTo().window(handles[0]).then(function(){
				setTimeout(function(){
					driver.findElement(webdriver.By.xpath('//*[@id="nav"]/ol/li[1]/a')).click();
				}, 5000);
		 	});
		});
	});

	it("Click ‘Add to Compare’ of SONY XPERIA: ", function () {
		driver.getAllWindowHandles().then(function(handles){
    		driver.switchTo().window(handles[0]).then(function(){
				setTimeout(function(){
					driver.executeScript('window.scrollTo(0, 500);');
					driver.findElement(webdriver.By.xpath('//*[@id="top"]/body/div/div/div[2]/div/div[2]/div[1]/div[3]/ul/li[1]/div/div[3]/ul/li[2]/a')).click();
				}, 25000);
		 	});
		});
	});

	it("Click ‘Add to Compare’ of IPHONE: ", function () {
		driver.getAllWindowHandles().then(function(handles){
    		driver.switchTo().window(handles[0]).then(function(){
				setTimeout(function(){
					driver.executeScript('window.scrollTo(0, 500);');
					driver.findElement(webdriver.By.xpath('//*[@id="top"]/body/div/div/div[2]/div/div[2]/div[1]/div[3]/ul/li[2]/div/div[3]/ul/li[2]/a')).click();
				}, 30000);	
		 	});
		});
	});

	it("Click ‘Compare’ button: ", function () {
		driver.navigate().refresh();
		driver.getAllWindowHandles().then(function(handles){
    		driver.switchTo().window(handles[0]).then(function(){
    			driver.navigate().refresh();
				setTimeout(function(){
					let i=0;
					while (i <= 3){
						let b = driver.findElement(webdriver.By.xpath('//*[@id="top"]/body/div/div/div[2]/div/div[2]/div[3]/div[1]/div[2]/div/button/span/span'));
						b.click();
						b.then(function(){
							b.click();
						})

						driver.findElement(webdriver.By.xpath('//*[@id="top"]/body/div/div/div[2]/div/div[2]/div[3]/div[1]/div[2]/div/button/span/span')).click();
						i++;
					}
				}, 500);
		 	});
		});
	});
	it("Verify how many reviews for IPHONE: ", function () {
		let MainWindow=driver.getWindowHandle();
        driver.getAllWindowHandles().then(function(handles){
    		driver.switchTo().window(handles[1]).then(function(){
				setTimeout(function(){
					let b = driver.findElement(webdriver.By.xpath('//*[@id="product_comparison"]/tbody[1]/tr[1]/td[2]/div[1]/span/a'));
					// b.getText();
					console.log("Number of IPHONE reviewed : " + b.getText());
				}, 25000);
		 	});
		});
        // driver.switchTo().window(MainWindow);

	});
	
});


