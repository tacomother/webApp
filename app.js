//variables


const notifIndicator = document.getElementById('circle');
const bell = document.getElementById('bell');
const triangle = document.getElementById('triangle');
const notifDiv = document.getElementById('notif-dropdown');


const alertDiv = document.getElementById("alert");
const alertMsg = "Turn off your computer!";


const icnNav = document.getElementById('icon-navigation');
const icnNavItems = icnNav.children[0].children;


const userSearch = document.getElementById('user-search');
const userMsg = document.getElementById('user-message');
const userSend = document.getElementById('send');
const userForm = document.getElementById('user-search-form');
const userList = document.getElementById('member-list').children;
const error1 = document.getElementById('error1');
const error2 = document.getElementById('error2');
const confirm = document.getElementById('confirm');


const toggles = document.getElementsByClassName("toggle");
const switchText = document.getElementsByClassName('switch-text');


const timeZoneSelect = document.getElementById('timezone-select');
const timeZones = timeZoneSelect.children;
let selectOption = timeZoneSelect.options[timeZoneSelect.selectedIndex];
let lastSelected = localStorage.getItem('timeZoneSelect');


let trafficData = [
    hourly = {
		time:['12pm','1pm','2pm','3pm','4pm','5pm','6pm','7pm','8pm','9pm','10pm','11pm'],
		users:[45,70,55,90,100,120,80,60,110,130,95,150]
	},
    daily ={
		time:['Mon','Tues','Wed',"Thurs",'Fri','Sat','Sun'],
		users:[130,250,400,300,450,200,500]
	},
	weekly = {
		time:['Week 1','Week 2',"Week 3",'Week 4','Week 5','Week 6','Week 7','Week8'],
		users:[300,500,1250,1000,1500,1250,1400,1800]
	},
	monthly = {
		time:['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'],
		users:[2000,3500,3000,5000,5500,4500,3000,4000,6000,4500,2500,5000]
	}
];


const chartButtonsUL = document.getElementById('date');
const chartButtons = chartButtonsUL.children;
let ctx1 = document.getElementById("traffic-general");

const lineChart = new Chart(ctx1, {
	type: 'line',
	data:{
		labels: trafficData[2].time,
		datasets:[{
			data:trafficData[2].users,
			backgroundColor:'rgba(115,119,191,0.3)',
			lineTension:0,
			pointStyle:'circle',
			borderColor:'rgb(115,119,191)',
			borderWidth:0.5

		}]
	},
	options:{
		legend:{
			display:false
		},
		maintainAspectRatio:false,
	}
});

let ctx2 = document.getElementById('traffic-daily');

const barChart = new Chart(ctx2, {
	type: 'bar',
	data:{
		labels: ['S','M','T','W','T','F','S'],
		datasets:[{
			data:trafficData[1].users,
			backgroundColor: 'rgb(115,119,191)'
		}]
	},
	options:{
		legend:{
			display:false
		},
	}
});

let ctx3 = document.getElementById('traffic-mobile');

const pieChart = new Chart(ctx3,{
	type: 'doughnut',
	data:{
		labels:['Phones','Tablets','Desktop'],
		datasets:[{
			data: [700,100,200],
			backgroundColor:['#7377BF','#81C98F','#74B1BF']
		}]
	},
	options:{
		legend:{
			position:'right',
			labels:{
				boxWidth:20,
				padding:20
			}
		},
	}
});

//functions


function createAlert(message){
	   alertSpan = document.createElement("span");
	   alertSpan.textContent = message;
	   alertDiv.appendChild(alertSpan);
};


function createCloseButton(){
	alertClose = document.createElement('a')


	alertClose.className = "close-button";
	alertClose.innerHTML = "&times";
	alertClose.setAttribute('href', "#")


	alertClose.addEventListener("click",function(){
		alertDiv.parentNode.removeChild(alertDiv);
	});

	alertDiv.appendChild(alertClose);
};



bell.addEventListener('click',function(){
	if(notifIndicator.style.backgroundColor = '#d22a1e'){
		notifIndicator.style.backgroundColor = 'lime';
	}
	if(notifDiv.style.display == 'none'){
		notifDiv.style.display = 'block';
	}else{
		notifDiv.style.display = "none";
	}
});


for(i=0 ; i<icnNavItems.length ; i++){
	icnNavItems[i].addEventListener('click',function(){
		const icnNavItems = icnNav.children[0].children;

		for(i=0 ; i<icnNavItems.length ; i++){
			icnNavItems[i].className="";
		}

		this.className="selected";
	});
}


createAlert("Alert")
createAlert(alertMsg);
createCloseButton();


for(i=0 ; i<trafficData.length ; i++){
	if(trafficData[i]){
		(function(i){
			chartButtons[i].addEventListener('click',function(){
				lineChart.config.data.datasets[0].data = trafficData[i].users;
				lineChart.config.data.labels = trafficData[i].time;

				lineChart.update(0);

			});
		})(i);
	};
};


userSend.addEventListener('click',function(){
	let userArr = [];
	let validUser;
	let textPresent;
	//puts users into an array
	for(i=0 ; i<userList.length ; i++){
		const currentUser = userList[i].value;
		userArr.push(currentUser);
	}

		error1.textContent="";
		error2.textContent="";
		confirm.textContent="";


	if(userArr.indexOf(userSearch.value,0) == -1){
		error1.textContent = "That is not a valid user!";
		validUser=false;
	}else{
		validUser = true;
	}
	//check if text is present
	if(userMsg.value == ""){
		error2.textContent = "There is no message!";
		textPresent=false;
	}else{
		textPresent = true;
	}

	if(validUser == true && textPresent == true){
		confirm.textContent = "Message was sent!";
		validUser= false;
		textPresent = false;
	}
	userForm.reset();
});


for(i=0; i<toggles.length; i++){
	const currentInput = toggles[i];
	//depending on what is saved in the local storage the toggle will be checked or not
	if(currentInput.className == "toggle toggle1" && localStorage.toggle1 == 'true'){
		currentInput.checked = true;
	}else if(currentInput.className == "toggle toggle2" && localStorage.toggle2 == 'true'){
		currentInput.checked = true;
	}

	if(currentInput.checked){
		const switchLabel = currentInput.parentNode;
		switchLabel.removeChild(switchLabel.lastElementChild);
		switchLabel.removeChild(switchLabel.lastElementChild);
		let createSpan = document.createElement('span');
		let createSpanSlider = document.createElement('span');
		createSpanSlider.className = "slider-round";
		createSpan.textContent = "ON";
		switchLabel.appendChild(createSpanSlider);
		switchLabel.appendChild(createSpan);
		switchLabel.style.backgroundColor = "#7377BF";
	}


	currentInput.addEventListener('click',function(){
		//deleting existing spans
		let toggle = this.parentNode;
		toggle.removeChild(toggle.lastElementChild);
		toggle.removeChild(toggle.lastElementChild);

		//if the element is checked, it will create the checked layout for the toggle
		if(this.checked == true){
			let createSpan = document.createElement('span');
			let createSpanSlider = document.createElement('span');
			createSpanSlider.className = "slider-round";
			createSpan.textContent = "ON";
			toggle.appendChild(createSpanSlider);
			toggle.appendChild(createSpan);
			toggle.style.backgroundColor = "#7377BF";
			this.setAttribute('checked','');


			if (this.className == 'toggle toggle1'){
				localStorage.setItem('toggle1',true);
				console.log(localStorage.toggle1);
			} else {
				localStorage.setItem('toggle2',true);
				console.log(localStorage.toggle2);
			}


		} else {
			let createSpan = document.createElement('span');
			let createSpanSlider = document.createElement('span');
			createSpanSlider.className = "slider-round";
			createSpan.textContent = "OFF"
			toggle.appendChild(createSpan);
			toggle.appendChild(createSpanSlider);
			toggle.style.backgroundColor = "grey";
			this.removeAttribute('checked','');

			if(this.className == 'toggle toggle1'){
				localStorage.setItem('toggle1',false);
				console.log(localStorage.toggle1);
			}else{
				localStorage.setItem('toggle2',false);
				console.log(localStorage.toggle2);
			}
		}
	});
}

if(lastSelected){
	timeZoneSelect.value = lastSelected;
}

timeZoneSelect.onchange = function(){
	lastSelected = timeZoneSelect.options[timeZoneSelect.selectedIndex].value;
	localStorage.setItem('timeZoneSelect',lastSelected);
}
